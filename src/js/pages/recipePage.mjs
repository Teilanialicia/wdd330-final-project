import { getMealById } from '../api/mealApi.mjs';
import { getNutrition } from '../api/nutritionApi.mjs';

const recipeDetail = document.getElementById("recipeDetail");
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

async function loadRecipe() {
  const meal = await getMealById(recipeId);

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ing) ingredients.push(`${measure} ${ing}`);
  }

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
      <img src="${meal.strMealThumb}">
      <h2 class="detail-title">${meal.strMeal}</h2>

      <div class="detail-buttons">
        <button class="button" id="favBtn">Add favorite functionality here!</button>
        <button class="button" id="shopBtn">Add to Shopping List</button>
      </div>

      <h3>Ingredients</h3>
      <ul class="ingredients-list">
        ${ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>

      <h3>Nutrition (per ingredient)</h3>
      <ul>
        ${nutrition.map(n => `
          <li>${n.name}: ${n.calories} cal, ${n.protein_g}g protein</li>
        `).join("")}
      </ul>
    </div>
  `;

  document.getElementById("favBtn").addEventListener("click", () => {
    addFavorite(meal);
    location.reload();
  });

  document.getElementById("shopBtn").addEventListener("click", () => {
    addToShoppingList(ingredients);
    alert("Added to shopping list!");
  });
}

loadRecipe();
