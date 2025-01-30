import axios from 'axios'
import React, { useEffect, useState } from 'react'

function WatchlistImg({tmdbId}) {
  const[img,setimg]= useState("");
  useEffect(()=>{
    axios.get(`https://webservice.fanart.tv/v3/movies/${tmdbId}?api_key=97e8e10e9cdeb8d0d2ba0802b924074e`).then((res)=>{
      let imgUrl;
      if (res.data.movieposter) {
        imgUrl = res.data.movieposter[0].url;
      } else if (res.data.moviethumb) {
        imgUrl = res.data.moviethumb[0].url;
      } else if (res.data.hdmovielogo) {
        imgUrl = res.data.hdmovielogo[0].url;
      } 
      setimg(imgUrl);
    })
  },[tmdbId])
  return (
    <td className='py-4 pl-4 flex justify-center items-center'><img className='h-[9rem] w-[10rem] rounded-xl' src={img} alt="img" /></td>
  )
}

export default WatchlistImg
