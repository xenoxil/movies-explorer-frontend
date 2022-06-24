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
        <SearchForm onSize={props.onSize}/>
        <MoviesCardList movieCards={movieCards}/>
        <MoreMovies/>        
        <Footer/>   
      </div>
    );
  }
  
  export default Main;