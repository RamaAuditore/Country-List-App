import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CountryInfo = () => {
  const { code } = useParams();
  const location = useLocation();
  const [countryData, setCountryData] = useState(null);
  const countryName = location.state?.countryName; 

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/countries/${code}`)
      .then(response => setCountryData(response.data))
      .catch(error => console.error(error));
  }, [code]);

  if (!countryData) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );

  const { borders, populationData, flagUrl, name } = countryData;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
        
       
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-center">
          {countryName || name} Information
        </h1>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
         
          <div className="flex flex-col items-center">
            <img src={flagUrl} alt="Country flag" className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg shadow-lg" />
            <h2 className="text-xl sm:text-2xl font-semibold mt-4 text-center">
              {countryName || name}
            </h2>
          </div>

          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Borders of {countryName || name}
            </h3>
            <ul className="list-disc list-inside">
              {borders.length > 0 ? (
                borders.map((border, index) => (
                  <li key={`${border.countryCode}-${index}`} className="text-sm sm:text-base">
                    <Link to={`/country/${border.countryCode}`} className="text-blue-600 hover:underline">
                      {border.commonName} ({border.officialName})
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">No border countries available.</li>
              )}
            </ul>
          </div>
        </div>

        
        <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center">
          Population Over Time
        </h3>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;