import { Box, Button, FormLabel, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, db } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorTime, setErrorTime] = useState(false);
  const [errorMes1, setErrorMes1] = useState('');

  const navigate = useNavigate();

  const [colorError, setColorError] = useState('white');
  const handleInputEmail = (email: string) => {
    setEmail(email);
  };

  const handleInputPassword = (password: string) => {
    setPassword(password);
  };

  const handleConfirmPassword = (password: string) => {
    setConfirmPassword(password);
  };

  const setNewBakset = async () => {
    const basketRef = doc(db, 'basket', email);

    await setDoc(basketRef, {});
  };

  const setNewOrders = async () => {
    const ordersRef = doc(db, 'orders', email);

    await setDoc(ordersRef, {});
  };

  const handleSubmit = (e: Event | any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setColorError('red');
      setTimeout(() => setColorError('white'), 200);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setNewBakset();
        setNewOrders();
        navigate('/login');
      })

      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMes1('Аккаунт уже существует');
        } else {
          setErrorMes1('Ошибка сети');
        }
        console.warn(error.code);
        setErrorTime(true);
      });
  };

  if (errorTime && errorMes1 === 'Аккаунт уже существует') {
    setTimeout(() => setErrorTime(false), 1500);
    return (
      <Box
        sx={{
          width: 'max-content',
          height: 'max-content',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '150px',
        }}
      >
        {errorMes1}
      </Box>
    );
  } else if (errorTime && errorMes1 === 'Ошибка сети') {
    setTimeout(() => setErrorTime(false), 1500);
    return (
      <Box
        sx={{
          width: 'max-content',
          height: 'max-content',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '150px',
        }}
      >
        {`${errorMes1} или неправильно завполнена форма`}
      </Box>
    );
  }

  return (
    <Box className="registration-form-box">
      <form className="registration-form" onSubmit={(e) => handleSubmit(e)}>
        <FormLabel className="form-input">Введите email</FormLabel>
        <TextField
          className="form-input"
          size="small"
          placeholder="ivan@mail.ru"
          value={email}
          onChange={(e) => handleInputEmail(e.target.value)}
          type="email"
        ></TextField>
        <FormLabel className="form-input">
          Введите пароль (мин.6 символов)
        </FormLabel>
        <TextField
          className="form-input"
          size="small"
          value={password}
          onChange={(e) => handleInputPassword(e.target.value)}
          type="password"
        ></TextField>
        <FormLabel className="form-input">Повторите пароль</FormLabel>
        <TextField
          sx={{ backgroundColor: colorError }}
          className="form-input"
          size="small"
          value={confirmPassword}
          onChange={(e) => handleConfirmPassword(e.target.value)}
          type="password"
        ></TextField>
        {/* <NavLink to={'/'}> */}
        <Button
          type="submit"
          className="form-input"
          sx={{ marginTop: '25px' }}
          size="medium"
          variant="contained"
        >
          Регистрация
        </Button>
        {/* </NavLink> */}
      </form>
    </Box>
  );
}
