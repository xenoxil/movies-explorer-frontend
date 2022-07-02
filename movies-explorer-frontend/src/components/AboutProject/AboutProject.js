import React from 'react'


function AboutProject() {
    return (
        <section className='aboutProject' id='project'>
            <h2 className='aboutProject__title'>О проекте</h2>
            <div className='aboutProject__steps'>
            <div className='aboutProject__textContainer'>
              <h3 className='aboutProject__step-title'>Дипломный проект включал 5 этапов</h3>
              <p  className='aboutProject__step-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className='aboutProject__textContainer'>
              <h3 className='aboutProject__step-title'>На выполнение диплома ушло 5 недель</h3>
              <p  className='aboutProject__step-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            </div>
            <div className='aboutProject__progressRow'>
                <div className='aboutProject__backend'>
                    <p className='aboutProject__progress aboutProject__progress-backend'>1 неделя</p>
                    <p className='aboutProject__progress-title'>Back-end</p>
                </div>
                <div className='aboutProject__frontend'>                
                <p className='aboutProject__progress aboutProject__progress-frontend'>4 недели</p>
                <p className='aboutProject__progress-title'>Front-end</p>
                </div>
            </div>


        </section>        
    )
}

export default AboutProject