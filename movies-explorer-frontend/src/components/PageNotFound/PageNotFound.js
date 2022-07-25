import React from 'react'


function PageNotFound() {
    return (
        <section className='pageNotFound' id='404'>
            <h3 className='pageNotFound_error'>404</h3>
               <p className='pageNotFound_message'>Страница не найдена</p>
               <a className='pageNotFound_return'  href='/movies'>Назад</a>
        </section>        
    )
}

export default PageNotFound