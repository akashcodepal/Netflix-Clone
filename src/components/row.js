import React,{useState,useEffect} from 'react';
import axios from './axios';
import './row.css';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "http://image.tmdb.org/t/p/original/";

function Row(props) {

    const {title ,fetchUrl ,isLargeRow}=props

    const [movies,setMovies]=useState([]);

    const [trailerUrl,setTrailerUrl]=useState(null);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(fetchUrl);
            setMovies(res.data.results)
            return res ; 
        }
        fetchData();
    }, [fetchUrl]);

    const opts ={
        height:"390",
        width:"100%",
        playerVars: {
            //YOUTUBE id 
            autoplay :1, 
        }
    };

    const handleClick=(movie)=>{
        console.log(movie);
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie.title || movie.name)
              .then((url)=>{
                  const urlParams =new URLSearchParams(new URL(url).search);
                  setTrailerUrl(urlParams.get('v')); 
              })
              .catch((error)=>{console.log(error)})
            }
    }

   return (
            <div className="row">
                <h2>{title}</h2>
                 
                 <div className="row_posters">
                     {movies.map(movie=>
                         (<img key={movie.id}
                               onClick={()=> handleClick(movie)}
                               src={`${base_url}${isLargeRow? movie.poster_path: movie.backdrop_path}`} 
                               alt={movie.name} 
                               className={`row_poster ${isLargeRow && "row_posterLarge"}`}/>)
                     )}
                 </div>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
            </div>
    )
}

export default Row

