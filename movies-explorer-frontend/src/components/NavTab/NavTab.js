import React from 'react';

function NavTab() {
  return (
    <section className="navTab">
      <nav className="navTab__container">
        <a href="#project" className="navTab__link" alt="О проекте">
          О проекте
        </a>
        <a href="#techs" className="navTab__link" alt="Технологии">
          Технологии
        </a>
        <a href="#student" className="navTab__link" alt="Студент">
          Студент
        </a>
      </nav>
    </section>
  );
}

export default NavTab;
