import React, { useState, useReducer, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { favoritesReducer, initialFavoritesState } from '../reducers/favoritesReducer';
import PhotoCard from './PhotoCard';

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, dispatch] = useReducer(favoritesReducer, [], initialFavoritesState);

  // useCallback prevents re-creating the input change handler on every render
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // useMemo computes the filtered list only when `photos` or `searchTerm` change
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);

  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photoId });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Search Header */}
        <header className="mb-8 flex flex-col items-center">
          <h1 className="mb-6 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Photo Gallery
          </h1>
          <div className="w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by author name..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </header>

        {/* Loading State with Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
            <p className="mt-4 text-sm font-medium text-gray-500">Loading photos...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        )}

        {/* Responsive Grid: 1 col (mobile), 2 cols (tablet), 4 cols (desktop) */}
        {!loading && !error && (
          <>
            {filteredPhotos.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-base text-gray-500">No photos match your search criteria.</p>
              </div>
            ) : (
              <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavorite={favorites.includes(photo.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Gallery;