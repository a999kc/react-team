import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setName, setEmail, setPassword, setConfirmPassword, registerUser, setToken } from '../features/user/userSlice';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';


const RegisterForm: React.FC = () => {
  const name = useSelector((state: RootState) => state.user.name);
  const email = useSelector((state: RootState) => state.user.email);
  const password = useSelector((state: RootState) => state.user.password);
  const confirmPassword = useSelector((state: RootState) => state.user.confirmPassword); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [emailDirty,setEmailDirty] = React.useState(false)
  const [passwordDirty,setPasswordDirty] = React.useState(false)
  const [nameDirty,setNameDirty] =React.useState(false)
  const [emailError, setEmailError] = React.useState('Email не может быть пустым')
  const [passwordError, setPasswordError] = React.useState('Пароль не может быть пустым')
  const [nameError, setNameError] = React.useState('Имя не может быть пустым')
  const [formValid,setFormValid] = React.useState(false)
  const [submitError, setSubmitError] = React.useState('');

  useEffect(() => {
    if (emailError || passwordError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, nameError]);

  //Обработка ошибок поля с именем
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
    if(!e.target.value) {
      setNameError('Имя не может быть пустым')
    } else {
      setNameError('');
    }
  }

  //Обработка ошибок поля с почтой и ее валидация
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email')
    } else {
      setEmailError('')
    }

  }


  //Обработка ошибок поля с паролем
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
    if(!e.target.value) {
      setPasswordError('Пароль не может быть пустым')
    } else {
      setPasswordError('')
    }
  }

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch(e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      case 'name':
        setNameDirty(true)
        break
    }
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      console.log('Ошибка регистрации')
      setSubmitError('Ошибка регистрации: все поля должны быть заполнены');
      return;
    }

    if (formValid) {
      // Запрос на регистрацию пользователя
      try {
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email":email,
            "password":password
          })
          
        })
        
        if (!response.ok) {
          console.log(response)
          throw new Error('Ошибка регистрации');
        }

        const data = await response.json();
        const token = data.token;

        // Сохраняем токен в localStorage
        localStorage.setItem('token', token);

        // Обновляем Redux Store
        dispatch(registerUser({ name, email, password, confirmPassword, token }));

        setSubmitError('');
        // Редирект
        navigate('/users');
      } catch (error) {
        setSubmitError('Ошибка регистрации');
      }
    }
  };
  
  return (
    <div className="form-container">
      <form className="form" onSubmit={submitHandler} >
        <h2 className="title">Регистрация</h2>
        {submitError && <p className="error">{submitError}</p>}
        {(nameDirty && nameError) && <div className='input-error' style={{color:'red'}}>{nameError}</div>}
        <input
          name="name"
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => nameHandler(e)}
          onBlur={e => blurHandler(e)}
          className='input'
        />
        {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
        <input
          name="email"
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => emailHandler(e)}
          onBlur={e => blurHandler(e)}
          className='input'
        />
        {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
        {(password !== confirmPassword) && <div style={{color:'red'}}>Пароли не совпадают</div>}
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => passwordHandler(e)}
          onBlur={e => blurHandler(e)}
          className='input'
        />
        <input
          name="password"
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          
          onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
          className='input'
        />
        
        <button type="submit" className="button"  disabled={!formValid}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterForm;

