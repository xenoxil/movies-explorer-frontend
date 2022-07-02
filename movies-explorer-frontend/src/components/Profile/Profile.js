import Header from '../Header/Header';


function Profile(props) {
    return (
      <div className='profile'>
        <Header className='main__header'/>
        <p className='profile__greetings'>Привет, {props.name}!</p>
        <form className='profile__form'>
           <div className='profile__container'>
               <p className='profile__text'>Имя</p>
               <input className='profile__input' placeholder='Имя' value='Юрий'/>
           </div>
           <div className='profile__container'>
               <p className='profile__text'>E-mail</p>
               <input className='profile__input' placeholder='Почта' value='pochta@example.com'/>
           </div>
           <button className='profile__edit' type='submit'>Редактировать</button>             
        </form>
        <button className='profile__logout' type='button'>Выйти из аккаунта</button>
      </div>
    );
  }

  export default Profile;