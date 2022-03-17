import "@reach/combobox/styles.css";
import "./SearchLocationModal.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Cancel, LocationOn,Search } from "@mui/icons-material";
import { Combobox, ComboboxInput, ComboboxList } from "@reach/combobox";
import { useRef } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useOutsideAlerter } from "../../customHooks/useOutsideAlerter";

const SearchLocationModal = ({
  setLocationModalActive,
  updateLocation,
  locationModalActive,
}) => {
  
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const locationModalContent = useRef()
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  
  const handleSelect = (val) => {
    setValue(val, false);
  };
  
  const handleClick = ({ place_id, description }) => {
    setLocationModalActive(false);
    updateLocation(description.toString());
    clearSuggestions();
  };
  const ErrorComponent = () => (<div>Error</div>)
  const Spinner = () => (<div>Spinning</div>)
  const renderMapsApi = (status) => {
    switch (status) {
      case Status.LOADING:
        return <Spinner />;
      case Status.FAILURE:
        return <ErrorComponent />;
      case Status.SUCCESS:
        return <Places />;
    }
  };
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
  
  useOutsideAlerter({ 
    ref: locationModalContent, 
    setModalActive: setLocationModalActive 
  })

  return (
    <div
      className="locationModal"
      style={{ display: `${locationModalActive ? "flex" : "none"}` }}
    >
      <div ref={locationModalContent} className="locationModalContent">
        <div className="locationModalTop">
          <h3> Search for location</h3>
          <Cancel
            className="locationModalCloseBtn"
            fontSize="large"
            onClick={(e) => setLocationModalActive(false)}
          />
        </div>

        <Wrapper 
          apiKey={process.env.REACT_APP_MAPS_API_KEY}
          libraries={["places"]}
          render={renderMapsApi}
        >
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
        </Wrapper>
      </div>
    </div>
  );
};

export default SearchLocationModal;
