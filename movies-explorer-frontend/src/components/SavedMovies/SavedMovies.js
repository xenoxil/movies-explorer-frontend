import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Notification from '../Notification/Notification';


function SavedMovies(props) {
    console.log(props.isSavedSearched);
    return (
      <div className="savedMovies">
        <Header className='main__header' onSize={props.onSize}/>
        <SearchForm onSize={props.onSize} isSwitched={props.isSwitched} onSearch={props.onSearch} onTypeSwitch={props.onTypeSwitch}/>
        <MoviesCardList movieCards={props.isSavedSearched && props.filteredMovies.length>0 ? 
          props.filteredMovies : props.savedMovies} savedMovies={props.savedMovies} isSearched={true}
          onLike={props.onLikeClick} onDislikeClick={props.onDislikeClick} savedMoviesPage={true}/>
        <div className='savedMovies__separator'/>               
        <Footer/>
        <Notification isVisible={props.isNotificationVisible} notificationMessage={props.notificationMessage}/>   
      </div>
    );
  }
  
  export default SavedMovies;