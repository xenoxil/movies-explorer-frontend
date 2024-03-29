import HeaderLogo from '../../images/header-logo.svg';
import React, { useRef } from 'react';
import { FormValidator } from '../FormValidator';
import { loginConfig } from '../../utils/constants';
import Notification from '../Notification/Notification';

function Login(props) {
  const email = useRef();
  const password = useRef();

  React.useEffect(() => {
    const loginForm = document.getElementById('loginForm');
    const loginFormValidation = new FormValidator(loginConfig, loginForm);
    loginFormValidation.enableValidation();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email.current.value, password.current.value);
  }

  return (
    <div className="login">
      <img src={HeaderLogo} className="login__logo" alt="Логотип проектной работы" />
      <p className="login__greetings">Рады видеть!</p>
      <form className="login__form" id="loginForm">
        <p className="login__formText">E-mail</p>
        <input
          className="login__input"
          ref={email}
          type="email"
          id="loginEmail"
          required
          minLength={2}
          maxLength={40}
          autoComplete="off"
        />
        <span className="error" id="loginEmail-error" />
        <p className="login__formText">Пароль</p>
        <input
          className="login__input"
          ref={password}
          type="password"
          id="loginPassword"
          required
          minLength={8}
          maxLength={30}
          autoComplete="off"
        />
        <span className="error" id="loginPassword-error" />
        <button className="login__button" type="submit" onClick={handleSubmit} disabled={props.buttonDisableState}>
          Войти
        </button>
      </form>
      <p className="login__register">
        Ещё не зарегистрированы?{' '}
        <a className="login__registerLink" href="/signup">
          Регистрация
        </a>
      </p>
      <Notification isVisible={props.isNotificationVisible} notificationMessage={props.notificationMessage} />
    </div>
  );
}

export default Login;
