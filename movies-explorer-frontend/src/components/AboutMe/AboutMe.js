import React from 'react';
import myFoto from '../../images/studentFoto.png';

import linkArrow from '../../images/linkArrow.svg';

function AboutMe(props) {
  return (
    <section className="aboutMe" id="student">
      <h3 className="aboutMe__title">Студент</h3>
      {props.onSize >= 767 ? (
        <div className="aboutMe__student">
          <div className="aboutMe__container">
            <p className="aboutMe__name">Юрий</p>
            <p className="aboutMe__job">Фронтенд-разработчик</p>
            <p className="aboutMe__about">
              Я из города Лыткарино. Закончил факультет информационных систем РосНОУ.Я люблю слушать музыку, а ещё
              увлекаюсь бегом и компьютерными играми. Недавно начал кодить. С 2018 года работаю в компании «Nielsen».
              Сейчас занимаюсь фриланс-заказами и помогаю студентам Яндекс Практикума.
            </p>
          </div>
          <img className="aboutMe__foto" alt="Фото студента практикума" src={myFoto} />
        </div>
      ) : (
        <div className="aboutMe__student">
          <div className="aboutMe__container">
            <img className="aboutMe__foto" alt="Фото студента практикума" src={myFoto} />
            <p className="aboutMe__name">Юрий</p>
            <p className="aboutMe__job">Фронтенд-разработчик</p>
            <p className="aboutMe__about">
              Я из города Лыткарино. Закончил факультет информационных систем РосНОУ.Я люблю слушать музыку, а ещё
              увлекаюсь бегом и компьютерными играми. Недавно начал кодить. С 2018 года работаю в компании «Nielsen».
              Сейчас занимаюсь фриланс-заказами и помогаю студентам Яндекс Практикума.
            </p>
          </div>
        </div>
      )}

      <div className="aboutMe__socialLinks">
        <a
          className="aboutMe__socialLink link"
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://www.facebook.com">
          Facebook
        </a>
        <a
          className="aboutMe__socialLink link"
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://github.com/xenoxil">
          Github
        </a>
      </div>
      <ul className="aboutMe__portfolio">
        <p className="aboutMe__subtitle">Портфолио</p>
        <li className="aboutMe__portfolio-site">
          <p className="aboutMe__portfolio-siteDescription">Статичный сайт</p>
          <a
            className="aboutMe__portfolio-siteLink"
            target="_blank"
            rel="nofollow noopener noreferrer"
            href="https://how-to-learn-smoky.vercel.app/">
            <img src={linkArrow} alt="Ссылка на сайт" className="aboutMe__linkArrow" />
          </a>
        </li>
        <li className="aboutMe__portfolio-site">
          <p className="aboutMe__portfolio-siteDescription">Адаптивный сайт</p>
          <a
            className="aboutMe__portfolio-siteLink"
            target="_blank"
            rel="nofollow noopener noreferrer"
            href="https://russian-travel-nine.vercel.app/">
            <img src={linkArrow} alt="Ссылка на сайт" className="aboutMe__linkArrow" />
          </a>
        </li>
        <li className="aboutMe__portfolio-site">
          <p className="aboutMe__portfolio-siteDescription">Одностраничное приложение</p>
          <a
            className="aboutMe__portfolio-siteLink"
            target="_blank"
            rel="nofollow noopener noreferrer"
            href="https://xenoxil.mesto.nomoreparties.sbs/">
            <img src={linkArrow} alt="Ссылка на сайт" className="aboutMe__linkArrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
