import React, { Component } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../component/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../component/FinishedQuiz/FinishedQuiz'

class Quiz extends Component{

    state = {
        results: [],
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Черный', id:1},
                    {text: 'Синий', id:2},
                    {text: 'Зелёный', id:3},
                    {text: 'Красный', id:4}
                ]
            },
            {
                id: 1,
                question: 'Кто из них гавкает?',
                rightAnswerId: 4,
                answers: [
                    {text: 'Конь', id:1},
                    {text: 'Свинья', id:2},
                    {text: 'Кот', id:3},
                    {text: 'Пес', id:4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        
        if(this.state.answerState) {
            
            const key = Object.keys(this.state.answerState)[0]
            
            if(this.state.answerState[key] === 'success') {
                return
            }
            
        }

        console.log('Answer ID: ', answerId);

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

            
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }        
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    } 

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Выберите правильный ответ</h1>

                    {
                        this.state.isFinished
                            ?   <FinishedQuiz 
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.retryHandler}
                                />
                            :   <ActiveQuiz 
                                    answers= {this.state.quiz[this.state.activeQuestion].answers}
                                    question= {this.state.quiz[this.state.activeQuestion].question}
                                    onAnswerClick= {this.onAnswerClickHandler}
                                    quizLength = {this.state.quiz.length}
                                    answerNumber = {this.state.activeQuestion + 1}
                                    state = {this.state.answerState}
                                />
                    }
                    
                    
                </div>
            </div>
        )
    }
}

export default Quiz;