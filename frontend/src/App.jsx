import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CountryList from './pages/CountryList';
import CountryInfo from './pages/CountryInfo';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
            <h1 className="text-2xl font-bold">Country App</h1>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:underline">Home</Link></li>
            </ul>
          </div>
        </nav>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:code" element={<CountryInfo />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2024 Country App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;