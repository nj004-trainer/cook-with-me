const Like = require('../models/Like');
const Recipe = require('../models/Recipe');

exports.getLikeCount = async (req, res, next) => {
  try {
    const count = await Like.countDocuments({ recipeId: req.params.recipeId });
    res.json({ count });
  } catch (error) {
    next(error);
  }
};

exports.toggleLike = async (req, res, next) => {
  try {
    const { recipeId, sessionId } = req.body;

    if (!recipeId || !sessionId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const existingLike = await Like.findOne({ recipeId, sessionId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      recipe.likesCount -= 1;
      await recipe.save();
      res.json({ liked: false, count: recipe.likesCount });
    } else {
      const like = new Like({ recipeId, sessionId });
      await like.save();
      recipe.likesCount += 1;
      await recipe.save();
      res.json({ liked: true, count: recipe.likesCount });
    }
  } catch (error) {
    next(error);
  }
};

exports.hasUserLiked = async (req, res, next) => {
  try {
    const like = await Like.findOne({
      recipeId: req.params.recipeId,
      sessionId: req.params.sessionId,
    });
    res.json({ liked: !!like });
  } catch (error) {
    next(error);
  }
};