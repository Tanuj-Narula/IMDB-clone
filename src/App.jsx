import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movies from "./components/Movies"
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const[page,setpage] = useState(1);
  const [watchlist,setwatchlist] = useState([]);

  function handleWatchlist(movieobj){
    let newwatchlist = [...watchlist, movieobj];
    localStorage.setItem("movieApp", JSON.stringify(newwatchlist) )
    setwatchlist(newwatchlist);
  }

  function handleRemovewatchlist(movieobj){
    let filteredwatchlist = watchlist.filter((item) => {
      return item.ids.tmdb != movieobj.ids.tmdb
    });
    setwatchlist(filteredwatchlist);
    localStorage.setItem("movieApp", JSON.stringify(filteredwatchlist))
  }

  useEffect(()=>{
    const storedWatchlist = localStorage.getItem("movieApp");
    if(!storedWatchlist){
      return
    }
    setwatchlist(JSON.parse(storedWatchlist))
  },[])

  return (
    <>
      
      <BrowserRouter>
        <Navbar setpage={setpage}/>
        <Routes>
          <Route path="/" element={  <> <Banner page={page}/> <Movies page={page} setpage={setpage} handleWatchlist={handleWatchlist} handleRemovewatchlist={handleRemovewatchlist} watchlist={watchlist}/> </>}
          />
          <Route path="/Watchlist" element={<Watchlist watchlist={watchlist} handleRemovewatchlist={handleRemovewatchlist} setwatchlist={setwatchlist}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
