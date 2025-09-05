import { Link } from 'react-router';

const PokemonCard = ({ details }) => {
  if (!details) return null;

  const FirstType = details.types[0].type.name;

  return (
    <Link
      to={`/pokemon/${details.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="pokemon-card">
        <div className={`card-top FirstType-${FirstType}`}>
          <span className="pokemon-id">
            #{String(details.id).padStart(3, '0')}
          </span>
          <div className="pokemon-img-container">
            <img
              src={details.sprites.other['official-artwork'].front_default || details.sprites.front_default}
                alt={details.name}
              className="pokemon-image"
            />
          </div>
          <h3 className="pokemon-name">{details.name}</h3>
          <div className="pokemon-types">
            {details.types.map((pokemon) => (
              <span 
                key={pokemon.type.name} 
                className={`pokemon-type type-${pokemon.type.name}`}
              >
                {pokemon.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;