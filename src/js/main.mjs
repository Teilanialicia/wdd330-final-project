import { searchMeals } from './api/mealApi.mjs';
import { renderRecipeCards } from './ui/render.mjs';

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const recipeGrid = document.getElementById("recipeGrid");

// Add a fade-in animation to the hero text
const fadeInHero = document.querySelector(".hero-content h2");

fadeInHero.classList.add(['fade-in']);

setTimeout(() => {
  const fadeInAfterHero = document.querySelector(".hero-content h2.fade-in span");
  fadeInAfterHero.classList.add(['fade-in'])
}, 1500);

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const meals = await searchMeals(query);
  renderRecipeCards(meals, recipeGrid);
  
});