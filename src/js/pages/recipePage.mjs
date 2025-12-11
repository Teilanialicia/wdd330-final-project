// This handles the javascript for when a user clicks on a recipe card after searching for it.
// It executes all of the API calls to api-ninjas and puts the data into the card

import { getMealById } from '../api/mealApi.mjs';
import { getNutrition } from '../api/nutritionApi.mjs';
import { saveFavorite, getFavorites } from '../data/favorites.mjs';

const recipeDetail = document.getElementById("recipeDetail");
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

async function loadRecipe() {
  const meal = await getMealById(recipeId);

  // Build ingredients list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing) ingredients.push(`${measure} ${ing}`);
  }

  // Fetch nutrition per ingredient
  const nutrition = [];
  for (const i of ingredients) {
    const data = await getNutrition(i);
    if (data[0]) nutrition.push(data[0]);
  }

  renderDetails(meal, ingredients, nutrition);
}

function renderDetails(meal, ingredients, nutrition) {
  recipeDetail.innerHTML = `
    <div class="recipe-detail-card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h2 class="detail-title">${meal.strMeal}</h2>

      <div class="detail-buttons">
        <button class="button" id="favBtn">Add to Favorites</button>
      </div>

      <h3>Ingredients</h3>
      <ul class="ingredients-list">
        ${ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>

      <h3>Nutrition (per ingredient)</h3>
      <ul>
        ${nutrition.map(n => `
          <li>${n.name}: ${n.cholesterol_mg}g Carbohydrates, ${n.fat_total_g}g Fat, ${n.sodium_mg}mg Sodium ${n.sugar_g}g Sugar</li>
        `).join("")}
      </ul>
    </div>
  `;

  const favBtn = document.getElementById("favBtn");

  // Disable button if meal is already in favorites
  const favorites = getFavorites();
  if (favorites.some(f => f.idMeal === meal.idMeal)) {
    favBtn.textContent = "Saved!";
    favBtn.disabled = true;
  }

  // Add to favorites on click
  favBtn.addEventListener("click", () => {
    saveFavorite(meal);
    favBtn.textContent = "Saved!";
    favBtn.disabled = true;
    alert(`${meal.strMeal} added to favorites!`);
  });
}

loadRecipe();
