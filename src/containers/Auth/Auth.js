import React, { Component } from 'react'
import classes from './Auth.css'
import Button from '../../component/UI/Button/Button';
import Input from '../../component/UI/Input/Input'
import is from 'is_js'


class Auth extends Component {

  state = {
    isFormValid: false,
    formControls:{
      email:{
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password:{
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = (e) => {
    e.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation){
      return true
    }

    let isValid = true

    if(validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if(validation.email) {
      isValid = is.email(value) && isValid
    }

    if(validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (e, controlName) => {
    console.log(`${controlName} `, e.target.value)

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls:formControls,
      isFormValid: isFormValid
    })
  }

  renderInputs(){
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return(
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(e) => this.onChangeHandler(e, controlName)}
        />
      )
    })

  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            
            {this.renderInputs()}

            <Button 
              type='success' 
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Войти</Button>
            <Button
              type='primary' 
              onClick={this.registerHandler}
            >Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth
