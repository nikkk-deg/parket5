import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { handleClickBasket } from '../store/reducers/actions-creators';
import { Box } from '@mui/material';
import BasketProductsList from '../components/basket';

export default function Basket() {
  const dispatch = useAppDispatch();

  const email = localStorage.getItem('email');

  useEffect(() => {
    dispatch(handleClickBasket(email));
  }, []);

  return (
    <Box>
      <BasketProductsList />
    </Box>
  );
}
