import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, emailAction) => {
  if(emailAction.type === 'USER_INPUT') {
    return {value: emailAction.val, isValid: emailAction.val.includes('@')}//new snapshot of state
  }
  if(emailAction.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value:'', isValid: false}
}

const passReducer = (state, passAction, ) => {
  if(passAction.type === 'USER_INPUT') {
    return {value: passAction.val, isValid: passAction.val.trim().length > 6}
  }
  if(passAction.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
}

const Login = (props) => {
/*   const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
  /* const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', 
    isValid: false
  })// emailReducer(emailState, dispatchEmail)

  const [passState, dispatchPass] = useReducer(passReducer, {
    value: '',
    isValid: false
  })


/*   useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log('form validity');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
  
      setFormIsValid(
        enteredPassword.trim().length > 6 && enteredEmail.includes('@')
      );
    }, 500);

    return ()=> {
      console.log('clean up');
      clearTimeout(identifier)
    }
  }, [enteredEmail, enteredPassword]); */

  /* useEffect(()=>{
    console.log('hello')
  }, []) */ //check this out

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value); 
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    setFormIsValid(
      passState.isValid && event.target.value.includes('@')
    ); 
    console.log(formIsValid)
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPass({type:'USER_INPUT', val: event.target.value})
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 
    )
    console.log(formIsValid)
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(passState.value.trim().length > 6);
    dispatchPass({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
