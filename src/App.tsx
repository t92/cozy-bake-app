import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
