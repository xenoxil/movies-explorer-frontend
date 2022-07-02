import HeaderLogo from '../../images/header-logo.svg'


function Register() {
    return (
      <div className="register">
        <img src={HeaderLogo} className='register__logo' alt='Логотип проектной работы' />
        <h2 className='register__greetings'>Добро пожаловать!</h2>
        <form className='register__form'>
        <p className='register__formText'>Имя</p>
            <input className='register__input' />
            <p className='register__formText'>E-mail</p>
            <input className='register__input' />
            <p className='register__formText'>Пароль</p>
            <input className='register__input'/>
            <button className='register__button' type='submit'>Зарегистрироваться</button>
        </form> 
        <p className='login__register'>Уже зарегистрированы? <a className='login__registerLink' href='/sign-in'>Войти</a></p>       
      </div>
    );
  }
  
  export default Register;