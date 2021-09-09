import React from 'react'
import promoPic from '../../images/promo-logo.svg'


function Promo() {
    return (
        <section className='promo'>
            <img src={promoPic} className='promo__logo' alt='Растерный логотип практикума' />
            <h1 className='promo__text'>Учебный проект студента факультета Веб-разработки.</h1>
        </section>        
    )
}

export default Promo