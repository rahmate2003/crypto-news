'use client';
import { useState } from 'react';
import { FilterParams } from '@/types';

interface NewsFiltersProps {
  onFilterChange: (filters: FilterParams) => void;
}

export default function NewsFilters({ onFilterChange }: NewsFiltersProps) {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('relevancy');

  const handleFilterChange = () => {
    let sortBy: 'publishedAt'| 'relevancy' = 'relevancy';

    if (sortOrder === 'newest') {
      sortBy = 'publishedAt';
    } else if (sortOrder === 'popularity') {
      sortBy = 'publishedAt'; 
    } else if (sortOrder === 'relevancy') {
      sortBy = 'relevancy';
    }

    onFilterChange({
      fromDate,
      toDate,
      sortBy,
      sortOrder, 
    });
  };

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setSortOrder('relevancy'); 
    onFilterChange({});
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          >
            <option value="relevancy">Relevant</option>
            <option value="newest">Newest</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button
            onClick={handleFilterChange}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}