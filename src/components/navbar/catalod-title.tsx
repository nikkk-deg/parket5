import { Box } from '@mui/material';
import { CATALOG_TITLE, LINK_CATALOG } from './const';
import { NavLink } from 'react-router-dom';

export default function CatalogTitle() {
  return (
    <Box className="nav-link  " aria-current="page">
      <NavLink className="text-decoration-none" to={LINK_CATALOG}>
        {CATALOG_TITLE}
      </NavLink>
    </Box>
  );
}
