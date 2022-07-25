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
  const [currentMovies,setCurrentMovies] = React.useState(0);
  const [isMoreMoviesVisible,setMoreMoviesVisibility] = React.useState(false);
  const [addMovies,setAddMovies]=React.useState(4);
  const [showedMovies,setShowedMovies]=React.useState([]);
  
  useEffect(()=>{
    if(screenWidth<768){
      setCurrentMovies(5)
      setAddMovies(5)
    }
    else if(screenWidth<1280 &&  screenWidth>=768){
      setCurrentMovies(8);
      setAddMovies(2)        
    }
    else{setCurrentMovies(16)
    setAddMovies(4)}
  },[])

  useEffect(()=>{
   moreMoviesVisibilityCheck()   
  },[showedMovies])
  
  
  

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
      let fArray=[];
      // проверяем выполнялся ли поиск и если нет, запрашиваем массив фильмов от Апи Bitmovies
       if(!isSearched){
        moviesListApi.getMovies()
        .then((moviesArray)=>{                    
          setCards(moviesArray);
          setSearched(true);
          fArray=moviesArray.filter((movieObj)=>{            
            if(movieObj.nameRU && movieObj.nameEN){
              return (movieObj.nameRU.toLowerCase().includes(movie.toLowerCase()) || movieObj.nameEN.toLowerCase().includes(movie.toLowerCase()))
            }
            else{
              return (movieObj.nameRU.toLowerCase().includes(movie.toLowerCase()))
            }          
          })
          setFiltered(fArray);          
          setShowedMovies(fArray.slice(0,currentMovies))                   
        })           
        .catch((err)=>{
         console.log(err)
        })        
       }
       else{
        fArray=cards.filter((movieObj)=>{         
          if(movieObj.nameRU && movieObj.nameEN){
            return (movieObj.nameRU.toLowerCase().includes(movie.toLowerCase()) || movieObj.nameEN.toLowerCase().includes(movie.toLowerCase()))
          }
          else{
            return (movieObj.nameRU.toLowerCase().includes(movie.toLowerCase()))
          }         
        })
        //сохраняем массив отфильтрованных фильмов
        setFiltered(fArray);
        setShowedMovies(fArray.slice(0,currentMovies))       
      }
                
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

  function moreMoviesVisibilityCheck(){    
    currentMovies<filteredArray.length ? setMoreMoviesVisibility(true) : setMoreMoviesVisibility(false)
  }
  function renderMovies(){
    setShowedMovies(filteredArray.slice(0,currentMovies));
  }
  function handleMoreMoviesClick(){
    setCurrentMovies(currentMovies+addMovies);
    setShowedMovies(filteredArray.slice(0,currentMovies+addMovies));             
  }

    
  
  

 
  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/landing'>
        <Landing
         onSize={screenWidth}
         loggedInState={loggedInState}/>
        </Route>
        <ProtectedRoute
        component={SavedMovies}
        loggedIn={loggedInState}
        exact 
         path='/savedMovies'
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
        filteredMovies={showedMovies}
        onSearchClick={handleSearch}
        isSearched={isSearched}
        isShowed={isMoreMoviesVisible}
        onMoreMoviesClick={handleMoreMoviesClick}
        moreMoviesVisibilityCheck={moreMoviesVisibilityCheck}
        renderMovies={renderMovies}
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
