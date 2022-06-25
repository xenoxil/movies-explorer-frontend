import React from 'react'
import loupePic from '../../images/loupePic.svg'
import searchBtn from '../../images/searchBtn.svg'
    

function SearchForm(props) {
    return (
      <section className='searchSection'>
        { props.onSize>=768 
        ?
          (<div><form className='searchForm' >
            <img src={loupePic} alt='Значок лупы' className='searchForm__loupePic'/>
            <input className='searchForm__input' placeholder='Фильм' required/>
            <button className='searchForm__searchBtn'><img src={searchBtn} alt='Кнопка поиска'/></button>
            <button className='searchForm__movieTypeBtn'></button>
            <p className='searchForm__movieType'>{props.isSwitched ?  `Полнометражки` :`Короткометражки`}</p>
          </form>
          <div className='search__bottomString'/>
          </div>)
          :
          (<div><form className='searchForm' >            
            <input className='searchForm__input' placeholder='Фильм' required/>
            <button className='searchForm__searchBtn'><img src={searchBtn} alt='Кнопка поиска'/></button>            
          </form>
          <div className='searchForm__movieType-container'>
          <button className='searchForm__movieTypeBtn'></button>
            <p className='searchForm__movieType'>{props.isSwitched ?  `Полнометражки` :`Короткометражки`}</p>
            </div>
          <div className='search__bottomString'/>
          </div>)}
        </section>
         
                          
    )
}

export default SearchForm