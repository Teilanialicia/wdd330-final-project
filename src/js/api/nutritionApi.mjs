// This file interacts with the api-ninjas API. It gets the nutritional value for the recipes' ingredients.

const API_KEY = "E7wKL8t51k9C+19gse7GSA==7qxkLs20RFHgYuW1";

export async function getNutrition(query) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      console.error("Nutrition API error:", response.status);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching nutrition:", err);
    return [];
  }
}
