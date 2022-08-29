import React from 'react';

function Footer(props) {
  return (
    <section className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      {props.onSize >= 768 ? (
        <div className="footer__container">
          <p className="footer__copyright">&copy;2022.Юрий Степанов</p>
          <nav className="footer__navigation">
            <ul className="footer__links">
              <li className="footer__link">
                <a
                  href="https://practicum.yandex.ru/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="link">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__link">
                <a
                  href="https://github.com/xenoxil"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="link">
                  Github
                </a>
              </li>
              <li className="footer__link">
                <a href="https://www.facebook.com" target="_blank" rel="nofollow noopener noreferrer" className="link">
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="footer__container">
          <nav className="footer__navigation">
            <ul className="footer__links">
              <li className="footer__link">
                <a
                  href="https://practicum.yandex.ru/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="link">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__link">
                <a
                  href="https://github.com/xenoxil"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="link">
                  Github
                </a>
              </li>
              <li className="footer__link">
                <a href="https://www.facebook.com" target="_blank" rel="nofollow noopener noreferrer" className="link">
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
          <p className="footer__copyright">&copy;2022</p>
        </div>
      )}
    </section>
  );
}

export default Footer;
