const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Recipe.countDocuments();

    res.json({
      recipes,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.getRecipesByCategory = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};