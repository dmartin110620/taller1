import React, { useState, useEffect } from 'react';
import InputComponent from '../components/inputComponent';

const HomePage = () => {
  const [fullName, setFullName] = useState('');
  const [namesList, setNamesList] = useState<string[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('/api/names');
        const data = await response.json();
        setNamesList(data);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };

    fetchNames();
  }, []);

  const handleSubmit = async () => {
    if (!fullName.trim()) return;

    try {
      const response = await fetch('/api/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName }),
      });

      if (response.ok) {
        setNamesList((prev) => [...prev, fullName]);
        setFullName('');
      } else {
        console.error('Failed to send name');
      }
    } catch (error) {
      console.error('Error sending name:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="max-w-lg w-full p-6 bg-gray-900 rounded-lg shadow-lg text-cool-white">
        <h1 className="text-2xl text-cool-white mb-4 text-center">Ingresa el Nombre</h1>
        <InputComponent
          name="Nombre Completo"
          onChange={setFullName}
          placeholder="Ingresa el nombre"
          type="text"
          defaultValue={fullName}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {/* Scrollable Box for Names */}
        <div className="mt-6 max-h-40 overflow-y-auto bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-lg text-gray-300 mb-2">Nombres ingresados:</h2>
          <ul className="text-white">
            {namesList.map((name, index) => (
              <li key={index} className="p-2 border-b border-gray-700 last:border-b-0">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;