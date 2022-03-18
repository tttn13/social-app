import { LocationOn, Search } from "@mui/icons-material";
import { Combobox, ComboboxInput, ComboboxList } from "@reach/combobox";

const PlacesSuggestions = ({ results }) => {
  const { value, ready, status, data, handleInput, handleSelect, handleClick } =
    results;
  const renderSuggestions = () => {
    const suggestions = data.map(({ place_id, description }) => (
      <li
        key={place_id}
        className="locationListItem"
        onClick={() => handleClick({ place_id, description })}
      >
        <LocationOn />
        {description}
      </li>
    ));

    return (
      <>
        {suggestions}
        <li className="locationListItem">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt=""
          />
        </li>
      </>
    );
  };

  return (
    <Combobox
      onSelect={handleSelect}
      aria-labelledby="demo"
      className="locationModalSearchBox"
    >
      <div className="locationModalSearch">
        <Search className="locationModalSearchIcon" type="submit" />
        <ComboboxInput
          className="locationSearchInput"
          style={{ width: 300, maxWidth: "90%" }}
          value={value}
          onChange={handleInput}
          placeholder="Where are you ?"
          disabled={!ready}
        />
      </div>

      <ComboboxList className="locationList">
        {status === "OK" && renderSuggestions()}
      </ComboboxList>
    </Combobox>
  );
};

export default PlacesSuggestions;
