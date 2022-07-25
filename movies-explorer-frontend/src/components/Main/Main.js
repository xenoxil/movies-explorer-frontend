import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../moreMovies/moreMovies';
import React from 'react';


function Main(props) {
  
    return (
      <div className="main">
        <Header className='main__header' onSize={props.onSize}/>
        <SearchForm onSize={props.onSize} isSwitched={true} onSearchClick={props.onSearchClick}
         renderMovies={props.renderMovies} moreMoviesVisibilityCheck={props.moreMoviesVisibilityCheck}/>
        <MoviesCardList movieCards={props.filteredMovies} isSearched={props.isSearched} />
        <MoreMovies isShowed={props.isShowed} onMoreMoviesClick={props.onMoreMoviesClick} />        
        <Footer/>   
      </div>
    );
  }
  
  export default Main;