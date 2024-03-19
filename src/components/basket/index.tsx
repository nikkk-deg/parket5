import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BasketCard from './basket-card';
import { Checkbox } from '@mui/material';
import MakeOrder from './make-order';
import { useState } from 'react';
import { addAllOrder, deleteAllOrder } from '../../store/reducers/user-slice';
import { deleteMarked } from '../../store/reducers/actions-creators';

export default function BasketProductsList() {
  const { userBasket } = useAppSelector((state) => state.userReducer);
  const { order } = useAppSelector((state) => state.userReducer);
  const [check, setCheck] = useState(false);
  const dispatch = useAppDispatch();
  const email = localStorage.getItem('email');

  const handleCheckAll = () => {
    let newOrder: any[] = [];
    userBasket.map((item) => newOrder.push(item.id));
    if (newOrder.length === order.length) {
      dispatch(deleteAllOrder());
      setCheck(false);
      return;
    }
    dispatch(addAllOrder(newOrder));
    setCheck(true);
  };

  const handleClickDelete = () => {
    let deleteProducts = userBasket.filter(
      (item: any) => !order.includes(item.id)
    );
    dispatch(deleteMarked(email, deleteProducts));
  };

  if (userBasket !== null) {
    if (userBasket.length !== undefined && userBasket.length !== null) {
      return (
        <Box className="basket-product">
          <Box sx={{ width: '100%' }}>
            <Box className="check-all">
              <Checkbox
                checked={check}
                onClick={handleCheckAll}
                sx={{ fontSize: '50px' }}
              />
              Выбрать все
              <Box onClick={handleClickDelete} className="delete-checked">
                Удалить выбранные
              </Box>
            </Box>
          </Box>
          {userBasket.map((item: any) => {
            return (
              <BasketCard
                key={item.id}
                img={item.img}
                price={item.price}
                count={item.count}
                title={item.title}
                id={item.id}
              />
            );
          })}
          <MakeOrder />
        </Box>
      );
    }
  }

  return (
    <Box
      sx={{
        fontSize: 'x-large',
        width: 'max-content',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '150px',
        height: '300px',
      }}
    >
      Корзина пустая
    </Box>
  );
}
