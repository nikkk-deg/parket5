import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function OrdersNavBar() {
  return (
    <Box>
      <Box className="nav-link">
        <NavLink className="text-decoration-none" to={'/orders'}>
          <Box>Заказы</Box>
        </NavLink>
      </Box>
    </Box>
  );
}
