# Cook With Me 🍳

A responsive social network for sharing, discovering, and enjoying recipes. Browse 100 curated recipes, like your favorites, and leave anonymous comments—all without creating an account.

**Live Demo:** *(Self-hosted on your server)*

---

## ✨ Features

- **100 Recipes**: 5 unique creations + 95 classic favorites
- **Text-Only Content**: Clean, focused recipe experience
- **500 Comments**: Anonymous comments spread throughout recipes
- **Like System**: Session-based likes (no login required)
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **No Accounts**: Completely anonymous experience
- **Self-Hosted**: Full Docker deployment included
- **Production Ready**: Docker Compose setup for easy deployment

---

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - REST API server
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI framework
- **Context API** - State management
- **CSS3** - Responsive styling with custom properties
- **LocalStorage** - Session persistence

### Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Self-Hosted** - Deploy on any server

---

## 📋 Project Structure

```
cook-with-me/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Recipe.js
│   │   ├── Comment.js
│   │   └── Like.js
│   ├── routes/
│   │   ├── recipes.js
│   │   ├── comments.js
│   │   └── likes.js
│   ├── controllers/
│   │   ├── recipeController.js
│   │   ├── commentController.js
│   │   └── likeController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── data/
│       └── seedRecipes.js
├── frontend/
│   ├── src/
│   │   ├── index.js
│   │   ├── App.js
│   │   ├── context/
│   │   │   └── RecipeContext.js
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── RecipeList.js
│   │   │   ├── RecipeCard.js
│   │   │   ├── RecipeDetail.js
│   │   │   ├── CommentSection.js
│   │   │   └── CommentForm.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   └── utils/
│   │       └── api.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
├── README.md
└── SETUP.md
```

---

## 🚀 Quick Start

### With Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/nj004-trainer/cook-with-me.git
cd cook-with-me

# 2. Start all services
docker-compose up -d

# 3. Seed the database
docker exec cook-with-me-backend npm run seed

# 4. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# MongoDB: localhost:27017
```

### Local Development

**Backend Setup:**
```bash
cd backend
npm install
npm run dev
```

**Frontend Setup (in another terminal):**
```bash
cd frontend
npm install
npm start
```

**Seed Database:**
```bash
cd backend
npm run seed
```

---

## 📡 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes (paginated, 10 per page)
- `GET /api/recipes/:id` - Get recipe by ID
- `GET /api/recipes/category/:category` - Get recipes by category

### Comments
- `GET /api/comments/recipe/:recipeId` - Get all comments for a recipe
- `POST /api/comments` - Create new comment
  - Body: `{ recipeId, text, anonName }`

### Likes
- `GET /api/likes/recipe/:recipeId` - Get like count for a recipe
- `POST /api/likes` - Toggle like
  - Body: `{ recipeId, sessionId }`
- `GET /api/likes/user/:sessionId/recipe/:recipeId` - Check if user liked

---

## 🗄️ Database Schema

### Recipe
```javascript
{
  title: String,
  description: String,
  ingredients: [String],
  instructions: [String],
  category: String, // breakfast, lunch, dinner, dessert, snack, beverage
  servings: Number,
  cookTime: Number, // minutes
  difficulty: String, // easy, medium, hard
  isUnique: Boolean,
  likesCount: Number,
  commentsCount: Number,
  createdAt: Date
}
```

### Comment
```javascript
{
  recipeId: ObjectId,
  text: String, // max 500 chars
  anonName: String, // randomly assigned
  createdAt: Date
}
```

### Like
```javascript
{
  recipeId: ObjectId,
  sessionId: String,
  createdAt: Date
  // Unique index: recipeId + sessionId
}
```

---

## 🎨 Color Scheme

- **Primary**: Coral Red (`#ff6b6b`)
- **Secondary**: Turquoise (`#4ecdc4`)
- **Accent**: Soft Yellow (`#ffe66d`)
- **Dark**: `#2c3e50`
- **Light**: `#ecf0f1`

---

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

All components are fully responsive and mobile-first.

---

## 🔧 Environment Variables

### Backend `.env`
```
MONGODB_URI=mongodb://localhost:27017/cook-with-me
PORT=5000
NODE_ENV=development
```

### Frontend `.env.local`
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 📊 Data

- **100 Recipes**: 5 unique custom recipes + 95 variations of 5 classic recipes
- **500 Comments**: Distributed across recipes with random anonymous names
- **Session-Based Likes**: No login required, tracked via localStorage session ID

---

## 🐳 Docker Deployment

### Build Images
```bash
docker-compose build
```

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Seed Database
```bash
docker exec cook-with-me-backend npm run seed
```

---

## 📖 Setup & Deployment Guide

See [SETUP.md](./SETUP.md) for detailed setup and self-hosted deployment instructions.

---

## 🤝 Contributing

This is a personal project. Feel free to fork and customize!

---

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 🎯 Roadmap

- [ ] Full-text search for recipes
- [ ] Filtering by category, difficulty, cook time
- [ ] Dark mode toggle
- [ ] Recipe ratings (in addition to likes)
- [ ] Social sharing functionality
- [ ] Mobile app version

---

## 💬 Questions or Issues?

Check the [SETUP.md](./SETUP.md) for troubleshooting or deployment help.

---

**Built with ❤️ using React, Node.js, and MongoDB**