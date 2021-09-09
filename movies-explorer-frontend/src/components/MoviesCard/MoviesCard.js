import React from 'react'
import likePic from '../../images/cardLikePic.png'
import defaultPic from '../../images/defaultMovie.jpg'

    

function MoviesCard(props) {
    return (
        <li className='moviesCard'>
          <img src={props.cardPic ? props.cardPic :defaultPic } alt={props.name} className='moviesCard__pic'/>
          <div className='moviesCard__container'>
              <p className='moviesCard__name'>{props.movieName}</p>
              <button className='moviesCard__likeBtn' aria-label='Кнопка лайк'><img className='moviesCard__likePic' src={likePic} alt='кнопка лайка'/></button>    
          </div>
          <p className='moviesCard__duration'>{props.duration}</p>
        </li>                
    )
}

export default MoviesCard