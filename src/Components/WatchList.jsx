import { useState } from "react";
import { NavLink } from "react-router-dom";
import CardList from "./CardList";
import Modal from "./Modal";
import MovieDetails from "./MovieDetails";
import SeriesDetails from "./SeriesDetails";
import PersonDetails from "./PersonDetails";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

const WatchList = ({ watchList, setWatchList }) => {
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [details, setDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removedList, setRemovedList] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextDetails = () => {
    const id = watchList[index + 1].id;
    const media = watchList[index + 1].media_type;
    fetchDetails(media, id);
  };

  const handlePreviousDetails = () => {
    const id = watchList[index - 1].id;
    const media = watchList[index - 1].media_type;
    fetchDetails(media, id);
  };

  const fetchDetails = async (media, id) => {
    const response = await fetch(
      `https://cassia-proxy-server-0e93eb694b50.herokuapp.com/flix-finder/details?media=${media}&id=${id}`
    );
    const data = await response.json();
    console.log(data);
    setDetails(data);
    setIndex(watchList.findIndex((result) => result.id === id));
    openModal();
  };

  const handleAddToWatchList = (id) => {
    const movie = removedList.find((item) => item.id === id);
    setWatchList((prevList) => [...prevList, movie]);
  };

  const handleRemoveFromWatchList = (id) => {
    setRemovedList((prevList) => [
      ...prevList,
      watchList.find((item) => item.id === id),
    ]);
    const newWatchList = watchList.filter((item) => item.id !== id);
    setWatchList(newWatchList);
  };

  const sortAlphabetically = () => {
    const sortedList = [...watchList].sort((a, b) => {
      const aTitle = a.title ? a.title : a.name;
      const bTitle = b.title ? b.title : b.name;
      return aTitle.localeCompare(bTitle);
    });
    setWatchList(sortedList);
  };

  const sortReverseAlphabetically = () => {
    const sortedList = [...watchList].sort((a, b) => {
      const aTitle = a.title ? a.title : a.name;
      const bTitle = b.title ? b.title : b.name;
      return bTitle.localeCompare(aTitle);
    });
    setWatchList(sortedList);
  };

  return (
    <div className="grow">
      <div className="flex items-center justify-between m-7 max-w-screen-2xl 2xl:mx-auto">
        <h2 className="text-3xl font-display">Watch List</h2>
        <div className="text-2xl text-chartreuse-300 flex gap-2">
          <button
            onClick={sortAlphabetically}
            className="rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
          >
            <FaSortAlphaDown />
            <span className="sr-only">Sort Alphabetically</span>
          </button>
          <button
            onClick={sortReverseAlphabetically}
            className="rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
          >
            <FaSortAlphaDownAlt />
            <span className="sr-only">Sort Reverse Alphabetically</span>
          </button>
        </div>
      </div>
      {watchList.length === 0 && (
        <p className="text-center mx-7 text-2xl">
          Your watch list is empty. Check out what's{" "}
          <NavLink
            to="/trending"
            className="text-chartreuse-300 hover:text-chartreuse-200 focus:outline-none focus:underline hover:underline"
          >
            Trending
          </NavLink>{" "}
          to find some popular Flix!
        </p>
      )}
      <CardList
        list={watchList}
        listLength={watchList.length}
        fetchDetails={fetchDetails}
        watchList={watchList}
        handleAddToWatchList={handleAddToWatchList}
        handleRemoveFromWatchList={handleRemoveFromWatchList}
        page={page}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {details && (
          <div className="flex justify-between gap-4">
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

export default WatchList;
