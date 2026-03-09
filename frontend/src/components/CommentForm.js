import React, { useState } from 'react';

const anonNames = [
  'Chef Aurora', 'Kitchen Ninja', 'Flavor Master', 'Spice Lover', 'Sweet Tooth',
  'Garden Fresh', 'Quick Cook', 'Grill Master', 'Comfort Food Fan', 'Health Nut',
  'Foodie Joy', 'Homemade Hero', 'Recipe Hunter', 'Taste Tester', 'Kitchen Wizard',
  'Culinary Dream', 'Simple Cook', 'Bold Flavors', 'Clean Eating', 'Cozy Kitchen',
];

const CommentForm = ({ recipeId, onCommentAdded }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const randomName = anonNames[Math.floor(Math.random() * anonNames.length)];

      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipeId,
            text,
            anonName: randomName,
          }),
        }
      );

      if (response.ok) {
        const comment = await response.json();
        onCommentAdded(comment);
        setText('');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        placeholder="Share your thoughts about this recipe..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
        rows={3}
        disabled={loading}
      />
      <div className="comment-form-footer">
        <span className="char-count">{text.length}/500</span>
        <button type="submit" disabled={loading || !text.trim()}>
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;