import React from 'react'   
import { useHistory } from 'react-router-dom';


function MovieTypeContainer(props) { 
  const history = useHistory();
  let isMatchedPath=history.location.pathname==='/movies';
  console.log(props.isSwitched);

  



  function SwitchMovieTypeHandler(e){ 
    props.SwitchMovieTypeHandler(e);
  }

  function SwitchSavedMovieTypeHandler(e){    
   
   props.SwitchSavedMovieTypeHandler(e);
  }

  
    return (
        <section className='movieTypeContainer'>
          {props.isSwitched ?
          <div className='searchForm__movieType-container'>
          <button className='searchForm__movieTypeBtn' onClick={isMatchedPath ? SwitchMovieTypeHandler : SwitchSavedMovieTypeHandler }></button>
          <p className='searchForm__movieType'>Полнометражки</p>
          </div> 
            :
            <div className='searchForm__movieType-container'>
            <button className='searchForm__movieTypeBtn searchForm__movieTypeShort' onClick={isMatchedPath ? SwitchMovieTypeHandler : SwitchSavedMovieTypeHandler }></button>
            <p className='searchForm__movieType'>Короткометражки</p>
            </div> 
            }
            </section>              
         
                          
    )
}

export default MovieTypeContainer