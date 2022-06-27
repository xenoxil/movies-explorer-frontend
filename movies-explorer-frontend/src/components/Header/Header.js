import React,{useState} from 'react'
import HeaderLogo from '../../images/header-logo.svg'
import {Link,Route,Switch} from 'react-router-dom'
import Menu from '../Menu/Menu';
    

function Header(props) {
  const[isMenuOpen,setMenuState]=useState(false);
  
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
              {props.onSize>=1280
              ? (<div className='header__container'>               
              <Link to='/' className='header__link link'>Фильмы</Link>
              <Link to='/savedMovies' className='header__link link'>Сохранённые фильмы</Link>
              <Link to='/profile' className='header__accBtn' >Аккаунт</Link>
            </div>)
            :  (<div className='header__container'>
                  <button className='header__humburgerBtn' onClick={()=>setMenuState(true)}/>
                </div>
            )
          }   
          <Menu isVisible={isMenuOpen} onCloseClick={()=>setMenuState(false)}/>              
                </header>  
              </Route>
              </Switch>               
    )
}

export default Header