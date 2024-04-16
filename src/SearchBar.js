const SearchBar = (props) => {
  return (
    <div className="SearchBar">
      <form>
        <input
          required
          type="text"
          name="city"
          autoComplete="on"
          spellCheck="true"
          value={props.city}
          placeholder="Type in city name"
          onChange={props.handleChange}
        ></input>
        <button onClick={props.handleSubmit}>find weather</button>
      </form>
    </div>
  );
};

export default SearchBar;
