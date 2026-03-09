import React, { createContext, useState, useCallback } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchRecipes = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/recipes?page=${page}`);
      const data = await response.json();
      setRecipes(data.recipes);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to fetch recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecipeById = useCallback(async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/recipes/${id}`);
      return await response.json();
    } catch (err) {
      setError('Failed to fetch recipe');
      console.error(err);
      return null;
    }
  }, []);

  const value = {
    recipes,
    loading,
    error,
    pagination,
    fetchRecipes,
    fetchRecipeById,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};