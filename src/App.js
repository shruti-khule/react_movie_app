import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCards";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faArrowRight} from '@fortawesome/free-solid-svg-icons'

//caccdc84
const api_url="http://www.omdbapi.com?apikey=caccdc84";

const App =()=>{
    const[movies, setMovies]=useState([]);
    const[searchTerm,setSearchTerm]=useState("");
    useEffect(()=>{
        fetchMovies('spiderman');
    },[]);


    const fetchMovies=async(title)=>{
        const response= await fetch(`${api_url}&s=${title}`);
        const data=await response.json();
        setMovies(data.Search);
    };

    const handleKeyDown = (e) => {
        console.log('User pressed: ', e.key);
        if (e.key === 'Enter') {
            setSearchTerm(e.target.value);
            alert(searchTerm);
           fetchMovies(searchTerm);
          console.log('Enter key pressed');

        }

    };
   
    return(
        <div className="app">
            <div className="container">
            <div className="name">
                <div className="top">
                    <h2>CineFlicks</h2>
                    </div>
                    <div className="bottom" aria-hidden="true">
                    <h2>CineFlicks</h2></div>
            </div>
                <form>
                 
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" aria-hidden="true"/>
                        <input type="text" placeholder="Search" id="search" autoComplete="off"
                            value={searchTerm}
                            onChange={(e)=>{setSearchTerm(e.target.value)}}
                            onKeyDown={handleKeyDown}
                        />
                        <FontAwesomeIcon icon={faArrowRight} className="go-icon" onClick={()=> fetchMovies(searchTerm)}/>
                
                        </form>
                    
            </div>
            
            {movies?.length > 0 ? (
                <div className="containerCards">
                 {movies.map((movie)=>
                 (<MovieCard movie= {movie} />))}
                </div>
                ):(
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div> 
    );
};
export default App;