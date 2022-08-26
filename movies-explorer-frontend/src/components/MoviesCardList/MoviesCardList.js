import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import defaultPic from '../../images/defaultMovie.jpg'


    

function MoviesCardList(props) { 
console.log('сохраненные фильмы')
console.log(props.savedMovies)
    return (
        props.isSearched ?
        (props.movieCards.length>0 ?
            <ul className='moviesCardList'>
            {
             props.movieCards.map((item)=>{
                 return <MoviesCard cardObj={item} 
                 cardPic={item.src ? item.src :  defaultPic} name={item.nameRU}
                  movieName={item.nameRU} duration={item.duration} key={item.id}
                  savedMovies={props.savedMovies}
                    onCardClick={props.onCardClick} onLike={props.onLike} onDislikeClick={props.onDislikeClick}/>
             })
            }
        </ul>
        :
        <p className='moviesCardList__empty'>Ничего не найдено ‿︵‿ヽ(°□° )ノ︵‿︵</p>
        )
        : <ul></ul>                
    )
}

export default MoviesCardList