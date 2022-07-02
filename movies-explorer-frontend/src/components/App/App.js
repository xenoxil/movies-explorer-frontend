import './App.css';
import Main from '../Main/Main'
import Landing from '../Landing/Landing';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import {Route,Switch} from 'react-router-dom'
import React,{useState,useEffect,useHistory} from 'react'
import {FormValidator} from '../FormValidator'
import {config} from '../../utils/constants'
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


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

  const [loggedInState, setLoggedInState] = React.useState(false);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/landing'>
        <Landing onSize={screenWidth}/>
        </Route>
        <ProtectedRoute
        component={SavedMovies}
        loggedIn={loggedInState}
        exact 
         path='/saved-movies'
         onSize={screenWidth}
         />
         <ProtectedRoute
        component={Profile}
        name={'Юрий'}
        loggedIn={loggedInState}
        exact 
         path='/profile'         
         />
        <Route path='/sign-in'>
        <Login/>
        </Route>
        <Route path='/sign-up'>
        <Register/>
        </Route>        
        <ProtectedRoute
        component={Main}        
        loggedIn={loggedInState}
        exact 
         path='/movies'
         onSize={screenWidth}         
         />
         <Route path='/'>
        <PageNotFound/>
        </Route>                 
        </Switch>
        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
