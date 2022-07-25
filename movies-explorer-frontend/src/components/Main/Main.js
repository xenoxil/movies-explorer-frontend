import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../moreMovies/moreMovies';
import React from 'react';
import Preloader from '../Preloader/Preloader';


function Main(props) { 
   
    return (
      <div className="main">
        <Header className='main__header' onSize={props.onSize}/>
        <SearchForm onSize={props.onSize} onSearchClick={props.onSearchClick}
         renderMovies={props.renderMovies} moreMoviesVisibilityCheck={props.moreMoviesVisibilityCheck} isLoading={props.isLoading}
          onTypeSwitch={props.onTypeSwitch} isSwitched={props.isSwitched}/>
         {props.isLoading ? <Preloader/> 
         : (<MoviesCardList movieCards={props.filteredMovies} isSearched={props.isSearched} onCardClick={props.onCardClick}
           onLike={props.onLike} savedMovies={props.savedMovies}/>
        )} 
        <MoreMovies isShowed={props.isShowed} onMoreMoviesClick={props.onMoreMoviesClick}  /> 
        <Footer/>   
      </div>
    );
  }
  
  export default Main;