import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export default function CharacterGrid ({ episode }) {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const charactersPerPage = 15;
  
    useEffect(() => {
      if (episode) {
        const characterPromises = episode.characters.map(url => axios.get(url));
        Promise.all(characterPromises).then(res => setCharacters(res.map(r => r.data)));
      }
    }, [episode]);
  
    const handlePrevPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if ((currentPage + 1) * charactersPerPage < characters.length) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const startIndex = currentPage * charactersPerPage;
    const currentCharacters = characters.slice(startIndex, startIndex + charactersPerPage);
  
    return (
      <div className="relative h-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {currentCharacters.map(character => (
            <div key={character.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={character.image} alt={character.name} className="w-full h-auto rounded-md" />
              <h3 className="text-lg font-bold mt-2">{character.name}</h3>
            </div>
          ))}
        </div>
  
    
        {characters.length > charactersPerPage && (
          <div className="absolute mt-4 flex justify-between w-full">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="bg-gray-800 text-white p-2 disabled:opacity-50">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
  
            <button
              onClick={handleNextPage}
              disabled={(currentPage + 1) * charactersPerPage >= characters.length}
              className="bg-gray-800 text-white p-2 disabled:opacity-50">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    );
  };