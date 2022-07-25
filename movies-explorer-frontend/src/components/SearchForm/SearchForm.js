import React from 'react'
import loupePic from '../../images/loupePic.svg'
import searchBtn from '../../images/searchBtn.svg'
import { useHistory } from 'react-router-dom';
    

function SearchForm(props) { 
  const searchRef = React.useRef();
  const history = useHistory();  
  let isMatched=history.location.pathname==='/movies';
  

  function searchClickMovies(e){
    e.preventDefault();
  props.onSearchClick(searchRef.current.value)   
  } 

  function searchSavedMovies(e){
    e.preventDefault();
    props.onSearch(searchRef.current.value);
  }

  function SwitchMovieTypeHandler(e){
    props.onTypeSwitch();
    searchClickMovies(e);    
  }

  function SwitchSavedMovieTypeHandler(e){
    debugger
    props.onTypeSwitch();
    searchSavedMovies(e);
  }

  
    return (
      <section className='searchSection'>        
        { props.onSize>=768 
        ?
          (<div><form className='searchForm' >
            <img src={loupePic} alt='Значок лупы' className='searchForm__loupePic'/>
            <input className='searchForm__input' placeholder='Фильм' ref={searchRef} required/>
            <button className='searchForm__searchBtn' onClick={isMatched ? searchClickMovies : searchSavedMovies}><img src={searchBtn} alt='Кнопка поиска' disabled={props.isLoading}/></button>
            
            {props.isSwitched ?
            <div className='searchForm__movieType-container'> 
            <button className='searchForm__movieTypeBtn' onClick={isMatched ? SwitchMovieTypeHandler : SwitchSavedMovieTypeHandler }></button>
            <p className='searchForm__movieType'>Полнометражки</p>
            </div> :
            <div className='searchForm__movieType-container'>
            <button className='searchForm__movieTypeBtn searchForm__movieTypeShort' onClick={isMatched ? SwitchMovieTypeHandler : SwitchSavedMovieTypeHandler }></button>
            <p className='searchForm__movieType '>Короткометражки</p>
            </div>}            
          </form>
          <div className='search__bottomString'/>
          </div>)
          :
          (<div><form className='searchForm' >            
            <input className='searchForm__input' placeholder='Фильм' ref={searchRef} required/>
            <button className='searchForm__searchBtn' onClick={isMatched ? searchClickMovies : searchSavedMovies}><img src={searchBtn} alt='Кнопка поиска' disabled={props.isLoading} /></button>            
          </form>
          {props.isSwitched ?
          <div className='searchForm__movieType-container'> 
          <button className='searchForm__movieTypeBtn' onClick={isMatched ? SwitchMovieTypeHandler : SwitchSavedMovieTypeHandler }></button>
            <p className='searchForm__movieType'>Полнометражки</p>
            </div> :
            <div className='searchForm__movieType-container'>
            <button className='searchForm__movieTypeBtn searchForm__movieTypeShort' onClick={isMatched ? SwitchMovieTypeHandler : SwitchSavedMovieTypeHandler }></button>
            <p className='searchForm__movieType'>Короткометражки</p>
            </div>          
            }           
          <div className='search__bottomString'/>
          </div>)}
        </section>
         
                          
    )
}

export default SearchForm