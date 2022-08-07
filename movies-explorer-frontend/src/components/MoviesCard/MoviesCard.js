import React from 'react'

function MoviesCard(props) {
    
    


    function handleLikeClick(){
        props.onLike(props.cardObj);              
    }
  
    return (
        <li className='moviesCard'>
            <a href={props.cardObj.trailerLink} target="_blank" rel = 'noreferrer'>
            <img src={props.cardPic} alt={props.name} className='moviesCard__pic' /></a>          
          <div className='moviesCard__container'>
              <p className='moviesCard__name'>{props.movieName}</p>
              <button className={props.isLiked ? 'moviesCard__likeBtn' : 'moviesCard__likeBtn moviesCard__likeBtn_active' }
               aria-label='Кнопка лайк' type="button" onClick={handleLikeClick}> </button>    
          </div>
          <p className='moviesCard__duration'>{props.duration}</p>
        </li>                
    )
}

export default MoviesCard