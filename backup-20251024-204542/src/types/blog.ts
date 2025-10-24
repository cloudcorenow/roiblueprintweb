export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  author_title?: string;
  image: string;
  read_time: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  author_title?: string;
  image: string;
  read_time: string;
  published?: boolean;
  featured?: boolean;
}
