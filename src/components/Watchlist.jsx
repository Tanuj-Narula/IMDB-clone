import React, { useEffect, useState } from "react";
import WatchlistImg from "./WatchlistImg";

function Watchlist({ watchlist, handleRemovewatchlist, setwatchlist }) {
  const [search, setsearch] = useState("");
  const [generesList, setgenereList] = useState(['All Generes']);
  const [currgenere,setCurrgenere] = useState("All Generes")

  function handleSearch(e) {
    setsearch(e.target.value);
  }

  function handleFilter(genre){
    setCurrgenere(genre);
  }

  function sortIncreasing(){
    let sortedInc =watchlist.sort((movieA , movieB)=>{
      return movieA.rating - movieB.rating
    })
    setwatchlist([...sortedInc])
  }

  function sortDecreasing(){
    let sortedDec = watchlist.sort((movieA , movieB)=>{
      return movieB.rating - movieA.rating
    })
    setwatchlist([...sortedDec]);
  }

  useEffect(()=>{
    let temp = watchlist.map((movie)=>{
      return movie.genres[0]
    })
    temp = new Set(temp);
    setgenereList(['All Generes',...temp])
  },[watchlist])

  return (
    <div className="mt-[5.2rem]">
      <div className="flex justify-center pt-4 flex-wrap gap-6">
        {generesList.map((genre)=>{
          return <div onClick={()=>{handleFilter(genre)}} className={currgenere==genre?("hover:cursor-pointer w-[9rem] h-[3rem] rounded-xl flex items-center justify-center bg-blue-400 text-white"):("hover:cursor-pointer w-[9rem] h-[3rem] rounded-xl flex items-center justify-center bg-gray-400/50 text-white")}>{genre} </div>
        })}
      </div>

      <div className="flex justify-center h-fit py-4 mt-6">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="bg-gray-200 outline-none placeholder:text-slate-600 h-[3rem] w-[18rem] px-4"
          placeholder="Search Movies"
        />
      </div>

      <div className="border border-grey-400 m-8 overflow-hidden rounded-xl">
        <table className="w-full text-gray-600 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Poster</th>
              <th>Name</th>
              <th className="flex gap-2 justify-center">
                <div onClick={sortIncreasing} className="hover:cursor-pointer" ><i class="fa-solid fa-arrow-up"></i></div>
                <div>Rating</div>
                <div onClick={sortDecreasing} className="hover:cursor-pointer"><i class="fa-solid fa-arrow-down"></i></div>
              </th>
              <th>Year</th>
              <th>Genere</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movie)=>{
              if(currgenere == 'All Generes'){
                return true;
              }else{
                return movie.genres[0]== currgenere;
              }
            }).filter((movie) => {
                return movie.title.toLowerCase().includes(search.toLocaleLowerCase());
              }).map((movie) => {
                return (
                  <>
                    <tr className="border-b-2">
                      <WatchlistImg tmdbId={movie.ids.tmdb} />
                      <td>{movie.title}</td>
                      <td>{movie.rating.toFixed(2)}</td>
                      <td>{movie.year}</td>
                      <td>{movie.genres[0]}</td>
                      <td>
                        <p
                          className="text-red-600 hover:cursor-pointer underline"
                          onClick={() => {
                            handleRemovewatchlist(movie);
                          }}
                        >
                          Delete
                        </p>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Watchlist;
