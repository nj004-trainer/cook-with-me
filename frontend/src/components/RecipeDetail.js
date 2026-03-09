import React, { useEffect, useState, useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import CommentSection from './CommentSection';

const RecipeDetail = ({ recipe, onBack, sessionId }) => {
  const [fullRecipe, setFullRecipe] = useState(recipe);
  const [likes, setLikes] = useState(recipe.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const { fetchRecipeById } = useContext(RecipeContext);

  useEffect(() => {
    const loadRecipe = async () => {
      const data = await fetchRecipeById(recipe._id);
      if (data) {
        setFullRecipe(data);
        setLikes(data.likesCount || 0);
      }
    };
    loadRecipe();

    if (sessionId) {
      fetchLikeStatus();
    }
  }, [recipe._id, sessionId, fetchRecipeById]);

  const fetchLikeStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/likes/user/${sessionId}/recipe/${recipe._id}`
      );
      const data = await response.json();
      setIsLiked(data.liked);
    } catch (err) {
      console.error('Error fetching like status:', err);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/likes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipeId: recipe._id, sessionId }),
        }
      );
      const data = await response.json();
      setLikes(data.count);
      setIsLiked(data.liked);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  return (
    <div className="recipe-detail">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="recipe-detail-header">
        <div className="recipe-title-section">
          <h1>{fullRecipe.title}</h1>
          {fullRecipe.isUnique && <span className="unique-badge">✨ Unique Recipe</span>}
        </div>

        <p className="recipe-description-full">{fullRecipe.description}</p>

        <div className="recipe-detail-meta">
          <span className="meta-item">📂 {fullRecipe.category}</span>
          <span className="meta-item">👥 Servings: {fullRecipe.servings}</span>
          <span className="meta-item">⏱️ Cook Time: {fullRecipe.cookTime} minutes</span>
          <span className="meta-item">📊 {fullRecipe.difficulty}</span>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {fullRecipe.ingredients && fullRecipe.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {fullRecipe.instructions && fullRecipe.instructions.map((instruction, idx) => (
              <li key={idx}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="recipe-actions">
        <button className={`like-btn-large ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          ❤️ {likes} Likes
        </button>
      </div>

      <CommentSection recipeId={recipe._id} commentsCount={fullRecipe.commentsCount} sessionId={sessionId} />
    </div>
  );
};

export default RecipeDetail;