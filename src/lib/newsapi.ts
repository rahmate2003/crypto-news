import { NewsApiResponse, FilterParams } from '@/types';
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const keywords = ['crypto', 'blockchain', 'web3'];

export const fetchCryptoNews = async (params: FilterParams = {}): Promise<NewsApiResponse> => {
  if (!apiKey) {
    throw new Error('API KEY is not defined in environment variables');
  }

  const { sortBy = 'relevancy', page = 1, fromDate, toDate } = params;

  try {
    const query = keywords.join(' OR ');
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: apiKey,
        sortBy,
        from: fromDate || undefined,
        to: toDate || undefined,
        language: 'en',
        pageSize: 14,
        page,
      },
    });

    const data: NewsApiResponse = response.data;
    return data;
   
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch news');
    }
    throw error;
  }
};