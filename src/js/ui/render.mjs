import { createRecipeCard } from './recipeCard.mjs';
import { saveFavorite } from "../data/favorites.mjs";


export function renderRecipeCards(meals, container) {
  container.innerHTML = "";

  if (!meals.length) {
    container.innerHTML = `<p class="placeholder">No recipes found.</p>`;
    return;
  }

  meals.forEach(meal => container.appendChild(createRecipeCard(meal)));
}

export function renderResults(container, items) {
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>Calories: ${item.calories}</p>
      <button class="fav-btn">⭐ Add to Favorites</button>
    `;

    card.querySelector(".fav-btn").addEventListener("click", () => {
      saveFavorite(item);
      alert(`${item.name} added to favorites!`);
    });

    container.appendChild(card);
  });
}

export function renderFavorites(container, favorites, removeCallback) {
  container.innerHTML = "";

  favorites.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("result-card");

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>Calories: ${item.calories}</p>
      <button class="remove-btn">❌ Remove</button>
    `;

    card.querySelector(".remove-btn")
      .addEventListener("click", () => removeCallback(item.name));

    container.appendChild(card);
  });
}
