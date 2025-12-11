// This file contains the functions that send a request to the meal API

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// This function searches for meals based on a string like "Chicken"
export async function searchMeals(query) {
  const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const data = await res.json();
  return data.meals || [];
}

// This function looks a meal up by its id for further details
export async function getMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}
