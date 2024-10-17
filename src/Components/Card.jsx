import { FaHeart, FaRegHeart } from "react-icons/fa6";

const Card = ({
  item,
  watchList,
  fetchDetails,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  media,
}) => {
  if (media) {
    item.media_type = media;
  }
  return (
    <button
      className="flex flex-col justify-between bg-zinc-950 text-zinc-200 focus:outline-none focus:ring focus:ring-chartreuse-500 focus:scale-105 hover:scale-105 transition-all ease-in-out"
      onClick={() => fetchDetails(item.media_type, item.id)}
    >
      {item.media_type === "person" ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
          alt=""
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt=""
        />
      )}
      <div className="w-full p-4 flex flex-col-reverse gap-4 space-between grow">
        <h2 className="text-xl leading-5 text-center">
          {item.title ? item.title : item.name}
        </h2>
        <div className="flex justify-between text-sm">
          <span>{item.media_type}</span>
          {watchList.find((i) => i.id === item?.id) ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromWatchList(item?.id);
              }}
              className="text-chartreuse-300 focus:outline-none focus:scale-150 hover:scale-150 transition-all ease-in-out"
            >
              <FaHeart />
              <span className="sr-only">
                in your watch list, click to remove
              </span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWatchList(item?.id);
              }}
              className="focus:outline-none focus:text-chartreuse-300 hover:text-chartreuse-300 focus:scale-150 hover:scale-150 transition-all ease-in-out"
            >
              <FaRegHeart />
              <span className="sr-only">add to your watch list</span>
            </button>
          )}
          <span>
            {item.release_date
              ? item.release_date?.slice(0, 4)
              : item.first_air_date?.slice(0, 4)}
          </span>
        </div>
      </div>
    </button>
  );
};

export default Card;
