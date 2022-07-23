import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'


    

function MoviesCardList(props) {
    console.log(props.movieCards);
    return (
        props.isSearched ?
        (<ul className='moviesCardList'>
            {
             props.movieCards.map((item)=>{
                console.log(item);                
                 return <MoviesCard cardPic={`https://api.nomoreparties.co/${item.image.formats.small.url}`} name={item.nameRU}
                  movieName={item.nameRU} duration={item.duration} key={item.id} isLiked={item.isLiked}/>
             })
            }
        </ul>)
        : <ul></ul>                
    )
}

export default MoviesCardList