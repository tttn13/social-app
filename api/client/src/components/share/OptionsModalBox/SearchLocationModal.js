import "@reach/combobox/styles.css";
import "./SearchLocationModal.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Cancel } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useOutsideAlerter } from "../../customHooks/useOutsideAlerter";
import PlacesSuggestions from "./PlacesSuggestions";

const SearchLocationModal = ({
  setLocationModalActive,
  updateLocation,
  locationModalActive,
}) => {
  const {
    init,
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false
  });

  const locationModalContent = useRef();
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
  
  const ErrorComponent = () => <div>Error</div>;
  const Spinner = () => <div>Spinning</div>;
  const renderMapsApi = (scriptStatus) => {
    switch (scriptStatus) {
      case Status.LOADING:
        console.log("rendering maps api loading");
        return <Spinner />;
      case Status.FAILURE:
        console.log("rendering maps api failed");
        return <ErrorComponent />;
    }
  };

  const results = {
    value: value,
    ready: ready,
    status: status,
    data: data,
    handleInput,
    handleSelect,
    handleClick,
  };

  useEffect(() => {
    if (locationModalActive) {
      console.log("init at status and modal active");
      init();
    }
  }, [locationModalActive]);

  useOutsideAlerter({
    ref: locationModalContent,
    setModalActive: setLocationModalActive,
  });

  return (
    <Wrapper
      apiKey={process.env.REACT_APP_MAPS_API_KEY}
      libraries={["places"]}
      render={renderMapsApi}
    >
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

          <PlacesSuggestions results={results} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchLocationModal;
