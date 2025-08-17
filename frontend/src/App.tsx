import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroDetailsPage } from './pages/HeroDetailsPage';
import { HomePage } from './pages/HomePage';
import { HeroEditPage } from './pages/HeroEditPage/HeroEditPage';
import { HeroCreatePage } from './pages/HeroCreatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/heroes/:id' element={<HeroDetailsPage />} />
        <Route path='/heroes/edit/:id' element={<HeroEditPage />} />
        <Route path='/heroes/new' element={<HeroCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
