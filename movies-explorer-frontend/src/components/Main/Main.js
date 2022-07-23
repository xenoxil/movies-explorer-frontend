import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import movieCards from '../../utils/testCardList';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../moreMovies/moreMovies';
import React from 'react';


function Main(props) {
 
    return (
      <div className="main">
        <Header className='main__header' onSize={props.onSize}/>
        <SearchForm onSize={props.onSize} isSwitched={true} onSearchClick={props.onSearchClick} />
        <MoviesCardList movieCards={props.filteredArray} isSearched={props.isSearched}/>
        <MoreMovies/>        
        <Footer/>   
      </div>
    );
  }
  
  export default Main;