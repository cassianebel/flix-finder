import { FaHeart, FaRegHeart } from "react-icons/fa6";

const PersonDetails = ({
  details,
  watchList,
  handleRemoveFromWatchList,
  handleAddToWatchList,
}) => {
  return (
    <>
      <div className="hidden md:block min-w-72 ">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.profile_path}`}
          alt=""
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
            {details?.birthday}
            {details?.deathday && ` - ${details?.deathday}`}
          </span>
          <span className="bg-zinc-800 p-1 px-2 me-2 rounded-sm">
            {details?.known_for_department}
          </span>
        </p>
        <p className="my-3 text-lg">{details?.biography}</p>
      </div>
    </>
  );
};

export default PersonDetails;
