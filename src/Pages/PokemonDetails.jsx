import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Errore nel caricamento dei dettagli:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return (
      <div className="loading">
        <i className="fas fa-spinner"></i> Caricamento...
      </div>
    );
  }

  const FirstType = pokemon.types[0].type.name;

  return (
    <article className="single-card-container">
      <div className={`pokemon-card FirstType-${FirstType}`}>
        <div className="details-grid-container parent">
          <div className="left-column">
            <Link to="/" className="back-button">
              <i className="fas fa-angle-left"></i>
            </Link>
            <span className="single-pokemon-id">
              #{String(pokemon.id).padStart(3, '0')}
            </span>

            <div className="pokemon-single-img-container">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            </div>
            <h2 className="pokemon-single-name">{pokemon.name}</h2>
            <div className="single-pokemon-types">
              {pokemon.types.map((pokemonType) => (
                <span
                  key={pokemonType.type.name}
                  className={`single-pokemon-type type-${pokemonType.type.name}`}
                >
                  {pokemonType.type.name}
                </span>
              ))}
            </div>
            <section className="info-section">
              <div className="characteristics">
                <div className="characteristic">
                  <span className="characteristic-label">Height  </span>
                  <span className="characteristic-value">{pokemon.height / 10}m</span>
                </div>
                <div className="characteristic">
                  <span className="characteristic-label">Weight  </span>
                  <span className="characteristic-value">{pokemon.weight / 10}kg</span>
                </div>
              </div>
            </section>
          </div>

          <div className="right-column">
            
            <section className="info-section">
              <h3>Abilities</h3>
              <div className="abilities">
                {pokemon.abilities.map((ability) => (
                  <div key={ability.ability.name} className="ability-item">
                    <span className="ability-name">{ability.ability.name}</span>
                    {ability.is_hidden && <span className="hidden-badge">Hidden</span>}
                  </div>
                ))}
              </div>
            </section>
            
            <section className="info-section pokemon-stats">
              <h3>Base Stats</h3>
              <div className="stats">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-bar">
                    <span className="stat-name">{stat.stat.name}</span>
                    <div className="stat-bar-container">
                      <div
                        className="stat-bar-fill"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      >
                         <span className="stat-value">{stat.base_stat}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PokemonDetails;