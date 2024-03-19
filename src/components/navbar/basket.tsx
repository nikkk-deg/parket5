import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LINK_BASKET } from './const';

export default function Basket() {
  return (
    <Box className="nav-link ">
      <NavLink className="text-decoration-none" to={LINK_BASKET}>
        <Box>Корзина</Box>
      </NavLink>
    </Box>
  );
}
