import React from 'react'
import loupePic from '../../images/loupePic.svg'
import searchBtn from '../../images/searchBtn.svg'
    

function SearchForm(props) { 
  const searchRef = React.useRef();
  function searchClick(e){
    e.preventDefault();
  props.onSearchClick(searchRef.current.value)
  } 
    return (
      <section className='searchSection'>
        { props.onSize>=768 
        ?
          (<div><form className='searchForm' >
            <img src={loupePic} alt='Значок лупы' className='searchForm__loupePic'/>
            <input className='searchForm__input' placeholder='Фильм' ref={searchRef} required/>
            <button className='searchForm__searchBtn'><img src={searchBtn} alt='Кнопка поиска' onClick={searchClick}/></button>
            
            {props.isSwitched ?
            <div className='searchForm__movieType-container'> 
            <button className='searchForm__movieTypeBtn'></button>
            <p className='searchForm__movieType'>Полнометражки</p>
            </div> :
            <div className='searchForm__movieType-container'>
            <button className='searchForm__movieTypeBtn searchForm__movieTypeShort'></button>
            <p className='searchForm__movieType '>Короткометражки</p>
            </div>}            
          </form>
          <div className='search__bottomString'/>
          </div>)
          :
          (<div><form className='searchForm' >            
            <input className='searchForm__input' placeholder='Фильм' ref={searchRef} required/>
            <button className='searchForm__searchBtn'><img src={searchBtn} alt='Кнопка поиска'/></button>            
          </form>
          {props.isSwitched ?
          <div className='searchForm__movieType-container'> 
          <button className='searchForm__movieTypeBtn'></button>
            <p className='searchForm__movieType'>Полнометражки</p>
            </div> :
            <div className='searchForm__movieType-container'>
            <button className='searchForm__movieTypeBtn searchForm__movieTypeShort'></button>
            <p className='searchForm__movieType'>Короткометражки</p>
            </div>          
            }           
          <div className='search__bottomString'/>
          </div>)}
        </section>
         
                          
    )
}

export default SearchForm