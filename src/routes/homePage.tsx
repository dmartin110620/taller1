import { useState, useEffect } from 'react';
import InputComponent from '../components/inputComponent';

interface NameEntry {
  id: number;  // Added ID field for database entries
  name: string;
}

function HomePage() {
  const [fullName, setFullName] = useState('');
  const [namesList, setNamesList] = useState<NameEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get API URL from environment variables
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchNames() {
      try {
        const response = await fetch(`${API_BASE}/names`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: NameEntry[] = await response.json();
        setNamesList(data);
      } catch (error) {
        console.error('Error fetching names:', error);
        setError(error instanceof Error ? error.message : 'Failed to load names');
      } finally {
        setIsLoading(false);
      }
    }

    fetchNames();
  }, [API_BASE]);

  async function handleSubmit() {
    if (!fullName.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/names`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newEntry: NameEntry = await response.json();
      setNamesList((prev) => [...prev, newEntry]);
      setFullName('');
      setError(null);
    } catch (error) {
      console.error('Error sending name:', error);
      setError(error instanceof Error ? error.message : 'Failed to save name');
    }
  }

  if (isLoading) {
    return <div className="text-center text-white">Loading names...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="max-w-lg w-full p-6 bg-gray-900 rounded-lg shadow-lg text-white">
        <h1 className="text-2xl text-white mb-4 text-center">Ingresa el Nombre</h1>
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
          Enviar
        </button>

        {/* Scrollable Box for Names */}
        <div className="mt-6 max-h-40 overflow-y-auto bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h2 className="text-lg text-gray-300 mb-2">Nombres ingresados:</h2>
          <ul className="text-white">
            {namesList.map((entry) => (
              <li key={entry.id} className="p-2 border-b border-gray-700 last:border-b-0">
                {entry.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;