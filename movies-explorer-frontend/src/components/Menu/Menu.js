import React from 'react'
import {Link} from 'react-router-dom'
    

function Menu(props) {
    return (              
              <section className= {props.isVisible ? 'menu menu__visible' : 'menu'}>
                <div className='menu__link-container'>
                <Link to='/landing' className='menu__link link'>Главная</Link>
              <Link to='/' className='menu__link link'>Фильмы</Link>
              <Link to='/savedMovies' className='menu__link link'>Сохранённые фильмы</Link>
              <Link to='/profile' className='menu__accLink' >Аккаунт</Link>
              </div>
              <button type='button' className='menu__closeBtn' onClick={props.onCloseClick}/> 
                                        
                </section>                 
    )
}

export default Menu