import { Box } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { NavLink } from 'react-router-dom';
import { LiaRubleSignSolid } from 'react-icons/lia';
import { useState } from 'react';

export default function MakeOrder() {
  const { userBasket } = useAppSelector((state) => state.userReducer);
  const { order } = useAppSelector((state) => state.userReducer);
  const [colorError, setColorError] = useState('#3cb371');

  let newOrder = userBasket.filter((item: any) => order.includes(item.id));
  let linkToOrder = '';
  if (newOrder.length !== 0) {
    linkToOrder = '/order';
    localStorage.setItem('order', JSON.stringify(newOrder));
  }
  let totalPrice = Number(
    newOrder.reduce(
      (totalPrice, item) =>
        Number(totalPrice) + Number(item.price) * Number(item.count),
      0
    )
  );

  let totalProducts = Number(
    newOrder.reduce(
      (totalProduct, item) => Number(totalProduct) + Number(item.count),
      0
    )
  );

  let marginRubble = '0px';
  if (totalPrice > 1000000) marginRubble = '-90px';
  else if (totalPrice > 100000) marginRubble = '-80px';
  else if (totalPrice > 10000) marginRubble = '-70px';
  else if (totalPrice > 1000) marginRubble = '-60px';
  else if (totalPrice > 100) marginRubble = '-50px';

  const handleClick = () => {
    setColorError('red');
    setTimeout(() => {
      setColorError('#3cb371');
    }, 200);
  };

  return (
    <Box className="make-order">
      <NavLink to={linkToOrder}>
        <button
          style={{ backgroundColor: colorError }}
          className="make-order-button"
          onClick={handleClick}
        >
          Перейти к оформлению
        </button>
      </NavLink>
      <Box
        sx={{
          fontSize: 'large',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '15px',
          borderBottom: '1px solid #aaa',
        }}
      >
        Ваша корзина
      </Box>
      <Box sx={{ marginTop: '10px' }}>Товаров({totalProducts})</Box>
      <Box sx={{ marginTop: '10px' }}>
        Итого - {totalPrice}
        <LiaRubleSignSolid
          size="20px"
          style={{
            marginTop: '-5px',
            marginRight: `${marginRubble}`,
          }}
        />
      </Box>
    </Box>
  );
}
