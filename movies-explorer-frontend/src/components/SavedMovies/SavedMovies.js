import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {   
    return (
      <div className="savedMovies">
        <Header className='main__header' onSize={props.onSize}/>
        <SearchForm onSize={props.onSize} isSwitched={props.isSwitched} onSearch={props.onSearch} onTypeSwitch={props.onTypeSwitch}/>
        <MoviesCardList movieCards={props.savedMovies} isSearched={true}/>
        <div className='savedMovies__separator'/>               
        <Footer/>   
      </div>
    );
  }
  
  export default SavedMovies;