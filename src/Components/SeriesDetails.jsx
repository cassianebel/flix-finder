import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import chroma from "chroma-js";

const SeriesDetails = ({
  details,
  watchList,
  handleRemoveFromWatchList,
  handleAddToWatchList,
}) => {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const trailer = details.videos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
      console.log(trailer.key);
      setVideoKey(trailer.key);
    }
  }, [details.videos.results]);

  const getColorForRating = (rating) => {
    // Create a color scale from red to yellow to green
    const scale = chroma
      .scale(["#FF0000", "#FFFF00", "#00FF00"])
      .domain([0, 10]);

    // Get the color for the current rating
    return scale(rating).hex();
  };

  const backgroundColor = getColorForRating(details.vote_average);

  return (
    <>
      <div className="hidden md:block min-w-72 ">
        {videoKey ? (
          <iframe
            width="100%"
            src={`https://www.youtube.com/embed/${videoKey}?modestbranding=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen // This enables full-screen mode
            title="Movie Trailer"
          />
        ) : (
          <p>No trailer available</p>
        )}
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt=""
          className="my-4"
        />
      </div>
      <div>
        <h3 className="flex items-center gap-2 text-2xl font-bold">
          {watchList.find((movie) => movie.id === details?.id) ? (
            <button
              onClick={() => handleRemoveFromWatchList(details?.id)}
              className="text-chartreuse-300 focus:outline-none focus:scale-125 hover:scale-125 transition-all ease-in-out"
            >
              <FaHeart />
              <span className="sr-only">
                in your watch list, click to remove
              </span>
            </button>
          ) : (
            <button
              onClick={() => handleAddToWatchList(details?.id)}
              className="focus:text-chartreuse-300 focus:outline-none focus:scale-125 hover:scale-125 hover:text-chartreuse-300 transition-all ease-in-out"
            >
              <FaRegHeart />
              <span className="sr-only">add to your watch list</span>
            </button>
          )}
          {details?.name}
        </h3>
        <p className="my-3">
          <span className="bg-zinc-800 p-1 px-2 me-2 rounded-sm">
            {`${details.first_air_date?.slice(
              0,
              4
            )} - ${details.last_air_date?.slice(0, 4)}`}
          </span>
          <span className="bg-zinc-800 p-1 px-2 me-2 rounded-sm">
            {details.episode_run_time} min
          </span>
          <span
            className="p-1 px-2 rounded-sm text-zinc-950"
            style={{ background: backgroundColor }}
          >
            {details?.vote_average}
          </span>
        </p>
        <p className="flex items-center flex-wrap gap-2">
          {details?.genre &&
            details?.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-zinc-700 text-zinc-200 p-1 px-2 rounded-sm"
              >
                {genre.name}
              </span>
            ))}
        </p>
        <p className="my-3 text-lg">{details?.overview}</p>
        <div className="h-96 overflow-scroll">
          {details?.credits.cast.map((actor) => (
            <div key={actor.id} className="flex items-center gap-2 p-1">
              <img
                src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                alt=""
                className="w-12 "
              />
              <p className="">
                <span className="font-semibold text-lg">{actor.name}</span> as{" "}
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SeriesDetails;
