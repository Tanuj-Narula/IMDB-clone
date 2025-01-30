import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({page,setpage, handleWatchlist, handleRemovewatchlist, watchlist}) {
  const[movies,setmovies]=useState([]);


  const headers = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "80d73c3d8ac4a6e744a93108054915f45daba5deff9a1fcefcf4b4f95bd85c56",
  };
  useEffect(() => {
    axios
      .get(`https://api.trakt.tv/movies/trending?page=${page}&limit=21`, { headers })
      .then(function (response) {
        setmovies(response.data);
    });
 
    
  }, [page]);

  return (
    <div className="py-4">
      <div className="text-2xl font-semibold text-center">Trending Movies</div>
      <div className="flex flex-wrap items-center justify-center gap-x-[1.5rem] gap-y-6 mt-5">
      {movies.map((movie)=>{
       return <Card title={movie.movie.title} tmdbID={movie.movie.ids.tmdb} traktId={movie.movie.ids.trakt} handleWatchlist={handleWatchlist} handleRemovewatchlist={handleRemovewatchlist} watchlist={watchlist} />
      })}
      </div>
      <Pagination setPage={setpage} page={page}/>
    </div>
  );
}

export default Movies;
