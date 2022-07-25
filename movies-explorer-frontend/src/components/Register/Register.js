import HeaderLogo from '../../images/header-logo.svg'
import {FormValidator} from '../FormValidator';
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {registerConfig} from '../../utils/constants';


function Register(props) {

  const name = useRef();
  const email = useRef();
  const password = useRef();
   
  React.useEffect(() => {   
  const registerForm=document.getElementById('registerForm');
const registerFormValidation= new FormValidator(registerConfig,registerForm);
registerFormValidation.enableValidation();
}, []);

function handleSubmit(e) {
  e.preventDefault();
  props.onRegisterClick(email.current.value, password.current.value,name.current.value);    
}

    return (
      <section className="register">
        <img src={HeaderLogo} className='register__logo' alt='Логотип проектной работы' />
        <h2 className='register__greetings'>Добро пожаловать!</h2>
        <form className='register__form' id="registerForm" autoComplete="off" onSubmit={handleSubmit}>
            <p className='register__formText'>Имя</p>            
            <input className='register__input'
             type='text'
             ref={name}
             required
             minLength={2}
             id="registerName"
             autocomplete="off"
            />
            <span className="error" id="registerName-error" />
            <p className='register__formText'>E-mail</p>            
            <input className='register__input'
            autocomplete="off"
              ref={email}
              type="email"
              id="registerEmail"               
              required
              minLength={2}
              maxLength={40}/>
            <span className="error" id="registerEmail-error" />
            <p className='register__formText'>Пароль</p> 
            <input className='register__input'
            autocomplete="off"
            ref={password}
            required
            minLength={8}
            maxLength={30}
            id="registerPassword"
            type='password'
            />
            <span className="error" id="registerPassword-error" />
            <button className='register__button' type='submit'>Зарегистрироваться</button>
        </form> 
        <p className='login__register'>Уже зарегистрированы? <Link to='/signin' className='login__registerLink' >Войти</Link></p>       
      </section>
    );
  }
  
  export default Register;