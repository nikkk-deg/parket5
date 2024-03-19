import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { clearEmail } from '../store/reducers/user-slice';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
    dispatch(clearEmail());
    location.reload();
  };
  return (
    <Box
      sx={{
        width: 'max-content',
        backgroundColor: '#1881FF',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '150px',
      }}
    >
      <Button sx={{ color: 'black' }} onClick={handleLogOut}>
        Выйти из аккаунта
      </Button>
    </Box>
  );
}
