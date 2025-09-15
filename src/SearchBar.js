const SearchBar = (props) => {
  return (
    <div className="SearchBar">
      <form>
        <div className="search-input-container">
          <input
            required
            type="text"
            name="city"
            autoComplete="off"
            spellCheck="true"
            value={props.city}
            placeholder="Type in city name"
            onChange={props.handleChange}
            onFocus={props.handleInputFocus}
          ></input>
          {props.showSuggestions && props.suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {props.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onMouseDown={(e) => { e.preventDefault(); props.handleSuggestionClick(suggestion); }}
                  onTouchStart={(e) => { e.preventDefault(); props.handleSuggestionClick(suggestion); }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={props.handleSubmit}>find weather</button>
      </form>
    </div>
  );
};

export default SearchBar;
