import React, { useState, useEffect } from 'react';

const RecipeCard = ({ recipe, onSelect, sessionId }) => {
  const [likes, setLikes] = useState(recipe.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchLikeStatus();
    }
  }, [sessionId, recipe._id]);

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

  const handleLike = async (e) => {
    e.stopPropagation();
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
    <div className="recipe-card" onClick={() => onSelect(recipe)}>
      <div className="recipe-card-header">
        <h3>{recipe.title}</h3>
        {recipe.isUnique && <span className="unique-badge">✨ Unique</span>}
      </div>
      <p className="recipe-description">{recipe.description.substring(0, 100)}...</p>
      <div className="recipe-meta">
        <span className="category">{recipe.category}</span>
        <span className="difficulty">{recipe.difficulty}</span>
        <span className="cook-time">⏱️ {recipe.cookTime} min</span>
      </div>
      <div className="recipe-stats">
        <span className="comments">💬 {recipe.commentsCount}</span>
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          ❤️ {likes}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;