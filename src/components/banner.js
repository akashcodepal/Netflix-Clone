import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './banner.css'

const base_url="http://image.tmdb.org/t/p/original/"

function Banner() {

    const [movie,setMovie]=useState([]);

    useEffect(() => {
        
        async function fetchData(){
            const res = await axios.get("https://api.themoviedb.org/3/discover/tv?api_key=063455a6e818273cc4395757b1512dc5&with_network=213");
            setMovie(res.data.results[Math.floor(Math.random() * res.data.results.length-1)])
            return res ;
        }
        fetchData();
    }, []);
    
    function truncate(str,n){
        return str?.length>n ? str.substr(0, n-1) + "..." : str ;
    } 

    return (
        <header className="banner" 
                style={{backgroundSize: "cover" ,
                        backgroundImage: `url(${base_url}${movie?.poster_path})`,
                        backgroundPosition : "center center"
                        }}>

           <div className="banner_content">
                <h1 className="banner_title">{movie?.name || movie?.original_name || movie?.title}</h1> 
                <div className="banner-buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">
                  {truncate(movie?.overview,150)}
                </h1>
            </div> 
            <div className="banner--fadeBottom"/> 
          
        </header>
    )
}

export default Banner
