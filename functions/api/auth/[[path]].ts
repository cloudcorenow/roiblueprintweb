interface Env {
  DB: D1Database;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const PBKDF2_ITERATIONS = 210_000;
const DERIVED_KEY_LENGTH = 32; // 256 bits

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }

  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

async function deriveKey(password: string, salt: Uint8Array): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  return crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    DERIVED_KEY_LENGTH * 8
  );
}

async function createPasswordHash(password: string): Promise<string> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const derivedBits = await deriveKey(password, saltBytes);

  const saltHex = bufferToHex(saltBytes);
  const hashHex = bufferToHex(derivedBits);

  return `${saltHex}:${hashHex}`;
}

async function verifyPassword(password: string, storedValue: string): Promise<boolean> {
  const [saltHex, expectedHash] = storedValue.split(':');

  if (!saltHex || !expectedHash) {
    // Fallback for legacy SHA-256 hashes stored without a salt
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const legacyHashBuffer = await crypto.subtle.digest('SHA-256', data);
    const legacyHash = bufferToHex(legacyHashBuffer);

    return legacyHash === storedValue;
  }

  try {
    const saltBytes = hexToBytes(saltHex);
    const derivedBits = await deriveKey(password, saltBytes);
    const hashHex = bufferToHex(derivedBits);

    // Use timing-safe comparison
    if (hashHex.length !== expectedHash.length) {
      return false;
    }

    let mismatch = 0;
    for (let i = 0; i < hashHex.length; i += 1) {
      mismatch |= hashHex.charCodeAt(i) ^ expectedHash.charCodeAt(i);
    }

    return mismatch === 0;
  } catch (error) {
    console.error('Failed to verify password hash', error);
    return false;
  }
}

async function generateToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function verifyToken(token: string, db: D1Database): Promise<string | null> {
  const result = await db.prepare(
    'SELECT user_id FROM sessions WHERE token = ? AND datetime(expires_at) > datetime("now")'
  ).bind(token).first<{ user_id: string }>();

  return result?.user_id || null;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 200 });
  }

  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(request.url);
  const path = url.pathname.split('/').filter(Boolean);
  const action = path[path.length - 1];

  try {
    if (action === 'login' && request.method === 'POST') {
      const { email, password } = await request.json() as { email: string; password: string };

      if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const user = await env.DB.prepare(
        'SELECT id, email, password_hash FROM users WHERE email = ?'
      ).bind(email).first<{ id: string; email: string; password_hash: string }>();

      if (!user) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const passwordIsValid = await verifyPassword(password, user.password_hash);

      if (!passwordIsValid) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      await env.DB.prepare(
        'UPDATE users SET last_login_at = strftime("%Y-%m-%dT%H:%M:%fZ", "now") WHERE id = ?'
      ).bind(user.id).run();


      const token = await generateToken();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

      await env.DB.prepare(
        'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)'
      ).bind(user.id, token, expiresAt).run();

      return new Response(JSON.stringify({
        user: { id: user.id, email: user.email },
        token,
        expiresAt
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'logout' && request.method === 'POST') {
      const authHeader = request.headers.get('Authorization');
      const token = authHeader?.replace('Bearer ', '');

      if (token) {
        await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'verify' && request.method === 'GET') {
      const authHeader = request.headers.get('Authorization');
      const token = authHeader?.replace('Bearer ', '');

      if (!token) {
        return new Response(JSON.stringify({ error: 'No token provided' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const userId = await verifyToken(token, env.DB);

      if (!userId) {
        return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const user = await env.DB.prepare(
        'SELECT id, email FROM users WHERE id = ?'
      ).bind(userId).first<{ id: string; email: string }>();

      return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'create-admin' && request.method === 'POST') {
      const { email, password } = await request.json() as { email: string; password: string };

      if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const existingUser = await env.DB.prepare(
        'SELECT id FROM users WHERE email = ?'
      ).bind(email).first();

      if (existingUser) {
        return new Response(JSON.stringify({ error: 'User already exists' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const passwordHash = await createPasswordHash(password);

      await env.DB.prepare(
        'INSERT INTO users (email, password_hash) VALUES (?, ?)'
      ).bind(email, passwordHash).run();

      return new Response(JSON.stringify({ success: true, message: 'Admin user created' }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Auth error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
