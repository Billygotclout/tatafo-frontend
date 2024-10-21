const SearchBar = ({ search, setSearch }) => {
  return (
    <form className="w-full px-5" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search"
        className="w-full py-2 pl-3 pr-10 border border-gray-300 focus:border-orange-500 rounded-md focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
