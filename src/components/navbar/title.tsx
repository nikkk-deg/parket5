import { Box } from '@mui/material';
import { LINK_HOME } from './const';
import { NavLink } from 'react-router-dom';

export default function Title() {
  return (
    <Box className="navbar-brand">
      <NavLink to={LINK_HOME}>
        <img src="/img/logoParquet.png" width={'90px'} />
      </NavLink>
    </Box>
  );
}
