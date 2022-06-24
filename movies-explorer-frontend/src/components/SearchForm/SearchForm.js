import React from 'react'
import loupePic from '../../images/loupePic.svg'
import searchBtn from '../../images/searchBtn.svg'
import movieTypeSwitcher from '../../images/smalltumb.png'
    

function SearchForm(props) {
    return (
        <section className='searchSection'>
          <form className='searchForm' >
            <img src={loupePic} alt='Значок лупы' className='searchForm__loupePic'/>
            <input className='searchForm__input' placeholder='Фильм' required/>
            <button className='searchForm__searchBtn'><img src={searchBtn} alt='Кнопка поиска'/></button>
            <button className='searchForm__movieTypeBtn'><img src={movieTypeSwitcher} alt='Кнопка переключения типа фильма'/></button>
            <p className='searchForm__movieType'>{props.isSwitched ?  `Полнометражки` :`Короткометражки`}</p>
          </form>
          <div className='search__bottomString'/>
        </section>                
    )
}

export default SearchForm