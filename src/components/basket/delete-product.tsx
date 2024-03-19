import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BasketData, editBasket } from '../../store/reducers/actions-creators';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function DeleteProduct({ data }: BasketData | any) {
  const email = localStorage.getItem('email');
  const { userBasket } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(editBasket(email, data, true, userBasket));
  };

  return (
    <Box className="basket-delete" onClick={handleClick}>
      <RiDeleteBin6Line size={'30px'} style={{ cursor: 'pointer' }} />
    </Box>
  );
}
