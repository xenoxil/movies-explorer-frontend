import React from 'react';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();
  function goBack() {
    history.goBack();
  }
  return (
    <section className="pageNotFound" id="404">
      <h3 className="pageNotFound_error">404</h3>
      <p className="pageNotFound_message">Страница не найдена</p>
      <p className="pageNotFound_return" onClick={goBack}>
        Назад
      </p>
    </section>
  );
}

export default PageNotFound;
