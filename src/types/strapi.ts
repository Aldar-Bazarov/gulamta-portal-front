// Типы для медиафайлов
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  formats: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

// Тип для новости
export interface ArticlesItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  views: number;
  category: 'news' | 'events' | 'announcements' | 'academics';
  tags: Record<string, string> | null;
  featuredImage: StrapiImage[] | StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Тип для ответа API (список новостей)
export interface ArticlesResponse {
  data: ArticlesItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Тип для ответа API (одна новость)
export interface SingleArticlesResponse {
  data: ArticlesItem;
  meta: {};
}