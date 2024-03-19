import { Box, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPriceMax, setPriceMin } from '../../store/reducers/fitler-slice';

export default function Price() {
  const { priceMin } = useAppSelector((state) => state.filterReducer);
  const { priceMax } = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();

  const handleSetMinPrice = (newPrice: string) => {
    dispatch(setPriceMin(newPrice));
  };

  const handleSetMaxPrice = (newPrice: string) => {
    dispatch(setPriceMax(newPrice));
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Box>Цена:</Box>
      <TextField
        sx={{ width: '200px', marginTop: '5px' }}
        onChange={(e) => handleSetMinPrice(e.target.value)}
        value={priceMin}
        label="от"
        variant="standard"
      />
      <TextField
        sx={{ marginLeft: '-200px', marginTop: '55px', width: '200px' }}
        onChange={(e) => handleSetMaxPrice(e.target.value)}
        value={priceMax}
        label="до"
        variant="standard"
      />
    </Box>
  );
}
