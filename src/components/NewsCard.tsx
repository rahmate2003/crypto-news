import Image from 'next/image';
import { Article } from '@/types';

interface NewsCardProps {
  article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
  const { title, description, url, urlToImage, publishedAt, source } = article;

  const imageAlt = urlToImage ? `${title} - image` : 'No image available for this article';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1">
      {urlToImage && (
        <div className="relative w-full h-48">
          <Image
            src={urlToImage || "/no-image.png"} 
            alt={imageAlt} 
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            priority={false}
            unoptimized
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
          <span>{source.name}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
