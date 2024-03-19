import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BasketData } from '../../store/reducers/actions-creators';
import { deleteOrder, setOrder } from '../../store/reducers/user-slice';

export default function CheckProduct({ data }: BasketData | any) {
  const { order } = useAppSelector((state) => state.userReducer);
  const [check, setCheck] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setCheck(order.includes(data.id));
  }, [order]);
  const handleCheck = () => {
    if (order.includes(data.id)) {
      dispatch(deleteOrder(data.id));
    } else {
      dispatch(setOrder(data.id));
    }
  };

  return (
    <Box className="check-basket">
      <Checkbox
        onClick={handleCheck}
        checked={check}
        sx={{ fontSize: '30px' }}
      />
    </Box>
  );
}
