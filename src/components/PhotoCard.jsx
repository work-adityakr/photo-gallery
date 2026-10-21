import React from 'react';

const PhotoCard = ({ photo, isFavorite, onToggleFavorite }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between p-4">
        <p className="truncate text-sm font-semibold text-gray-800" title={photo.author}>
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="rounded-full p-2 text-gray-400 transition-colors duration-150 hover:bg-gray-100 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#ef4444' : 'none'}
            stroke={isFavorite ? '#ef4444' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 transition-transform active:scale-125"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;