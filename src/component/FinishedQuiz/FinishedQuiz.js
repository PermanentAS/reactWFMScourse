import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button';

const FinishedQuiz = (props) => {
    console.log(props.results);
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success'){
            total++
        }

        return total
    }, 0) 

    
    return(
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa', 
                        props.results[quizItem.id] === 'error' ? 'fa-times ' : 'fa-check ',
                        classes[props.results[quizItem.id]]
                    ]
                    
                    return(
                        <li className={''} key={index}>
                            <strong>{index + 1}.</strong>&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                        
                    )
                })}
                
            </ul>

            <p>Правильно {successCount} из {props.quiz.length}</p>

                
            <Button 
                onClick={props.onRetry} 
                type="primary"
                >
                Повторить
            </Button>
            <Button 
                onClick={props.onRetry} 
                type="success"
                >
                Перейти в список тестов
            </Button>
        </div>
    )
}

export default FinishedQuiz