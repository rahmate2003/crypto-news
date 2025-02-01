// src/types/index.ts
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface FilterParams {
  fromDate?: string;
  toDate?: string;
  sortBy?: 'publishedAt' | 'relevancy';
  sortOrder?: string;
  page?: number;
}