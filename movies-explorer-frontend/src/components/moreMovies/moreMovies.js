import React from 'react'


function moreMovies(props) {        
    return (        
        (<button className={props.isShowed ? `moreMovies` : `moreMovies moreMovies__hidden`} onClick={props.onMoreMoviesClick}>
           Ещё
        </button>)
    )
}

export default moreMovies