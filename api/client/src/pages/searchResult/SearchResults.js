import "./SearchResults.css";

import { useContext } from "react";
import { useLocation } from "react-router-dom";

import CloseFriend from "../../components/closeFriend/CloseFriend";
import { useFetchSearchResults } from "../../components/customHooks/useFetchSearchResults";
import Post from "../../components/post/Post";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { extractSearchQuery, isEmpty } from "../../utils/utils";
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
      <div className="searchPagefeed">
        <div className="searchPagefeedWrapper">
          <h2 className="searchPageHeader">Search Results</h2>
          <hr className="searchPageDivider"></hr>
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
          <div className="resultPageContainer">
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
