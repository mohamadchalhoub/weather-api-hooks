const SearchBar = (props) => {
  return (
    <div className="SearchBar">
      <form>
        <input
          required
          type="text"
          name="city"
          value={props.city}
          placeholder="type in city name"
          onChange={props.handleChange}
        ></input>
        <button onClick={props.handleSubmit}>find weather</button>
      </form>
    </div>
  );
};

export default SearchBar;
