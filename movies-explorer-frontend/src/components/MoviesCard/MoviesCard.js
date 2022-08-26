
function MoviesCard(props) {
    
    const isLiked = props.savedMovies.some(movie =>  movie.movieId === props.cardObj.id);


    function handleLikeClick(){
        props.onLike(props.cardObj);
    }
    function handleDislike(){        
        props.onDislikeClick(props.cardObj);
    }
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        if(hours>0){
            return hours + "ч " + minutes + "м";
        }
        else{
            return minutes + "м";   
        }
    };

    const timeDuration= getTimeFromMins(props.duration)
   
    
  
    return (
        <li className='moviesCard'>
            <a href={props.cardObj.trailerLink} target="_blank" rel = 'noreferrer'>
            <img src={props.cardPic} alt={props.name} className='moviesCard__pic' /></a>          
          <div className='moviesCard__container'>
              <p className='moviesCard__name'>{props.movieName}</p>
              <button className={isLiked ? 'moviesCard__likeBtn ' : 'moviesCard__likeBtn_active' }
               aria-label='Кнопка лайк' type="button" onClick={isLiked ? handleDislike :handleLikeClick}> </button>    
          </div>
          <p className='moviesCard__duration'>{timeDuration}</p>
        </li>                
    )
}

export default MoviesCard