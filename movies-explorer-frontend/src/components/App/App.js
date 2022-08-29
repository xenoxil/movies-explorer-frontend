import './App.css';
import Main from '../Main/Main';
import Landing from '../Landing/Landing';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/auth';
import userApi from '../../utils/MainApi';
import moviesListApi from '../../utils/MoviesApi';

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const savedMoviesArray = [];
  const [savedMovies, setSavedMovies] = useState([]);
  const resizeFunction = () => {
    setTimeout(setScreenWidth(window.innerWidth), 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeFunction);
    return () => {
      window.removeEventListener('resize', resizeFunction);
    };
  }, []);

  const [currentUser, setCurrentUser] = React.useState({
    name: 'Пользователь',
    email: 'pochta@ya.ru',
  });

  const [loggedInState, setLoggedInState] = React.useState(false);
  const history = useHistory();

  const [cards, setCards] = React.useState([]);
  const [isSearched, setSearched] = React.useState(false);

  const [filteredArray, setFiltered] = React.useState([]);
  const [currentMovies, setCurrentMovies] = React.useState(0);
  const [isMoreMoviesVisible, setMoreMoviesVisibility] = React.useState(false);
  const [addMovies, setAddMovies] = React.useState(4);
  const [showedMovies, setShowedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitched, setSwitchState] = useState();
  const [notificationVisibility, setNotificationVisibility] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [buttonDisableState, setButtonDisableState] = useState(false);
  const [isStorageFull, setStorageState] = useState(false);
  const [isSavedSearched, setSavedSearched] = React.useState(false);

  useEffect(() => {
    if (screenWidth < 768) {
      setCurrentMovies(5);
      setAddMovies(5);
    } else if (screenWidth < 1280 && screenWidth >= 768) {
      setCurrentMovies(8);
      setAddMovies(2);
    } else {
      setCurrentMovies(16);
      setAddMovies(4);
    }
  }, []);

  useEffect(() => {
    moreMoviesVisibilityCheck();
  }, [showedMovies]);

  useEffect(() => {
    if (localStorage.getItem('moviesObjects') !== null && localStorage.getItem('moviesObjects') !== []) {
      setShowedMovies(JSON.parse(localStorage.getItem('moviesObjects')));
      setStorageState(true);
    }
    if (localStorage.getItem('moviesTypeFull') !== null) {
      if (localStorage.getItem('moviesTypeFull') === 'true') {
        setSwitchState(true);
      } else if (localStorage.getItem('moviesTypeFull') === 'false') {
        setSwitchState(false);
      }
    }
  }, []);

  React.useEffect(() => {
    userApi
      .getProfile()
      .then((profileObj) => {
        if (profileObj) {
          setLoggedInState(true);
          setCurrentUser(profileObj);
          history.push('/movies');
        } else {
          return Promise.reject('Необходима авторизация');
        }
      })
      .then(() => {
        userApi.getSavedMovies().then((data) => {
          data.data.map((item) => {
            item.src = item.image;
            return savedMoviesArray.push(item);
          });
          setSavedMovies(savedMoviesArray);
          return savedMovies;
        });
      })
      .catch((err) => console.log('Ошибка:', err));
  }, []);

  function saveToLocalStorage(movie, moviesObjects) {
    localStorage.setItem('moviesSearchInputValue', movie);
    localStorage.setItem('moviesTypeFull', isSwitched);
    localStorage.setItem('moviesObjects', moviesObjects);
  }

  function handleSearch(movie) {
    let fArray = [];
    // проверяем выполнялся ли поиск и если нет, запрашиваем массив фильмов от Апи Bitmovies
    if (!isSearched) {
      setIsLoading(true);
      moviesListApi
        .getMovies()
        .then((moviesArray) => {
          setCards(moviesArray);
          setSearched(true);
          moviesArray.forEach((item) => {
            item.src = `https://api.nomoreparties.co/${item.image.url}`;
          });
          fArray = searchFilter(moviesArray, movie);
          setFiltered(fArray);
          saveToLocalStorage(movie, JSON.stringify(fArray.slice(0, currentMovies)));
          setShowedMovies(fArray.slice(0, currentMovies));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fArray = searchFilter(cards, movie);
      //сохраняем массив отфильтрованных фильмов
      setFiltered(fArray);
      saveToLocalStorage(movie, JSON.stringify(fArray.slice(0, currentMovies)));
      setShowedMovies(fArray.slice(0, currentMovies));
    }
  }

  // фильтруем массив фильмов в зависимости от длительности
  function typeFiltering(moviesList) {
    if (isSwitched) {
      return moviesList.filter((item) => {
        return item.duration > 40;
      });
    } else {
      return moviesList.filter((item) => {
        return item.duration <= 40;
      });
    }
  }

  // фильтруем результаты поиска по названию, а затем фильтруем по длительности и возвращаем
  function searchFilter(moviesArray, requiredMovie) {
    let newArray = moviesArray.filter((movieObj) => {
      if (movieObj.nameRU && movieObj.nameEN) {
        return (
          movieObj.nameRU.toLowerCase().includes(requiredMovie.toLowerCase()) ||
          movieObj.nameEN.toLowerCase().includes(requiredMovie.toLowerCase())
        );
      } else {
        return movieObj.nameRU.toLowerCase().includes(requiredMovie.toLowerCase());
      }
    });
    return typeFiltering(newArray);
  }

  function handleSavedMoviesSearch(movie) {
    setIsLoading(true);
    setSavedSearched(true);
    let fArray = searchFilter(savedMovies, movie);
    setFiltered(fArray);
    setShowedMovies(fArray.slice(0, currentMovies));
    setIsLoading(false);
  }

  function SwitchMovieType() {
    setSwitchState(!isSwitched);
  }

  function handleRegisterClick(email, password, name) {
    setButtonDisableState(true);
    auth
      .register(email, password, name)
      .then(() => {
        handleLoginClick(email, password);
        handlingNotification(`Регистрация прошла успешно`);
      })
      .catch((err) => {
        if (err === '400') {
          console.log('400 - некорректно заполнено одно из полей');
          handlingNotification('Ошибка при регистрации 400 - некорректно заполнено одно из полей');
        } else {
          console.log(`Ошибка:`, err);
          handlingNotification(`Ошибка при регистрации: ${err}`);
        }
        setLoggedInState(false);
      })
      .finally(() => {
        setButtonDisableState(false);
      });
  }

  function handleLoginClick(email, password) {
    auth
      .login(email, password)
      .then(() => {
        handlingNotification(`Вход успешно выполнен`);
        setLoggedInState(true);
        history.push('/movies');
      })
      .then(() => {
        userApi.getProfile().then((profileObj) => {
          setCurrentUser(profileObj);
        });
      })
      .catch((err) => {
        if (err === 401) {
          console.log('401 - пользователь с email не найден');
          handlingNotification(`Ошибка при входе: 401 - пользователь с email не найден`);
        } else if (err === 400) {
          console.log('400 - не передано одно из полей ');
          handlingNotification(`Ошибка при входе: 400 - не передано одно из полей или одно из полей не валидно`);
        } else {
          console.log(err);
          handlingNotification(`Ошибка при входе: ${err}`);
        }
      });
  }

  function handlingNotification(notificationMessage) {
    setNotificationMessage(notificationMessage);
    setNotificationVisibility(true);
    setTimeout(() => {
      setNotificationVisibility(false);
    }, 5000);
  }

  function handleEditProfileClick(name, email) {
    if (name !== currentUser.data.name || email !== currentUser.data.email) {
      setButtonDisableState(true);
      userApi
        .editProfile(name, email)
        .then((profileObj) => {
          setCurrentUser(profileObj);
          handlingNotification(`Данные профиля успешно изменены`);
        })
        .catch((err) => {
          console.log(err);
          handlingNotification(`Ошибка при изменении профиля: ${err}`);
        })
        .finally(() => {
          setButtonDisableState(false);
        });
    } else {
      handlingNotification('Пожалуйста измените данные профиля перед нажатием кнопки "Редактировать"');
    }
  }

  function handleLogoutClick() {
    setLoggedInState(false);
    auth.logout().catch((err) => {
      console.log(err);
    });
  }

  function moreMoviesVisibilityCheck() {
    currentMovies < filteredArray.length ? setMoreMoviesVisibility(true) : setMoreMoviesVisibility(false);
  }
  function renderMovies(movieArray) {
    setShowedMovies(movieArray.slice(0, currentMovies));
  }
  function handleMoreMoviesClick() {
    setCurrentMovies(currentMovies + addMovies);
    setShowedMovies(filteredArray.slice(0, currentMovies + addMovies));
  }

  function handleLike(card) {
    userApi
      .saveMovie(card)
      .then((card) => {
        setSavedMovies([card, ...savedMovies]);
        handlingNotification(`Фильм успешно сохранён`);
      })
      .catch((err) => {
        console.log(err);
        if (err.statusCode === 400) {
          handlingNotification(`${err.message}`);
        }
        handlingNotification(`${err}`);
      });
  }

  function handleDislike(card) {
    const deleteId = savedMovies.find((movie) => movie.movieId === card.id)._id;
    userApi
      .removeMovie(deleteId)
      .then(() => {
        const arrayWithoutDeletedMovie = [];
        savedMovies.forEach((movie) => {
          if (movie.movieId !== card.id) {
            arrayWithoutDeletedMovie.push(movie);
          }
        });
        setSavedMovies(arrayWithoutDeletedMovie);
        handlingNotification(`Фильм успешно удалён`);
      })
      .catch((err) => {
        console.log(err);
        handlingNotification(`Ошибка при удалении фильма ${err}`);
      });
  }

  function handleDeleteMovie(card) {
    const deleteId = savedMovies.find((movie) => movie.movieId === card.id)._id;
    userApi
      .removeMovie(deleteId)
      .then(() => {
        const arrayWithoutDeletedMovie = [];
        filteredArray.forEach((movie) => {
          if (movie.movieId !== card.id) {
            arrayWithoutDeletedMovie.push(movie);
          }
        });
        setFiltered(arrayWithoutDeletedMovie);
        renderMovies(arrayWithoutDeletedMovie);
        setSavedMovies(arrayWithoutDeletedMovie);
        handlingNotification(`Фильм успешно удалён`);
      })
      .catch((err) => {
        console.log(err);
        handlingNotification(`Ошибка при удалении фильма ${err}`);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/landing">
            <Landing onSize={screenWidth} loggedInState={loggedInState} />
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
            onLikeClick={handleLike}
            onDislikeClick={handleDeleteMovie}
            isNotificationVisible={notificationVisibility}
            notificationMessage={notificationMessage}
            exact
            path="/savedMovies"
            onSize={screenWidth}
          />
          <ProtectedRoute
            component={Profile}
            loggedIn={loggedInState}
            onLogoutClick={handleLogoutClick}
            onEditClick={handleEditProfileClick}
            isNotificationVisible={notificationVisibility}
            notificationMessage={notificationMessage}
            buttonDisableState={buttonDisableState}
            exact
            path="/profile"
          />
          <Route exact path="/signin">
            <Login
              onLogin={handleLoginClick}
              isNotificationVisible={notificationVisibility}
              notificationMessage={notificationMessage}
            />
          </Route>
          <Route exact path="/signup">
            <Register
              onRegisterClick={handleRegisterClick}
              isNotificationVisible={notificationVisibility}
              notificationMessage={notificationMessage}
              buttonDisableState={buttonDisableState}
            />
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
            onDislikeClick={handleDislike}
            savedMovies={savedMovies}
            onTypeSwitch={SwitchMovieType}
            isNotificationVisible={notificationVisibility}
            notificationMessage={notificationMessage}
            isStorageFull={isStorageFull}
            exact
            path="/movies"
            onSize={screenWidth}
          />
          <Route exact path="/">
            {<Redirect to="/landing" />}
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
