import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.js';
import PrettyJson from './components/PrettyJson/PrettyJson.js';
import ArticlePage from './components/ArticlePage/ArticlePage.js';
import FormPage from './components/FormPage/FormPage.js'; // Dodane

import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/form">Ogłoszenia</Link> {/* Dodane */}
        </nav>

        <Routes>
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/form" element={<FormPage />} /> {/* Dodane */}
          <Route path="/" element={<HomePage />} />
          <Route path="/PrettyJson" element={<PrettyJson />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
