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
import moviesListApi from '../../utils/MoviesApi';


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

  const [cards, setCards] = React.useState([]);
  const [isSearched, setSearched] = React.useState(false);
  const [filteredArray, setFiltered] = React.useState([]);

  React.useEffect(() => {    
    userApi
      .getProfile()
      .then((profileObj) => {
        if(profileObj){
        setLoggedInState(true);
        setCurrentUser(profileObj);
        
        history.push("/movies");
      }
      else{
        return Promise.reject('Необходима авторизация');
      }
      })           
      .catch((err) => console.log("Ошибка:", err));      
    }, []);
  

    function handleSearch(movie){
      // проверяем выполнялся ли поиск и если нет, запрашиваем массив фильмов от Апи Bitmovies
       if(!isSearched){
        moviesListApi.getMovies()
        .then((moviesArray)=>{
          setCards(moviesArray);
          setSearched(true)
        })
        .catch((err)=>{
         console.log(err)
        })
       }
       //сохраняем массив отфильтрованных фильмов
       setFiltered(cards.filter((movieObj)=>{
        return (movieObj.nameRU.toLowerCase()===movie.toLowerCase() || movieObj.nameEN.toLowerCase()===movie.toLowerCase())
      }))
    }


  function handleRegisterClick(email, password,name) {
    auth
      .register(email, password,name)
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
        if (err === "400") {
          console.log("400 - некорректно заполнено одно из полей");
        } else {
          console.log(`Ошибка:`, err);
        }
        setLoggedInState(false);
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

  function handleEditProfileClick(name,email){
     userApi.editProfile(name,email)
     .then((profileObj)=>{
      setCurrentUser(profileObj)
     })
     .catch((err)=>{console.log(err)})
  }

  function handleLogoutClick(){
    setLoggedInState(false);
    auth.logout()
    .catch((err) => {      
        console.log(err);
      }
    );              
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
        loggedIn={loggedInState}
        onLogoutClick={handleLogoutClick}
        onEditClick={handleEditProfileClick}        
        exact 
         path='/profile'         
         />
        <Route path='/signin'>
        <Login onLogin={handleLoginClick}/>
        </Route>
        <Route path='/signup'>
        <Register onRegisterClick={handleRegisterClick}/>
        </Route>        
        <ProtectedRoute
        component={Main}        
        loggedIn={loggedInState}
        filteredMovies={filteredArray}
        onSearchClick={handleSearch}
        isSearched={isSearched}
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
