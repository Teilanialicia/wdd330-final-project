import { searchMeals } from './api/mealApi.mjs';
import { renderRecipeCards } from './ui/render.mjs';
import { saveFavorite } from './data/favorites.mjs';

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const recipeGrid = document.getElementById("recipeGrid");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const meals = await searchMeals(query);
  renderRecipeCards(meals, recipeGrid);
});

recipeGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-favorite-btn");
  if (!btn) return;

  const mealData = btn.dataset.meal;
  if (!mealData) return;

  const meal = JSON.parse(mealData);
  saveFavorite(meal);

  btn.textContent = "⭐ Saved!";
  btn.disabled = true;
});
