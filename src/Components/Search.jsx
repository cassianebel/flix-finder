import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import CardList from "./CardList";
import Modal from "./Modal";
import MovieDetails from "./MovieDetails";
import SeriesDetails from "./SeriesDetails";
import PersonDetails from "./PersonDetails";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const Search = ({ watchList, setWatchList }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [details, setDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const query = useQuery().get("query"); // Get the query string from the URL

  const searchInput = useRef(null);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    // set the focus on the search input when the component mounts
    searchInput.current.focus();
  }, []);

  useEffect(() => {
    if (query) {
      fetchSearch(query);
    }
  }, [query]);

  const fetchSearch = async (searchTerm) => {
    setLoading(true);
    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/search?query=${searchTerm}&page=1`
    );
    const data = await response.json();
    console.log(data.results);
    setResults(data.results);
    setTotalResults(data.total_results);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearch(searchInput.current.value);
    navigate(`/search?query=${encodeURIComponent(searchInput.current.value)}`);
  };

  const fetchMore = async (newPage) => {
    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/search?query=${searchInput.current.value}&page=${newPage}`
    );
    const data = await response.json();
    console.log(data.results);
    setResults((prevResults) => [...prevResults, ...data.results]);
  };

  const handleFetchMore = () => {
    const newPage = page + 1;
    fetchMore(newPage);
    setPage((prevPage) => prevPage + 1);
  };

  const fetchDetails = async (media, id) => {
    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/details?media=${media}&id=${id}`
    );
    const data = await response.json();
    console.log(data);
    setDetails(data);
    setIndex(results.findIndex((result) => result.id === id));
    openModal();
  };

  const handleAddToWatchList = (id) => {
    const movie = results.find((result) => result.id === id);
    setWatchList((prevList) => [...prevList, movie]);
  };

  const handleRemoveFromWatchList = (id) => {
    const newWatchList = watchList.filter((item) => item.id !== id);
    setWatchList(newWatchList);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextDetails = () => {
    const id = results[index + 1].id;
    const media = results[index + 1].media_type;
    fetchDetails(media, id);
  };

  const handlePreviousDetails = () => {
    const id = results[index - 1].id;
    const media = results[index - 1].media_type;
    fetchDetails(media, id);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-96 lg:w-[600px] mx-auto my-5 mt-10 text-xl"
      >
        <div className="mx-3 flex items-center justify-between rounded-full bg-chartreuse-300 text-chartreuse-900 px-5 pe-2 shadow-glow shadow-zinc-950 focus-within:shadow-chartreuse-700 transition-all ease-in-out">
          <span className="text-2xl">
            <IoSearch />
          </span>
          <input
            type="text"
            placeholder="Search a title..."
            className="w-full p-2 rounded-full bg-chartreuse-300 placeholder:text-chartreuse-800 text-zinc-900 focus:outline-none"
            ref={searchInput}
          />
          <button
            type="submit"
            className="bg-chartreuse-800 hover:bg-chartreuse-900 text-chartreuse-100 p-1 px-4 rounded-full text-lg focus:outline-none focus:bg-chartreuse-900 transition-all ease-in-out"
          >
            SEARCH
          </button>
        </div>
      </form>
      {loading && <div className="loader">Loading...</div>}
      {totalResults === 0 && (
        <p className="text-center m-7 text-2xl">No results found</p>
      )}
      <CardList
        list={results}
        listLength={totalResults}
        fetchDetails={fetchDetails}
        watchList={watchList}
        handleAddToWatchList={handleAddToWatchList}
        handleRemoveFromWatchList={handleRemoveFromWatchList}
        handleFetchMore={handleFetchMore}
        page={page}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {details && (
          <div className="flex justify-start gap-4">
            <button onClick={handlePreviousDetails} className="text-2xl">
              <IoIosArrowDropleftCircle />
            </button>

            {details.title ? (
              <MovieDetails
                details={details}
                watchList={watchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                handleAddToWatchList={handleAddToWatchList}
              />
            ) : details.name && details.first_air_date ? (
              <SeriesDetails
                details={details}
                watchList={watchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                handleAddToWatchList={handleAddToWatchList}
              />
            ) : details.name && details.known_for_department ? (
              <PersonDetails
                details={details}
                watchList={watchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                handleAddToWatchList={handleAddToWatchList}
              />
            ) : (
              <div>Unknown type</div>
            )}
            <button onClick={handleNextDetails} className="text-2xl">
              <IoIosArrowDroprightCircle />
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Search;
