import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import defaultPic from '../../images/defaultMovie.jpg'


    

function MoviesCardList(props) {    
    return (
        props.isSearched ?
        (props.movieCards.length>0 ?
            <ul className='moviesCardList'>
            {
             props.movieCards.map((item)=>{
                console.log(item);
                 return <MoviesCard cardObj={item} 
                 cardPic={item.src ? item.src :  defaultPic} name={item.nameRU}
                  movieName={item.nameRU} duration={item.duration} key={item.id} 
                  isLiked={props.movieCards.some((i) => {return i.movieId === item.id})} 
                    onCardClick={props.onCardClick} onLike={props.onLike}/>
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