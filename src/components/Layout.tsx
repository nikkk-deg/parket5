import { Outlet } from 'react-router-dom';
import Header from './navbar';
import { Box } from '@mui/material';
import Footer from './footer';

export default function Layout() {
  return (
    <Box className="d-flex flex-column min-vh-100">
      <Header />

      <Box className="main-content">
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
