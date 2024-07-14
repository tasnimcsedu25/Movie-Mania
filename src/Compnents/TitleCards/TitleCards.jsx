import React,{useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title,category}) => {
  const [apiData,setApiData]=useState([])
  const cardsRef=useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGNmZmJhMzlkNGMxODlkM2IwNGMwN2Q3ZjU4YzE4NyIsIm5iZiI6MTcyMDkyOTc0MS42MjI1OTksInN1YiI6IjY2OTM0Y2RmY2Y4Zjg3MWUyMDE1Njc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IRfBbsxBd2rAfYqvhqeGMcKbqBka8zBL8sF4Oi0LzqA'
    }
  };
  

    // ------
const handleWheel=(event)=>{
event.preventDefault();
cardsRef.current.scrollLeft+=event.deltaY;
}
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response =>setApiData(response.results))
  .catch(err => console.error(err));//api things

  cardsRef.current.addEventListener('wheel',handleWheel)
},[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Movie Mania"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`}className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path}/>
              <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
