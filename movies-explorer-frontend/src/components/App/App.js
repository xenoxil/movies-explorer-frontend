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
  const savedMoviesArray=[];
  const [savedMovies,setSavedMovies]=useState([])  
  useEffect(() => {
    window.addEventListener("resize", () => {
      setTimeout(setScreenWidth(window.innerWidth),1000)                
    }); 
    return () => {
      window.removeEventListener("resize", () => {
        setTimeout(setScreenWidth(window.innerWidth),1000)                
      });
    };   
  }, [])
  
  
  
  const [currentUser, setCurrentUser] = React.useState({
    name: "Пользователь",
    email: "pochta@ya.ru"  
  });

  const [loggedInState, setLoggedInState] = React.useState(false);
  const history = useHistory();

  const [cards, setCards] = React.useState([]);
  const [isSearched, setSearched] = React.useState(false);
  const [isSavedSearched, setSavedSearched] = React.useState(false);
  const [filteredArray, setFiltered] = React.useState([]); 
  const [currentMovies,setCurrentMovies] = React.useState(0);
  const [isMoreMoviesVisible,setMoreMoviesVisibility] = React.useState(false);
  const [addMovies,setAddMovies]=React.useState(4);
  const [showedMovies,setShowedMovies]=React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitched,setSwitchState] =useState(true);  
  
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


  useEffect(()=>{

  })
  
  
  

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
      .then(()=>{
        userApi.getSavedMovies()
        .then((data)=>{
          data.data.map((item)=>{
            item.src=item.image;
          savedMoviesArray.push(item)
          })
          setSavedMovies(savedMoviesArray)
          return(savedMovies)      
        })
      })

      .catch((err) => console.log("Ошибка:", err));      
    }, []);
  
    

    function handleSearch(movie){
      let fArray=[];
      // проверяем выполнялся ли поиск и если нет, запрашиваем массив фильмов от Апи Bitmovies
       if(!isSearched){
        setIsLoading(true);
        moviesListApi.getMovies()
        .then((moviesArray)=>{                    
          setCards(moviesArray);
          setSearched(true);
          moviesArray.forEach((item)=>{
            item.src=`https://api.nomoreparties.co/${item.image.url}`})
          fArray= searchFilter(moviesArray,movie)          
          setFiltered(fArray);          
          setShowedMovies(fArray.slice(0,currentMovies))
          setIsLoading(false);                   
        })           
        .catch((err)=>{
         console.log(err)
        })        
       }
       else{
        fArray=searchFilter(cards,movie);
        //сохраняем массив отфильтрованных фильмов
        setFiltered(fArray);
        setShowedMovies(fArray.slice(0,currentMovies));       
      }
                
    }

    function typeFiltering(moviesList){
      if(!isSwitched){        
        return moviesList.filter((item)=>{ return item.duration>40})
      }
      else{
        return moviesList.filter((item)=>{ return item.duration<=40})}
    }

    function searchFilter(moviesArray,requiredMovie){
      let newArray=moviesArray.filter((movieObj)=>{            
        if(movieObj.nameRU && movieObj.nameEN){
          return (movieObj.nameRU.toLowerCase().includes(requiredMovie.toLowerCase()) || movieObj.nameEN.toLowerCase().includes(requiredMovie.toLowerCase()))
        }
        else{
          return (movieObj.nameRU.toLowerCase().includes(requiredMovie.toLowerCase()))
        }          
      })
      debugger
      console.log(typeFiltering(newArray))
      return typeFiltering(newArray);
    }

    function handleSavedMoviesSearch(movie){      
       setIsLoading(true);                          
       setCards(savedMovies);
       setSavedSearched(true);             
       let fArray=searchFilter(savedMovies,movie);          
          setFiltered(fArray);
          setShowedMovies(fArray.slice(0,currentMovies))
          setIsLoading(false);                            
        } 
        
        function SwitchMovieType(){
          setSwitchState(!isSwitched);
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

  function handleLike(card){    
   userApi.saveMovie(card)
   .then(()=>{card.isLiked=true;
  console.log(card.isLiked)})   
   .catch((err)=>{
     console.log(err);
   })
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
        filteredMovies={showedMovies}
        onSearch={handleSavedMoviesSearch}
        onTypeSwitch={SwitchMovieType}
        isSwitched={isSwitched}
        savedMovies={savedMovies}
        isSavedSearched={isSavedSearched}
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
        isSwitched={isSwitched}       
        loggedIn={loggedInState}
        filteredMovies={showedMovies}
        onSearchClick={handleSearch}
        isSearched={isSearched}
        isShowed={isMoreMoviesVisible}
        onMoreMoviesClick={handleMoreMoviesClick}
        moreMoviesVisibilityCheck={moreMoviesVisibilityCheck}
        renderMovies={renderMovies}
        isLoading={isLoading}
        onLike={handleLike}
        savedMovies={savedMovies}
        onTypeSwitch={SwitchMovieType}        
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
