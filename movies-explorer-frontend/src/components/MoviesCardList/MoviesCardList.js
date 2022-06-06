import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'


    

function MoviesCardList(props) {
    return (
        <ul className='moviesCardList'>
            {
             props.movieCards.map((item)=>{
                 return <MoviesCard cardPic={item.src} name={item.name} movieName={item.movieName} duration={item.duration} key={item.key}/>
             })
            }
        </ul>                
    )
}

export default MoviesCardList