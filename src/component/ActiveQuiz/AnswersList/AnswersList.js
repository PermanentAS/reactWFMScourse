import React from 'react'
import classes from './AnswersList.css'
import AnswersItem from './AnswersItem/AnswersItem'

const AnswersList = (props) => (
    <ul className={classes.AnswersList}>
        <li></li>
        {props.answers.map((answer, index) => {
            return <AnswersItem 
                        state={props.state ? props.state[answer.id] : null}
                        answer={answer}
                        key={index}
                        onAnswerClick={props.onAnswerClick}
                    />
        })}
    </ul>
)

export default AnswersList