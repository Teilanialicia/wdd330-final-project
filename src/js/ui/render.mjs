import { createRecipeCard } from './recipeCard.mjs';

export function renderRecipeCards(meals, container) {
  container.innerHTML = "";

  if (!meals.length) {
    container.innerHTML = `<p class="placeholder">No recipes found.</p>`;
    return;
  }

  meals.forEach(meal => container.appendChild(createRecipeCard(meal)));
}
