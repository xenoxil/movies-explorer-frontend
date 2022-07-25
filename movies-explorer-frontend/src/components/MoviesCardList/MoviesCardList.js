import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import defaultPic from '../../images/defaultMovie.png'


    

function MoviesCardList(props) {
  
         
    return (
        props.isSearched ?
        (props.movieCards.length>0 ?
            <ul className='moviesCardList'>
            {
             props.movieCards.map((item)=>{                                
                 return <MoviesCard cardObj={item} cardPic={item.image.formats.small ? `https://api.nomoreparties.co/${item.image.formats.small.url}` : defaultPic} name={item.nameRU}
                  movieName={item.nameRU} duration={item.duration} key={item.id} isLiked={item.isLiked} onCardClick={props.onCardClick}/>
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