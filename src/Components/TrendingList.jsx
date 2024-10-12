import { useState, useEffect } from "react";
import CardList from "./CardList";
import Modal from "./Modal";
import MovieDetails from "./MovieDetails";
import SeriesDetails from "./SeriesDetails";
import PersonDetails from "./PersonDetails";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const TrendingList = ({ watchList, setWatchList }) => {
  const [trendingList, setTrendingList] = useState([]);
  const [listLength, setListLength] = useState(0);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    const response = await fetch(
      "https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/trending?page=1"
    );
    const data = await response.json();
    console.log(data);
    setTrendingList(data.results);
    setListLength(data.total_results);
  };

  const fetchMore = async (newPage) => {
    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/trending?page=${newPage}`
    );
    const data = await response.json();
    console.log(data.results);
    setTrendingList((prevResults) => [...prevResults, ...data.results]);
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
    setIndex(trendingList.findIndex((result) => result.id === id));
    openModal();
  };

  const handleAddToWatchList = (id) => {
    const movie = trendingList.find((result) => result.id === id);
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
    const id = trendingList[index + 1].id;
    const media = trendingList[index + 1].media_type;
    fetchDetails(media, id);
  };

  const handlePreviousDetails = () => {
    const id = trendingList[index - 1].id;
    const media = trendingList[index - 1].media_type;
    fetchDetails(media, id);
  };

  return (
    <div className="grow">
      <div className="flex items-center justify-between m-7 max-w-screen-2xl 2xl:mx-auto">
        <h2 className="text-3xl font-display">Trending</h2>
      </div>
      {trendingList.length === 0 && <div className="loader">Loading...</div>}
      <CardList
        list={trendingList}
        listLength={listLength}
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
    </div>
  );
};

export default TrendingList;
