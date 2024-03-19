import { TextField, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Product } from '../../types';

export default function Search() {
  const { catalog } = useAppSelector((state) => state.catalogReducer);
  const navigate = useNavigate();
  const getLink = (e: any, value: string) => {
    e.preventDefault();
    const id = catalog.filter((item: Product) => {
      if (item.title === value) {
        return item.id;
      }
    });
    return id[0].id;
  };
  return (
    <Autocomplete
      sx={{ minWidth: '300px' }}
      options={catalog.map((item: Product) => item.title)}
      onChange={(e, value) =>
        value !== null ? navigate(getLink(e, value)) : false
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
}
