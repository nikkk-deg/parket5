import { Box, Button } from '@mui/material';
import { addToBasket } from '../../store/reducers/actions-creators';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

interface ButtonAddToBasket {
  id: string;
  img: string;
  title: string;
  price: string;
}

export default function ButtonAddToBasket({
  id,
  img,
  title,
  price,
}: ButtonAddToBasket) {
  const dispatch = useAppDispatch();
  const { userBasket } = useAppSelector((state) => state.userReducer);
  let ids: any[] = [];
  if (userBasket !== null && userBasket.length !== undefined) {
    userBasket.map((item) => ids.push(item.id));
  }

  const [productInBasket, setProductInBasket] = useState(ids.includes(id));

  const handleAddBasket = (
    productID: string,
    count: string,
    img: string,
    title: string,
    price: string
  ) => {
    const data = {
      id: productID,
      count: count,
      img: img,
      title: title,
      price: price,
    };
    const email = localStorage.getItem('email');
    dispatch(addToBasket(email, data));
  };

  if (productInBasket) {
    return (
      <Box>
        <NavLink to={'/basket'}>
          <Button
            sx={{
              backgroundColor: '#3cb371',
              color: 'black',
              fontSize: 'small',
            }}
          >
            Перейти в корзину
          </Button>
        </NavLink>
      </Box>
    );
  } else {
    return (
      <Button
        sx={{
          backgroundColor: '#f55600',
          color: 'black',
        }}
        onClick={() => {
          handleAddBasket(id, '1', img, title, price);
          setProductInBasket(true);
        }}
      >
        Купить
      </Button>
    );
  }
}
