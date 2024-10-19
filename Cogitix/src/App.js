import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import CharacterGrid from './Components/CharacterGrid';
const App = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar onEpisodeSelect={setSelectedEpisode} />
      <main className="flex-1 p-4">
        {selectedEpisode ? (
          <CharacterGrid episode={selectedEpisode} />
        ) : (
          <p className="text-center text-gray-500">Select an episode to view characters.</p>
        )}
      </main>
    </div>
  );
};
export default App