const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
require('dotenv').config();

const uniqueRecipes = [
  {
    title: 'Spiced Butternut Squash Risotto with Sage',
    description: 'A creamy, luxurious risotto infused with roasted butternut squash, crispy sage, and a touch of nutmeg.',
    ingredients: ['Arborio rice', 'butternut squash', 'vegetable broth', 'white wine', 'onion', 'garlic', 'sage', 'parmesan', 'butter', 'salt', 'pepper'],
    instructions: [
      'Roast diced butternut squash at 400°F for 25 minutes until caramelized',
      'Heat broth in a separate pan',
      'Sauté onion and garlic in butter',
      'Add rice and toast for 2 minutes',
      'Add white wine and stir until absorbed',
      'Gradually add warm broth, one ladle at a time, stirring constantly',
      'After 15 minutes, fold in roasted squash',
      'Continue adding broth until rice is creamy and al dente (about 5 more minutes)',
      'Finish with crispy sage leaves and grated parmesan'
    ],
    category: 'dinner',
    servings: 4,
    cookTime: 45,
    difficulty: 'medium',
    isUnique: true,
  },
  {
    title: 'Miso-Glazed Salmon with Black Sesame Crust',
    description: 'Pan-seared salmon topped with a sweet and umami miso glaze, finished with a dramatic black sesame seed crust.',
    ingredients: ['salmon fillets', 'white miso', 'honey', 'soy sauce', 'ginger', 'garlic', 'black sesame seeds', 'olive oil', 'green onions'],
    instructions: [
      'Mix white miso, honey, soy sauce, minced ginger, and minced garlic',
      'Heat olive oil in a skillet over medium-high heat',
      'Sear salmon skin-side up for 4 minutes',
      'Flip and coat with miso glaze',
      'Cook for another 4 minutes until glaze caramelizes',
      'Transfer to a plate and sprinkle with black sesame seeds',
      'Garnish with sliced green onions and serve'
    ],
    category: 'dinner',
    servings: 2,
    cookTime: 20,
    difficulty: 'medium',
    isUnique: true,
  },
  {
    title: 'Charcoal Matcha Latte with Oat Milk Foam',
    description: 'A visually striking combination of activated charcoal smoothness with earthy matcha and silky oat milk foam.',
    ingredients: ['matcha powder', 'activated charcoal powder', 'hot water', 'oat milk', 'honey', 'vanilla extract'],
    instructions: [
      'Whisk matcha powder with 2oz hot water until smooth',
      'Add a pinch of activated charcoal powder and whisk well',
      'Heat oat milk and froth with a frother',
      'Pour matcha mixture into a cup',
      'Top with oat milk foam',
      'Drizzle with honey and add a drop of vanilla extract'
    ],
    category: 'beverage',
    servings: 1,
    cookTime: 5,
    difficulty: 'easy',
    isUnique: true,
  },
  {
    title: 'Cardamom & Pistachio Panna Cotta with Rose Water',
    description: 'Delicate Italian custard infused with ground cardamom and pistachio, topped with a floral rose water sauce.',
    ingredients: ['heavy cream', 'ground cardamom', 'pistachio paste', 'gelatin', 'milk', 'rose water', 'sugar', 'pistachios'],
    instructions: [
      'Heat cream with cardamom until steaming (do not boil)',
      'Bloom gelatin in cold water for 5 minutes',
      'Mix pistachio paste into heated cream',
      'Remove from heat and add gelatin, stir until dissolved',
      'Pass through a fine sieve',
      'Pour into serving glasses and refrigerate for 4 hours',
      'Prepare rose water sauce by mixing rose water with simple syrup',
      'Top with sauce and crushed pistachios before serving'
    ],
    category: 'dessert',
    servings: 4,
    cookTime: 20,
    difficulty: 'hard',
    isUnique: true,
  },
  {
    title: 'Korean Gochujang Fried Chicken with Crispy Garlic',
    description: 'Double-fried chicken coated in a spicy-sweet gochujang glaze with crispy fried garlic chips.',
    ingredients: ['chicken thighs', 'gochujang', 'honey', 'soy sauce', 'rice vinegar', 'garlic', 'ginger', 'vegetable oil', 'cornstarch', 'flour'],
    instructions: [
      'Cut chicken thighs into bite-sized pieces',
      'Mix cornstarch and flour with salt and pepper',
      'Coat chicken and first fry at 325°F for 10 minutes',
      'Rest for 2 minutes',
      'Second fry at 375°F for 3-4 minutes until golden and crispy',
      'Make sauce: mix gochujang, honey, soy sauce, rice vinegar, minced ginger and garlic',
      'Toss fried chicken in gochujang glaze',
      'Fry sliced garlic until crispy and golden',
      'Garnish with crispy garlic chips and serve hot'
    ],
    category: 'dinner',
    servings: 4,
    cookTime: 45,
    difficulty: 'hard',
    isUnique: true,
  },
];

