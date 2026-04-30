import type { ArticlesItem, ArticlesResponse } from '../types/strapi';

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL

const fetchOptions: RequestInit = {
    headers: {
        'Content-Type': 'application/json',
    },
};


export async function getArticles(): Promise<ArticlesItem[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?populate=featuredImage&sort[0]=publishedAt:desc`,
      fetchOptions
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    
    const json: ArticlesResponse = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticlesBySlug(slug: string): Promise<ArticlesItem | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=featuredImage`,
      fetchOptions
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles by slug: ${response.statusText}`);
    }
    
    const json: ArticlesResponse = await response.json();
    return json.data[0] || null;
  } catch (error) {
    console.error(`Error fetching articles with slug ${slug}:`, error);
    return null;
  }
}

// Вспомогательная функция для получения URL изображения
export function getImageUrl(image: ArticlesItem['featuredImage'], size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'): string | null {
  if (!image) return null;
  
  // Если изображение пришло как массив (поле media множественное)
  const singleImage = Array.isArray(image) ? image[0] : image;
  
  if (!singleImage) return null;
  
  // Если запросили конкретный размер и он существует
  if (size !== 'medium' && singleImage.formats[size]) {
    return `${STRAPI_URL}${singleImage.formats[size]?.url}`;
  }
  
  // Иначе возвращаем оригинал
  return `${STRAPI_URL}${singleImage.url}`;
}