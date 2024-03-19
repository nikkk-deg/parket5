import { Box, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SignIn } from '../store/reducers/actions-creators';
import { clearEmail } from '../store/reducers/user-slice';

export const CODE_ERRORS = {
  err1: 'auth/invalid-credential',
  err2: 'auth/missing-password',
  err3: 'auth/network-request-failed',
  err4: 'auth/invalid-email',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setEPassword] = useState('');
  const errorCode = useAppSelector((state) => state.userReducer.userEmail);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const setLogin = () => {
    dispatch(SignIn(email, password));
  };

  const handleInputEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleInputPassword = (newPassword: string) => {
    setEPassword(newPassword);
  };
  const handleSubmit = (e: Event | any) => {
    e.preventDefault();
    setLogin();
    setEmail('');
    setEPassword('');
  };
  if (errorCode === CODE_ERRORS.err1) {
    setTimeout(() => {
      dispatch(clearEmail());
    }, 1500);

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
        {'Непраильно введен пароль или адрес электронной почты '}
      </Box>
    );
  }
  if (errorCode === CODE_ERRORS.err2) {
    setTimeout(() => {
      dispatch(clearEmail());
    }, 1500);

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
        {'Не введен пароль'}
      </Box>
    );
  }
  if (errorCode === CODE_ERRORS.err3) {
    setTimeout(() => {
      dispatch(clearEmail());
    }, 1500);
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
        Ошибка сети
      </Box>
    );
  }

  if (errorCode === CODE_ERRORS.err4) {
    setTimeout(() => {
      dispatch(clearEmail());
    }, 1500);
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
        Неправильно введена электронная почта
      </Box>
    );
  }

  if (
    errorCode !== CODE_ERRORS.err1 &&
    errorCode !== CODE_ERRORS.err2 &&
    errorCode !== CODE_ERRORS.err3 &&
    errorCode !== CODE_ERRORS.err4 &&
    errorCode !== '' &&
    errorCode !== null
  ) {
    navigate('/basket');
    location.reload();
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
        <FormLabel className="form-input">Введите пароль</FormLabel>
        <TextField
          className="form-input"
          size="small"
          value={password}
          onChange={(e) => handleInputPassword(e.target.value)}
          type="password"
        ></TextField>
        <Button
          className="form-input"
          type="submit"
          size="medium"
          variant="contained"
          sx={{ marginTop: '20px' }}
        >
          Войти
        </Button>
        <Box className="form-input">или</Box>
        <NavLink to={'/sign-up'}>
          <Button
            className="form-input"
            size="medium"
            variant="outlined"
            sx={{ marginTop: '20px' }}
          >
            Регистрация
          </Button>
        </NavLink>
      </form>
    </Box>
  );
}
