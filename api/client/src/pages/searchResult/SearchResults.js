import { useContext } from "react";
import "./SearchResults.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Post from "../../components/post/Post";
import { isEmpty, extractSearchQuery } from "../../utils/utils";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useFetchSearchResults } from "../../components/customHooks/useFetchSearchResults";
import CloseFriend from "../../components/closeFriend/CloseFriend";
import Loading from "../Loading";

const SearchResults = () => {
  const user = useContext(AuthContext).user.user;
  const location = useLocation();
  const { results: searchResults } = useFetchSearchResults({
    user: user,
    searchQuery: extractSearchQuery(location.search),
  });

  const ResultsContent = ({ results }) => {
    return (
      <div className="feed">
        <div className="feedWrapper">
          <h2 className="searchResultsHeader">Search Results</h2>
          <hr className="searchResultsDivider"></hr>
          {results.length > 0 ? (
            results.map((res) => {
              if (res._id === -100) {
                return <div key={res._id}> No Results Found </div>;
              } else {
                if (!res.username) {
                  return <Post key={res._id} post={res} />;
                } else {
                  return (
                    <CloseFriend
                      key={res._id}
                      user={res}
                      style={{
                        fontWeight: 500,
                        color: "black",
                        textDecoration: "none",
                      }}
                    />
                  );
                }
              }
            })
          ) : (
            <div className="loading">
              <Loading />
              
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {!isEmpty(user) && searchResults && (
        <>
          <Topbar />
          <div className="homeContainer">
            <Sidebar />
            <ResultsContent results={searchResults} />
            <Rightbar currentUser={user} />
          </div>
        </>
      )}
    </>
  );
};

export default SearchResults;
