import Card from "./Card";

const CardList = ({
  list,
  listLength,
  fetchDetails,
  watchList,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  handleFetchMore,
  media,
}) => {
  return (
    <div className="max-w-screen-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 m-7 2xl:mx-auto">
      {list?.map((item) => (
        <Card
          key={item.id}
          item={item}
          fetchDetails={fetchDetails}
          watchList={watchList}
          handleAddToWatchList={handleAddToWatchList}
          handleRemoveFromWatchList={handleRemoveFromWatchList}
          media={media}
        />
      ))}
      {listLength > list.length && (
        <div className="flex items-center">
          <button
            onClick={handleFetchMore}
            className="bg-chartreuse-300 hover:bg-chartreuse-400 text-zinc-900 p-1 px-4 rounded-full text-lg focus:outline-none focus:bg-chartreuse-400 shadow-glow shadow-zinc-950 focus:shadow-chartreuse-700 hover:shadow-chartreuse-700 transition-all ease-in-out mx-auto"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default CardList;
