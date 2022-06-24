import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import savedCards from '../../utils/testSavedFilms';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import screenWidth from '../Main/Main'

function SavedMovies() {
    return (
      <div className="savedMovies">
        <Header className='main__header' size={screenWidth}/>
        <SearchForm/>
        <MoviesCardList movieCards={savedCards}/>
        <div className='savedMovies__separator'/>       
        <Footer/>   
      </div>
    );
  }
  
  export default SavedMovies;