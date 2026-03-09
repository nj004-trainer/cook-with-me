import React, { useEffect, useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';

const RecipeList = ({ onSelectRecipe, sessionId }) => {
  const { recipes, loading, error, pagination, fetchRecipes } = useContext(RecipeContext);

  useEffect(() => {
    fetchRecipes(1);
  }, [fetchRecipes]);

  if (loading && recipes.length === 0) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="recipe-list-container">
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onSelect={onSelectRecipe}
            sessionId={sessionId}
          />
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-btn ${pagination.page === page ? 'active' : ''}`}
            onClick={() => fetchRecipes(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;