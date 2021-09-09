import './App.css';
import Main from '../Main/Main'
import Landing from '../Landing/Landing';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import {Route,Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/landing'>
        <Landing/>
        </Route>
        <Route path='/savedMovies'>
        <SavedMovies/>
        </Route>
        <Route path='/profile'>
        <Profile name={'Юрий'}/>
        </Route>
        <Route path='/sign-in'>
        <Login/>
        </Route>
        <Route path='/sign-up'>
        <Register/>
        </Route>
        <Route path='/'>
        <Main/>
        </Route>
        </Switch>
    
  
    
    

    </div>
  );
}

export default App;
