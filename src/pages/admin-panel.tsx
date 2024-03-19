import { Box } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { NavLink } from 'react-router-dom';

export default function AdminPanel() {
  const { catalog } = useAppSelector((state) => state.catalogReducer);

  return (
    <Box>
      <NavLink to={'/admin/add-to-DB'}>
        <button>Добавить в базу данных</button>
      </NavLink>

      {catalog.map((item) => {
        return (
          <Box sx={{ marginLeft: '100px' }}>
            <NavLink to={`/admin/${item.id}`}>
              <img
                width="100px"
                height="100px"
                style={{ cursor: 'pointer' }}
                src={item.img}
              />
              <Box sx={{ marginBottom: '20px' }}>{item.title}</Box>
            </NavLink>
          </Box>
        );
      })}
    </Box>
  );
}
