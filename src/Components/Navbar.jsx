const Navbar = ({ searchQuery, setSearchQuery }) => {
    return (
        <nav className="navbar">
            <input
                className="search-input"
                type="text"
                placeholder="Cerca Pokémon..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />
        </nav>
    );
};

export default Navbar;
