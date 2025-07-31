import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router'; 
import PokemonDetails from './Pages/PokemonDetails';
import Homepage from './Pages/Homepage';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  

  return (
    <article>
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Homepage 
              pokemonList={pokemonList} 
              setPokemonList={setPokemonList} 
              searchQuery={searchQuery}
            />
          } 
        />
        <Route 
          path="/pokemon/:id" 
          element={<PokemonDetails />} 
        />
      </Routes>
    </article>
  );
};

export default App;