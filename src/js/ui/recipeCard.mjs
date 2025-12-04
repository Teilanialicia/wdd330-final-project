export function createRecipeCard(meal) {
  const card = document.createElement("div");
  card.className = "recipe-card";
  card.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h4>${meal.strMeal}</h4>
  `;

  card.addEventListener("click", () => {
    window.location.href = `html/recipe.html?id=${meal.idMeal}`;
  });

  return card;
}
