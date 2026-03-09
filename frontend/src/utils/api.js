const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  recipes: {
    getAll: (page = 1) => fetch(`${API_BASE_URL}/api/recipes?page=${page}`),
    getById: (id) => fetch(`${API_BASE_URL}/api/recipes/${id}`),
    getByCategory: (category) => fetch(`${API_BASE_URL}/api/recipes/category/${category}`),
  },
  comments: {
    getByRecipe: (recipeId) => fetch(`${API_BASE_URL}/api/comments/recipe/${recipeId}`),
    create: (data) =>
      fetch(`${API_BASE_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
  },
  likes: {
    getCount: (recipeId) => fetch(`${API_BASE_URL}/api/likes/recipe/${recipeId}`),
    toggle: (data) =>
      fetch(`${API_BASE_URL}/api/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    hasUserLiked: (sessionId, recipeId) =>
      fetch(`${API_BASE_URL}/api/likes/user/${sessionId}/recipe/${recipeId}`),
  },
};