import React from 'react'
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Notification from '../Notification/Notification';

function Profile(props) {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const userProfile = React.useContext(CurrentUserContext);
  
  
  
  function editProfile(e){
    e.preventDefault();
      props.onEditClick(nameRef.current.value, emailRef.current.value) 
   
  }
   

    return (
      <div className='profile'>
        <Header className='main__header'/>
        <p className='profile__greetings'>Привет, {userProfile.data.name}!</p>
        <form className='profile__form'>
           <div className='profile__container'>
               <p className='profile__text'>Имя</p>
               <input className='profile__input' placeholder='Имя' defaultValue={userProfile.data.name} ref={nameRef}/>
           </div>
           <div className='profile__container'>
               <p className='profile__text'>E-mail</p>
               <input className='profile__input' placeholder='Почта' defaultValue={userProfile.data.email} ref={emailRef}/>
           </div>
           <button className='profile__edit' type='submit' onClick={editProfile}>Редактировать</button>             
        </form>
        <button className='profile__logout' type='button' onClick={props.onLogoutClick} disable={props.buttonDisableState}>Выйти из аккаунта</button>
        <Notification isVisible={props.isNotificationVisible} notificationMessage={props.notificationMessage}/>
      </div>
    );
  }

  export default Profile;