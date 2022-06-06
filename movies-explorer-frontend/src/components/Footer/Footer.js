import React from 'react'


function Footer() {
    return (
        <section className='footer'>
            <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__container'>
              <p className="footer__copyright">&copy;2022.Юрий Степанов</p>
              <nav className='footer__navigation'>
                 <ul className='footer__links'>
                     <li className='footer__link'><a href='https://practicum.yandex.ru/' className='link' >Яндекс.Практикум</a></li>
                     <li className='footer__link'><a href='https://github.com/' className='link'>Github</a></li>
                     <li className='footer__link'><a href='https://www.facebook.com' className='link'>Facebook</a></li> 
                 </ul>
              </nav>
            </div>     
        </section>        
    )
}

export default Footer;