import HeaderLogo from '../../images/header-logo.svg'


function Login() {
    return (
      <div className="login">
        <img src={HeaderLogo} className='login__logo' alt='Логотип проектной работы' />
        <p className='login__greetings'>Рады видеть!</p>
        <form className='login__form'>
            <p className='login__formText'>E-mail</p>
            <input className='login__input' />
            <p className='login__formText'>Пароль</p>
            <input className='login__input'/>
            <button className='login__button' type='submit'>Войти</button>
        </form>
        <p className='login__register'>Ещё не зарегистрированы? <a className='login__registerLink' href='/sign-up'>Регистрация</a></p>
      </div>
    );
  }
  
  export default Login;