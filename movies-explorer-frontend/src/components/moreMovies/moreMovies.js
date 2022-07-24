import React from 'react'


function moreMovies(props) {
    console.log(props.isShowed)
    return (        
        (<button className={props.isShowed ? `moreMovies` : `moreMovies moreMovies__hidden`} onClick={props.onMoreMoviesClick}>
           Ещё
        </button>)
    )
}

export default moreMovies