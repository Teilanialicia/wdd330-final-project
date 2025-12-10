import { getFavorites, removeFavorite } from "../data/favorites.mjs";

const favoritesGrid = document.getElementById("favoritesGrid");
const emptyMessage = document.getElementById("emptyMessage");

function renderFavoriteCards() {
  const favorites = getFavorites();

  if (!favorites || favorites.length === 0) {
    favoritesGrid.innerHTML = `
      <p class="empty-message">You have no favorite recipes yet.</p>
    `;
    return;
  }

  emptyMessage.innerHTML = "";

  favoritesGrid.innerHTML = favorites.map(meal => `
    <div class="recipe-card">
      <img src="${meal.strMealThumb}" class="recipe-thumb">

      <h3 class="recipe-title">${meal.strMeal}</h3>

      <div class="card-buttons">
        <a href="recipe.html?id=${meal.idMeal}" class="button">View</a>
        <button class="button remove-btn" data-id="${meal.idMeal}">Remove</button>
      </div>
    </div>
  `).join("");

  // Add listeners to remove buttons
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      removeFavorite(id);
      renderFavoriteCards(); // re-render
    });
  });
}

renderFavoriteCards();
