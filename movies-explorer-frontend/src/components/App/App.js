import './App.css';
import Main from '../Main/Main'
import Landing from '../Landing/Landing';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import {Route,Switch} from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import {FormValidator} from '../FormValidator'
import {config} from '../../utils/constants'
import CurrentUserContext from "../../contexts/CurrentUserContext.js";


function App() {
  const[screenWidth,setScreenWidth]=useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);     
    });
  }, []) 
  
  const [currentUser, setCurrentUser] = React.useState({
    name: "Пользователь",
    email: "pochta@ya.ru"  
  });

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/landing'>
        <Landing onSize={screenWidth}/>
        </Route>
        <Route path='/savedMovies'>
        <SavedMovies onSize={screenWidth}/>
        </Route>
        <Route path='/profile'>
        <Profile name={'Юрий'}/>
        </Route>
        <Route path='/sign-in'>
        <Login/>
        </Route>
        <Route path='/sign-up'>
        <Register/>
        </Route>
        <Route path='/404'>
        <PageNotFound/>
        </Route>
        <Route path='/'>
        <Main onSize={screenWidth}/>
        </Route>        
        </Switch>
        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
