import { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import CardList from "./CardList";
import Modal from "./Modal";
import MovieDetails from "./MovieDetails";
import SeriesDetails from "./SeriesDetails";
import PersonDetails from "./PersonDetails";

const Genres = ({ watchList, setWatchList }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(10751);
  const [selectedMedia, setSelectedMedia] = useState("movie");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const [details, setDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGenres(selectedMedia);
    fetchByGenre(selectedGenre);
  }, []);

  const fetchGenres = async (media) => {
    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/genres?media=${media}`
    );
    const data = await response.json();
    console.log(data);
    setGenres(data.genres);
  };

  const fetchByGenre = async (genre) => {
    setLoading(true);
    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/browse?media=${selectedMedia}&genre=${genre}&page=${page}`
    );
    const data = await response.json();
    console.log(data);
    setResults(data.results);
    setTotalResults(data.total_results);
    setLoading(false);
  };

  const fetchMore = async (newPage) => {
    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/browse?media=${selectedMedia}&genre=${selectedGenre}&page=${newPage}`
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

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
    setTotalResults(0);
    fetchByGenre(genre);
  };

  const handleMediaChange = (media) => {
    fetchGenres(media);
    setSelectedGenre(null);
    setPage(1);
    setResults([]);
    setTotalResults(0);
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
    <div className="grow">
      <div className="flex items-center justify-between m-7 max-w-screen-2xl 2xl:mx-auto">
        <h2 className="text-3xl font-display">Browse by Genre</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedMedia("movie");
              handleMediaChange("movie");
            }}
            className={`${
              selectedMedia === "movie"
                ? "bg-chartreuse-300 text-chartreuse-950"
                : "bg-zinc-700 text-zinc-50 hover:bg-chartreuse-800 focus:bg-chartreuse-800"
            }  rounded-full px-5 py-2 uppercase text-lg focus:outline-none focus:ring-1 focus:ring-chartreuse-300 transition-all ease-in-out`}
          >
            Movies
          </button>
          <button
            onClick={() => {
              setSelectedMedia("tv");
              handleMediaChange("tv");
            }}
            className={`${
              selectedMedia === "tv"
                ? "bg-chartreuse-300 text-chartreuse-950"
                : "bg-zinc-700 text-zinc-50 hover:bg-chartreuse-800 focus:bg-chartreuse-800"
            }  rounded-full px-5 py-2 uppercase text-lg focus:outline-none focus:ring-1 focus:ring-chartreuse-300 transition-all ease-in-out`}
          >
            TV Series
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center m-7 max-w-screen-2xl 2xl:mx-auto">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreChange(genre.id)}
            className={`${
              selectedGenre === genre.id
                ? "bg-chartreuse-300 text-chartreuse-950"
                : "bg-zinc-700 text-zinc-50 hover:bg-chartreuse-800 focus:bg-chartreuse-800"
            }  rounded-full px-5 py-2 uppercase text-lg focus:outline-none focus:ring-1 focus:ring-chartreuse-300 transition-all ease-in-out`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      {loading && (
        <div className="loader">
          Loading {selectedMedia === "movie" ? "Movies" : "TV Series"}...
        </div>
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
        media={selectedMedia}
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
    </div>
  );
};

export default Genres;
