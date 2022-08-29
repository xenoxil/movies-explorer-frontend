import React from 'react';
import loupePic from '../../images/loupePic.svg';
import searchBtn from '../../images/searchBtn.svg';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MovieTypeContainer from '../MovieTypeContainer/MovieTypeContainer';

function SearchForm(props) {
  const searchRef = React.useRef();
  const history = useHistory();
  let isMatchedPath = history.location.pathname === '/movies';
  const lastSearchedInput = localStorage.getItem('moviesSearchInputValue');

  useEffect(() => {
    if (lastSearchedInput !== null && isMatchedPath) {
      searchRef.current.value = lastSearchedInput;
    }
  }, []);

  useEffect(() => {
    if (props.isSwitched !== undefined) {
      isMatchedPath ? props.onSearchClick(searchRef.current.value) : props.onSearch(searchRef.current.value);
    }
  }, [props.isSwitched]);

  function searchClickMovies(e) {
    e.preventDefault();
    props.onSearchClick(searchRef.current.value);
  }

  function searchSavedMovies(e) {
    e.preventDefault();
    props.onSearch(searchRef.current.value);
  }

  function SwitchMovieTypeHandler(e) {
    e.preventDefault();
    props.onTypeSwitch();
  }

  function SwitchSavedMovieTypeHandler(e) {
    e.preventDefault();
    props.onTypeSwitch();
  }

  return (
    <section className="searchSection">
      {props.onSize >= 768 ? (
        <div>
          <form className="searchForm">
            <img src={loupePic} alt="Значок лупы" className="searchForm__loupePic" />
            <input className="searchForm__input" placeholder="Фильм" ref={searchRef} required />
            <button
              className="searchForm__searchBtn"
              onClick={isMatchedPath ? searchClickMovies : searchSavedMovies}
              disabled={props.isLoading}>
              <img src={searchBtn} alt="Кнопка поиска" />
            </button>
            <MovieTypeContainer
              isSwitched={props.isSwitched}
              onTypeSwitch={props.onTypeSwitch}
              SwitchSavedMovieTypeHandler={SwitchSavedMovieTypeHandler}
              SwitchMovieTypeHandler={SwitchMovieTypeHandler}
            />
          </form>
          <div className="search__bottomString" />
        </div>
      ) : (
        <div>
          <form className="searchForm">
            <input className="searchForm__input" placeholder="Фильм" ref={searchRef} required />
            <button
              className="searchForm__searchBtn"
              onClick={isMatchedPath ? searchClickMovies : searchSavedMovies}
              disabled={props.isLoading}>
              <img src={searchBtn} alt="Кнопка поиска" />
            </button>
          </form>
          <MovieTypeContainer
            isSwitched={props.isSwitched}
            onTypeSwitch={props.onTypeSwitch}
            SwitchSavedMovieTypeHandler={SwitchSavedMovieTypeHandler}
            SwitchMovieTypeHandler={SwitchMovieTypeHandler}
          />
          <div className="search__bottomString" />
        </div>
      )}
    </section>
  );
}

export default SearchForm;
