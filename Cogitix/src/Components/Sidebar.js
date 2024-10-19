// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Sidebar ({ onEpisodeSelect })  {
//     const [episodes, setEpisodes] = useState([]);

//   useEffect(() => {
//     axios.get('https://rickandmortyapi.com/api/episode')
//       .then(res => setEpisodes(res.data.results));
//   }, []);

//   return (
//     <div className="w-1/4  p-4 h-full">
//       <h2 className="text-white text-xl mb-4">Episodes</h2>
//       <ul>
//         {episodes.map(episode => (
//           <li key={episode.id}
//               className="text-gray-400 hover:text-black cursor-pointer p-2"
//               onClick={() => onEpisodeSelect(episode)}>
//             {episode.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Sidebar({ onEpisodeSelect }) {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null); // Track selected episode

  // Fetch episodes from the API
  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/episode')
      .then(res => setEpisodes(res.data.results));
  }, []);

  // Handle episode click
  const handleEpisodeClick = (episode) => {
    if (selectedEpisodeId === episode.id) {
      // If the selected episode is clicked again, unselect it
      setSelectedEpisodeId(null);
      onEpisodeSelect(null); // Reset to the initial state
    } else {
      // Select the new episode
      setSelectedEpisodeId(episode.id);
      onEpisodeSelect(episode);
    }
  };

  return (
    <div className="w-1/4 p-4 h-full">
      <h2 className="text-black text-xl mb-4">Episodes</h2>
      <ul>
        {episodes.map(episode => (
          <li
            key={episode.id}
            className={`cursor-pointer p-2 
                        ${selectedEpisodeId === episode.id 
                          ? 'text-white bg-gray-700 border-l-4 border-blue-500' // Highlight selected
                          : 'text-gray-400 hover:text-black'}`} // Default styling
            onClick={() => handleEpisodeClick(episode)}
          >
            {episode.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

