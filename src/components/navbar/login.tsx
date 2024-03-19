import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LINK_LOGIN } from './const';
import { CODE_ERRORS } from '../../pages/log-in';

export default function Login() {
  const isLogin = localStorage.getItem('email');

  if (
    isLogin !== CODE_ERRORS.err1 &&
    isLogin !== CODE_ERRORS.err2 &&
    isLogin !== CODE_ERRORS.err3 &&
    isLogin !== CODE_ERRORS.err4 &&
    isLogin !== '' &&
    isLogin !== null
  ) {
    return (
      <Box className="nav-link">
        <NavLink className="text-decoration-none" to={'/logout'}>
          <Box>Выйти</Box>
        </NavLink>
      </Box>
    );
  }

  return (
    <Box className="nav-link">
      <NavLink className="text-decoration-none" to={LINK_LOGIN}>
        <Box>Войти</Box>
      </NavLink>
    </Box>
  );
}
