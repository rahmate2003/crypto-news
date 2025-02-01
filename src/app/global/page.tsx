
'use client';
import { useState, useEffect } from 'react';
import NewsList from '@/components/NewsList';
import NewsFilters from '@/components/NewsFilters';
import { fetchCryptoNews } from '@/lib/newsapi';
import { Article, FilterParams } from '@/types';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  const loadNews = async (filters: FilterParams = {}, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCryptoNews({ ...filters, page });
      setArticles(data.articles);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews({}, page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
     <div>
      <br></br>
     </div>
        
        <NewsFilters onFilterChange={(filters) => loadNews(filters, 1)} />
        
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Found {totalResults} articles</p>
            <NewsList articles={articles} />
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="bg-blue-600 text-white px-4 py-2 rounded-l hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page * 12 >= totalResults}
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}