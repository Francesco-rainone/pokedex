import axios from 'axios';
import {useEffect} from 'react';
import PokemonCard from '../Components/pokemonCard';

const Homepage = ({ setPokemonList,pokemonList,searchQuery }) => {

    const filteredPokemonName = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                // il numero massimo del limit è 1302 
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151'); 
                const urls = response.data.results.map(map => map.url);

                const details = await Promise.all(urls.map(url => axios.get(url)));
                setPokemonList(details.map(results => results.data));
            } catch (error) {
                console.error('Errore nel caricamento dei Pokémon:', error);
            }
        };
        fetchPokemon();
    }, [setPokemonList]);

    return(
        <div className="container">
            {filteredPokemonName.length > 0 ? (
                filteredPokemonName.map(pokemon => (
                    <PokemonCard 
                        key={pokemon.id} 
                        details={pokemon}
                    />
                ))
            ) : (
                <div className="loading">
                    <i className="fas fa-spinner"></i> Caricamento...
                </div>
            )}
        </div>
    )

    };
    
    
export default Homepage;
