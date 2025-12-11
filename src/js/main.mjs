import { searchMeals } from './api/mealApi.mjs';
import { renderRecipeCards } from './ui/render.mjs';

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const recipeGrid = document.getElementById("recipeGrid");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const meals = await searchMeals(query);
  renderRecipeCards(meals, recipeGrid);
});