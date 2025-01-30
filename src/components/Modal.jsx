import React, { useState } from "react";

function Modal({ title, images, setShowModal, details, handleWatchlist, handleRemovewatchlist, watchlist }) {

  const handleOuterClick = (e) => {
    if (e.target.classList.contains('fixed')) {
      setShowModal(false);
    }
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };
  function doesCotain(movieobj){
    for (let i = 0; i < watchlist.length; i++) {
      if(watchlist[i].ids.tmdb == movieobj.ids.tmdb){
        return true;
      }
    }
    return false;
  }
  

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOuterClick}>
      <div
        className="bg-gray-800 rounded-xl p-4 z-10 w-[70vw] h-[70vh] overflow-y-auto flex items-center justify-around"
        id="modal" onClick={handleInnerClick}>
        <div className="w-[30%] h-[90%] rounded-xl bg-contain bg-center bg-no-repeat">
          <img src={images} alt="" className="h-full w-full rounded-lg" />
        </div>
        <div className="w-[65%] h-[90%] bg-gray-700 rounded-xl flex flex-col p-4 justify-between  text-slate-200">
          <div className="flex flex-col">
            <div className="text-3xl text-white font-bold self-center flex font-serif">
              {title}
              <p className="font-normal text-base text-slate-300 self-end ml-2">
                {details.certification}
              </p>
            </div>
            <h3 className="self-center mt-1">{details.tagline}</h3>
            <p className="mt-4">{details.overview}</p>
            <p className="mt-4">Released: {details.released}</p>
            <div className="flex gap-2 text-xl  font-serif">
              Genres: |
              {details.genres.map((genere) => {
                return <p>{genere} |</p>;
              })}
            </div>
            <p>Language: {details.language.toUpperCase()} </p>
            <p>Runtime: {details.runtime} minutes</p>
          </div>
          <div className="flex items-center justify-center gap-11 mb-3">
            <a
              href={details.trailer}
              target="_blanck"
              className="text-2xl hover:scale-105">
              <i class="fa-brands fa-youtube"></i> Watch Trailer
            </a>
           
            {doesCotain(details)?(<><button  className="text-2xl hover:scale-105" onClick={()=>{
              handleRemovewatchlist(details);
              setshowmsg(false);
            }}><i class="fa-solid fa-xmark"></i> Remove From Watchlist</button></>
            ):(
            <><button className="text-2xl hover:scale-105" onClick={()=>{
              handleWatchlist(details);
              setshowmsg(true);
            }}>
              <i class="fa-solid fa-heart"></i> Add To Watchlist</button>
            </>)}

          </div>
        </div>
        
      </div>
    </div>
  );
}
export default Modal;
