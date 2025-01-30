import axios from "axios";
import React, {useEffect, useState } from "react";
import Modal from "./Modal";

function Card({ title, tmdbID, traktId, handleWatchlist,handleRemovewatchlist, watchlist }) {
  const [images, setImg] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const[details,setdetails] = useState([]);
 
  const headers = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "80d73c3d8ac4a6e744a93108054915f45daba5deff9a1fcefcf4b4f95bd85c56",
  };
  
  useEffect(() => {
    axios
      .get(
        `https://webservice.fanart.tv/v3/movies/${tmdbID}?api_key=97e8e10e9cdeb8d0d2ba0802b924074e`
      )
      .then((res) => {
        let imgUrl;
        if (res.data.movieposter) {
          imgUrl = res.data.movieposter[0].url;
          setShowCard(true);
        } else if (res.data.moviethumb) {
          imgUrl = res.data.moviethumb[0].url;
          setShowCard(true);
        } else if (res.data.hdmovielogo) {
          imgUrl = res.data.hdmovielogo[0].url;
          setShowCard(true);
        } else {
          setShowCard(false);
        }
        setImg(imgUrl);
      });
  },[tmdbID]);
  
  useEffect(()=>{
    axios.get(`https://api.trakt.tv/movies/${traktId}?extended=full`,{headers}).then((res)=>{
      setdetails(res.data);
    })
  },[traktId])

  return (
    <>
     {showCard ?(<div
      style={{
        backgroundImage: `url(${images})`,
        boxShadow: `0 0 0.5rem #282c34c6`,
      }}
      className="border-[1px] border-black border-solid h-[40vh] w-[180px] rounded-xl bg-cover bg-center bg-no-repeat flex items-end hover:cursor-pointer hover:scale-110 duration-300"
      id="card"
      onClick={() => setShowModal(true)}>
      <div className="w-full text-wrap text-center p-1 text-slate-100 bg-opacity-85 bg-gray-950 rounded-b-xl">
        {title}
      </div>
    </div>
  ):null}
  {showModal ? (
    <Modal title={title} images={images} setShowModal={setShowModal} showModal={showModal} details={details} handleWatchlist={handleWatchlist} handleRemovewatchlist={handleRemovewatchlist} watchlist={watchlist}/>
  ) : null}
  </>
  )
}

export default Card;