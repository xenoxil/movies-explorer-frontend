import React from 'react'
import HeaderLogo from '../../images/header-logo.svg'
import {Link,Route,Switch} from 'react-router-dom'
    

function Header(props) {
    return (        
            <Switch>
              <Route path='/landing'>
              <header className='header header_landingColor'>
                <img src={HeaderLogo} className='header__logo' alt='Логотип проектной работы' />
                <div className='header__container'>               
                  <Link to='/sign-up' className='header__registration'>Регистрация</Link>
                  <button className='header__loginBtn'>Войти</button>
                </div>
                </header>
              </Route>
              <Route path='/'>
              <header className='header'>
              <img src={HeaderLogo} className='header__logo' alt='Логотип проектной работы' />
                <div className='header__container'>               
                  <Link to='ya.ru' className='header__link link'>Фильмы</Link>
                  <Link to='ya.ru' className='header__link link'>Сохранённые фильмы</Link>
                  <button className='header__accBtn'>Аккаунт</button>
                </div>
                </header>  
              </Route>
              </Switch>               
    )
}

export default Header