const classicRecipes = [
  {
    title: 'Classic Tomato Pasta Sauce',
    description: 'A simple yet delicious tomato-based pasta sauce made with fresh ingredients.',
    ingredients: ['tomatoes', 'garlic', 'onion', 'olive oil', 'basil', 'salt', 'pepper'],
    instructions: ['Heat olive oil', 'Sauté garlic and onion', 'Add tomatoes', 'Simmer for 20 minutes', 'Add basil and serve'],
    category: 'dinner',
    servings: 4,
    cookTime: 30,
    difficulty: 'easy',
    isUnique: false,
  },
  {
    title: 'Grilled Chicken Breast',
    description: 'Perfectly seasoned and grilled chicken breast, tender and juicy.',
    ingredients: ['chicken breast', 'olive oil', 'salt', 'pepper', 'lemon', 'garlic'],
    instructions: ['Season chicken', 'Heat grill', 'Grill for 6-7 minutes per side', 'Rest and serve'],
    category: 'dinner',
    servings: 2,
    cookTime: 20,
    difficulty: 'easy',
    isUnique: false,
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies with a perfect chewy texture.',
    ingredients: ['flour', 'butter', 'sugar', 'brown sugar', 'eggs', 'vanilla', 'baking soda', 'salt', 'chocolate chips'],
    instructions: ['Cream butter and sugars', 'Add eggs and vanilla', 'Mix in dry ingredients', 'Fold in chocolate chips', 'Bake at 375°F for 9-11 minutes'],
    category: 'dessert',
    servings: 24,
    cookTime: 15,
    difficulty: 'easy',
    isUnique: false,
  },
  {
    title: 'Caesar Salad',
    description: 'Fresh romaine lettuce with homemade Caesar dressing and croutons.',
    ingredients: ['romaine lettuce', 'parmesan', 'croutons', 'anchovies', 'garlic', 'lemon juice', 'olive oil', 'egg'],
    instructions: ['Prepare dressing', 'Toss lettuce with dressing', 'Top with croutons and parmesan', 'Serve immediately'],
    category: 'lunch',
    servings: 4,
    cookTime: 10,
    difficulty: 'easy',
    isUnique: false,
  },
  {
    title: 'Scrambled Eggs',
    description: 'Fluffy scrambled eggs, perfect for any breakfast.',
    ingredients: ['eggs', 'butter', 'salt', 'pepper', 'milk'],
    instructions: ['Whisk eggs with milk', 'Melt butter in pan', 'Pour in eggs', 'Stir constantly until cooked', 'Season and serve'],
    category: 'breakfast',
    servings: 2,
    cookTime: 5,
    difficulty: 'easy',
    isUnique: false,
  },
];

const anonNames = [
  'Chef Aurora', 'Kitchen Ninja', 'Flavor Master', 'Spice Lover', 'Sweet Tooth',
  'Garden Fresh', 'Quick Cook', 'Grill Master', 'Comfort Food Fan', 'Health Nut',
  'Foodie Joy', 'Homemade Hero', 'Recipe Hunter', 'Taste Tester', 'Kitchen Wizard',
  'Culinary Dream', 'Simple Cook', 'Bold Flavors', 'Clean Eating', 'Cozy Kitchen',
  'Breakfast Pro', 'Dinner Star', 'Snack Attack', 'Sweet Dreams', 'Savory Soul',
  'Kitchen Quest', 'Flavor Quest', 'Food Passion', 'Cook Daily', 'Always Hungry',
];

const sampleComments = [
  'This was amazing! Making it again this weekend.',
  'Followed the recipe exactly and it turned out perfectly.',
  'Would be better with less salt in my opinion.',
  'The flavors really work well together!',
  'My family loved this dish.',
  'Tried a variation with different vegetables - still delicious.',
  'Easy to follow instructions, thank you!',
  'This has become a family favorite.',
  'Would recommend to anyone looking for a quick meal.',
  'The texture was perfect!',
  'Added my own twist to this recipe and it was great.',
  'Definitely making this again.',
  'My kids even ate their vegetables thanks to this recipe.',
  'Restaurant quality at home!',
  'Simple but so tasty.',
  'Already made this 3 times this month.',
  'The sauce is the star of this dish.',
  'Impressive enough for dinner guests.',
  'This recipe is a lifesaver on busy weekdays.',
  'The ingredients are affordable and easy to find.',
  'Cooked this for my partner and they loved it.',
  'One of my go-to recipes now.',
  'The presentation is beautiful too!',
  'Finally found a recipe that lives up to the hype.',
  'My cooking skills leveled up with this.',
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-social', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Recipe.deleteMany({});
    await mongoose.connection.collection('comments').deleteMany({});

    // Insert unique recipes
    const insertedUnique = await Recipe.insertMany(uniqueRecipes);
    console.log(`Inserted ${insertedUnique.length} unique recipes`);

    // Generate 95 classic recipe variations
    const classicRecipesVariations = [];
    for (let i = 0; i < 95; i++) {
      const baseRecipe = classicRecipes[i % classicRecipes.length];
      classicRecipesVariations.push({
        ...baseRecipe,
        title: `${baseRecipe.title} (Variation ${i + 1})`,
      });
    }

    const insertedClassics = await Recipe.insertMany(classicRecipesVariations);
    console.log(`Inserted ${insertedClassics.length} classic recipe variations`);

    // Get all recipes
    const allRecipes = await Recipe.find({});

    // Distribute 500 comments across recipes
    const Comment = require('../models/Comment');
    const comments = [];

    for (let i = 0; i < 500; i++) {
      const randomRecipe = allRecipes[Math.floor(Math.random() * allRecipes.length)];
      const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
      const randomName = anonNames[Math.floor(Math.random() * anonNames.length)];

      comments.push({
        recipeId: randomRecipe._id,
        text: randomComment,
        anonName: randomName,
      });

      randomRecipe.commentsCount += 1;
      await randomRecipe.save();
    }

    await Comment.insertMany(comments);
    console.log(`Inserted ${comments.length} comments`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();