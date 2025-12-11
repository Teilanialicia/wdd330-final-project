// This file interacts with the "database" or localstorage. It stores, removes, and retrieves the favorites from local storage.

const FAVORITES_KEY = "favoriteFoods";

export function getFavorites() {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveFavorite(item) {
  const favorites = getFavorites();
  
  if (!favorites.some(f => f.name === item.name)) {
    favorites.push(item);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(f => f.idMeal !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
