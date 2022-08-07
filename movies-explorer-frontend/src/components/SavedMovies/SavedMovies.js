import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies(props) {
    console.log(props.isSavedSearched);
    return (
      <div className="savedMovies">
        <Header className='main__header' onSize={props.onSize}/>
        <SearchForm onSize={props.onSize} isSwitched={props.isSwitched} onSearch={props.onSearch} onTypeSwitch={props.onTypeSwitch}/>
        <MoviesCardList movieCards={props.isSavedSearched && props.filteredMovies.length>0 ? props.filteredMovies : props.savedMovies} isSearched={true}/>
        <div className='savedMovies__separator'/>               
        <Footer/>   
      </div>
    );
  }
  
  export default SavedMovies;