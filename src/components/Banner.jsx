import axios from 'axios'
import React, { useEffect, useState } from 'react'


function Banner({page}) {
  const [movie,setmovie] = useState([]);
  const [bannerImg,setImg] = useState("");
  const headers = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": "80d73c3d8ac4a6e744a93108054915f45daba5deff9a1fcefcf4b4f95bd85c56",
  };
  useEffect(()=>{
    axios.get(`https://api.trakt.tv/movies/favorited/hourly?page=${page}&limit=1`,{headers}).then((res)=>{
      setmovie(res.data);
    })
  },[page])
  
  useEffect(()=>{
    movie.map((item)=>{
      axios.get(`https://webservice.fanart.tv/v3/movies/${item.movie.ids.tmdb}?api_key=97e8e10e9cdeb8d0d2ba0802b924074e`).then((res)=>{
        setImg(res.data.hdmovieclearart[0].url);
      })
    })
  },[movie])

  return (
    <>
        <div style={{backgroundImage:`url(${bannerImg})`}} className='w-full h-[70vh] border-solid flex items-end bg-contain bg-no-repeat bg-center mt-[5.2rem]'>
            <div className='h-14 w-screen bg-opacity-60 bg-gray-950 flex items-center justify-center text-slate-100 font-serif'>{movie.map((item)=>{
              return <h1 className='text-2xl'>{item.movie.title}</h1>
            })}</div>
        </div>
    </>
  )
}

export default Banner