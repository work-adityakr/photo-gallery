export const FAVORITES_STORAGE_KEY = 'gallery_favorites';

export const initialFavoritesState = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Failed to parse favorites from localStorage:', err);
    return [];
  }
};

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const photoId = action.payload;
      const isFav = state.includes(photoId);
      const updatedFavorites = isFav
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];

      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
      } catch (err) {
        console.error('Failed to save favorites to localStorage:', err);
      }

      return updatedFavorites;
    }
    default:
      return state;
  }
};