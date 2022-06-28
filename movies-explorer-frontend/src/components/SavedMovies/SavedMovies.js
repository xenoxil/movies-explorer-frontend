import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import savedCards from '../../utils/testSavedFilms';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {  
    return (
      <div className="savedMovies">
        <Header className='main__header' onSize={props.onSize}/>
        <SearchForm onSize={props.onSize} isSwitched={false}/>
        <MoviesCardList movieCards={savedCards}/>
        <div className='savedMovies__separator'/>       
        <Footer/>   
      </div>
    );
  }
  
  export default SavedMovies;