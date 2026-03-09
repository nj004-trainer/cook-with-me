import React, { useEffect, useState } from 'react';
import { RecipeProvider } from './context/RecipeContext';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './styles/App.css';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Generate session ID for tracking likes
    const id = localStorage.getItem('sessionId') || `session_${Date.now()}_${Math.random()}`;
    localStorage.setItem('sessionId', id);
    setSessionId(id);
  }, []);

  return (
    <RecipeProvider>
      <div className="App">
        <Header />
        <main className="main-container">
          {selectedRecipe && sessionId ? (
            <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} sessionId={sessionId} />
          ) : (
            <RecipeList onSelectRecipe={setSelectedRecipe} sessionId={sessionId} />
          )}
        </main>
      </div>
    </RecipeProvider>
  );
}

export default App;