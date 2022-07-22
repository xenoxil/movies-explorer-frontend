import React from 'react'
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';


function Profile(props) {

  const userProfile = React.useContext(CurrentUserContext);

    return (
      <div className='profile'>
        <Header className='main__header'/>
        <p className='profile__greetings'>Привет, {userProfile.data.name}!</p>
        <form className='profile__form'>
           <div className='profile__container'>
               <p className='profile__text'>Имя</p>
               <input className='profile__input' placeholder='Имя' value={userProfile.data.name}/>
           </div>
           <div className='profile__container'>
               <p className='profile__text'>E-mail</p>
               <input className='profile__input' placeholder='Почта' value={userProfile.data.email}/>
           </div>
           <button className='profile__edit' type='submit'>Редактировать</button>             
        </form>
        <button className='profile__logout' type='button' onClick={props.onLogoutClick}>Выйти из аккаунта</button>
      </div>
    );
  }

  export default Profile;