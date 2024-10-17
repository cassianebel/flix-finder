import { useState, useEffect, useRef } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import Search from "./Components/Search";
import WatchList from "./Components/WatchList";
import TrendingList from "./Components/TrendingList";
import Genres from "./Components/Genres";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { HiTrendingUp } from "react-icons/hi";
import { HiHashtag } from "react-icons/hi";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [watchList, setWatchList] = useState(() => {
    const savedWatchList = localStorage.getItem("watchlist");
    return savedWatchList ? JSON.parse(savedWatchList) : [];
  });
  const menuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu if clicked outside
      }
    };

    // Add event listener to listen for clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header className="film-strip">
        <div className="flex justify-between gap-2 text-chartreuse-300 ">
          <NavLink
            to="/flix-finder/trending"
            className="rounded-full hover:text-chartreuse-200 focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3 "
          >
            <div className="flex gap-2 text-3xl">
              <BiSolidCameraMovie />
              <h1 className="font-display">Flix Finder</h1>
            </div>
          </NavLink>
          <div ref={menuRef} className="relative lg:static">
            <button
              onClick={toggleMenu}
              className="lg:hidden relative right-10 top-[-7px]"
            >
              <div
                className={`${
                  isMenuOpen ? "rotate-45" : "top-[-7px] "
                } absolute h-1 w-8 bg-chartreuse-300 rounded-full m-1 transition-all ease-in-out`}
              ></div>
              <div
                className={`${
                  isMenuOpen ? "w-0 h-0" : "h-1 w-8"
                } absolute bg-chartreuse-300 rounded-full m-1 transition-all ease-in-out`}
              ></div>
              <div
                className={`${
                  isMenuOpen ? "rotate-[-45deg]" : "top-[7px]"
                } absolute h-1 w-8 bg-chartreuse-300 rounded-full m-1 transition-all ease-in-out`}
              ></div>
            </button>
            <nav
              onClick={() => setIsMenuOpen(false)}
              className={`${
                isMenuOpen
                  ? "me-0 scale-100"
                  : "me-[-250px] scale-0 lg:scale-100 lg:me-0"
              } absolute right-0 top-12 w-[200px] bg-zinc-950 lg:static lg:w-fit lg:bg-zinc-800 p-7 lg:p-0 text-xl flex flex-col lg:flex-row lg:items-center gap-7 transition-all ease-in-out`}
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-zinc-50 flex gap-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
                    : "hover:text-chartreuse-200 flex gap-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
                }
                to="/flix-finder/watchlist"
              >
                <FaHeart />
                Watch List
              </NavLink>
              <NavLink
                to="/flix-finder/search"
                className={({ isActive }) =>
                  isActive
                    ? "text-zinc-50 flex gap-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
                    : "hover:text-chartreuse-200 flex gap-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
                }
              >
                <IoSearch />
                Search
              </NavLink>
              <NavLink
                to="/flix-finder/trending"
                className={({ isActive }) =>
                  isActive
                    ? "text-zinc-50 flex gap-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
                    : "hover:text-chartreuse-200 flex gap-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
                }
              >
                <HiTrendingUp /> Trending
              </NavLink>
              <NavLink
                to="/flix-finder/genres"
                className={({ isActive }) =>
                  isActive
                    ? "text-zinc-50 flex gap-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
                    : "hover:text-chartreuse-200 flex gap-1 items-center rounded-full focus:outline-none focus:ring-1 focus:ring-chartreuse-300 py-1 px-3"
                }
              >
                <HiHashtag /> Genres
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      <Routes>
        <Route
          path="/flix-finder/"
          element={<Navigate to="/flix-finder/trending" replace={true} />}
        ></Route>
        <Route
          path="/flix-finder/search"
          element={<Search watchList={watchList} setWatchList={setWatchList} />}
        ></Route>
        <Route
          path="/flix-finder/watchlist"
          element={
            <WatchList watchList={watchList} setWatchList={setWatchList} />
          }
        ></Route>
        <Route
          path="/flix-finder/trending"
          element={
            <TrendingList watchList={watchList} setWatchList={setWatchList} />
          }
        ></Route>
        <Route
          path="/flix-finder/genres"
          element={<Genres watchList={watchList} setWatchList={setWatchList} />}
        ></Route>
        <Route
          path="/flix-finder/*"
          element={<Navigate to="/flix-finder/search" replace={true} />}
        ></Route>
      </Routes>
      <footer className="bg-zinc-800 p-4 flex items-center gap-2 justify-center">
        <a href="https://www.themoviedb.org">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            width="40px"
          />
        </a>
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </footer>
    </div>
  );
}

export default App;
