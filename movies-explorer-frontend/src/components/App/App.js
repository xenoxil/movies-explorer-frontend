import './App.css';
import Main from '../Main/Main'
import Landing from '../Landing/Landing';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import {Route,Switch,useHistory} from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import auth from '../../utils/auth';
import userApi from '../../utils/mainApi';


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
  const history = useHistory();
  const [isAuthReqSuccess, SetIsAuthReqSuccess] = React.useState(false);


  function handleRegisterClick(email, password,name) {
    auth
      .register(email, password,name)
      .then((response) => {
        SetIsAuthReqSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err === "400") {
          console.log("400 - некорректно заполнено одно из полей");
        } else {
          console.log(`Ошибка:`, err);
        }
        SetIsAuthReqSuccess(false);
      })      
  }

  function handleLoginClick(email, password) {
    auth
      .login(email, password)
      .then(() => {
        setLoggedInState(true);        
        history.push("/movies");
      })
      .then(()=>{
        userApi.getProfile()
        .then((profileObj) => {
          setCurrentUser(profileObj);
        })
      })
      .catch((err) => {
        if (err === 401) {
          console.log("401 - пользователь с email не найден");
        } else if (err === 400) {
          console.log("400 - не передано одно из полей ");
        } else {
          console.log(err);
        }
      });
  }

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
        <Login onLogin={handleLoginClick}/>
        </Route>
        <Route path='/sign-up'>
        <Register onRegisterClick={handleRegisterClick}/>
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
