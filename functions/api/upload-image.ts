interface Env {
  BLOG_IMAGES: R2Bucket;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { BLOG_IMAGES } = context.env;

    if (!BLOG_IMAGES) {
      return Response.json(
        { success: false, error: 'R2 bucket not configured' },
        { status: 500, headers: corsHeaders }
      );
    }

    const formData = await context.request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return Response.json(
        { success: false, error: 'No image file provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        {
          success: false,
          error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.'
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        {
          success: false,
          error: 'File size exceeds 5MB limit'
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `blog-images/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

    const arrayBuffer = await file.arrayBuffer();

    await BLOG_IMAGES.put(fileName, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    const imageUrl = `https://pub-d6d31077bf1c45ddbede359b95106359.r2.dev/${fileName}`;

    return Response.json(
      {
        success: true,
        url: imageUrl,
        fileName: fileName
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error uploading image:', error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload image',
      },
      { status: 500, headers: corsHeaders }
    );
  }
};
