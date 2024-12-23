import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/countries`)
      .then(response => setCountries(response.data))
      .catch(error => console.error(error));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Country List</h1>

        
        <div className="mb-6">
          <input
            type="text"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCountries.length > 0 ? (
            filteredCountries.map(country => (
              <li key={country.countryCode} className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform hover:scale-105">
                <Link
                  to={`/country/${country.countryCode}`}
                  state={{ countryName: country.name }} 
                  className="block text-center"
                >
                  <img
                    src={`https://flagpedia.net/data/flags/h80/${country.countryCode.toLowerCase()}.png`}
                    alt={`${country.name} Flag`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-700">{country.name}</h2>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center col-span-full">No countries found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CountryList;