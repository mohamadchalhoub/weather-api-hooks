const SearchBar = (props) => {
  return (
    <div className="SearchBar">
      <form onSubmit={props.getData}>
        <input type="text" placeholder="type in a city name"></input>
        <button onClick={props.getData}>find weather</button>
      </form>
    </div>
  );
};

export default SearchBar;
