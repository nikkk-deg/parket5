import { Box } from '@mui/material';
import Cards from '../components/catalog/index.tsx';
import Filters from '../components/fitlers/index.tsx';

export default function Catalog() {
  return (
    <Box>
      <Filters />
      <Cards />
    </Box>
  );
}
