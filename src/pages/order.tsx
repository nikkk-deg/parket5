import { Box, Button, TextField } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { sendEmail } from '../api/email';
import { useState } from 'react';
import { addToOrders, deleteMarked } from '../store/reducers/actions-creators';
import { CODE_ERRORS } from './log-in';
import { LiaRubleSignSolid } from 'react-icons/lia';

export default function Order() {
  const { userBasket } = useAppSelector((state) => state.userReducer);
  const order = JSON.parse(localStorage.getItem('order') || '{}');

  let orderIDS = useAppSelector((state) => state.userReducer.order);

  if (orderIDS.length !== 0) {
    localStorage.setItem('orderIDS', JSON.stringify(orderIDS));
    orderIDS = JSON.parse(localStorage.getItem('orderIDS') || '{}');
  }

  const navigate = useNavigate();

  const isLogin = localStorage.getItem('email');
  let totalPrice = Number(
    order.reduce(
      (totalPrice: any, item: any) =>
        Number(totalPrice) + Number(item.price) * Number(item.count),
      0
    )
  );
  let totalProducts = Number(
    order.reduce(
      (totalProduct: any, item: any) =>
        Number(totalProduct) + Number(item.count),
      0
    )
  );
  let marginRubble = '0px';
  if (totalPrice > 1000000) marginRubble = '-90px';
  else if (totalPrice > 100000) marginRubble = '-80px';
  else if (totalPrice > 10000) marginRubble = '-70px';
  else if (totalPrice > 1000) marginRubble = '-60px';
  else if (totalPrice > 100) marginRubble = '-50px';

  const [mail, setMail] = useState(isLogin);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMail, setErrorMail] = useState('white');
  const [errorPhone, setErrorPhone] = useState('white');
  const [errorAddress, setErrorAddress] = useState('white');

  const dispatch = useAppDispatch();
  const handleInputMail = (value: string) => {
    setMail(value);
  };

  const handleInputPhone = (value: string) => {
    setPhone(value);
  };

  const handleInputAddress = (value: string) => {
    setAddress(value);
  };

  let newOrder: any[] = [];
  order.map((item: any) => {
    let data = {
      title: item.title,
      count: item.count,
      price: item.price,
    };
    newOrder.push(data);
  });

  const discretion =
    'Для оплаты заказа с Вами свяжется менеджер компании (оплата по qr-коду из email письма).';

  const templateParams = {
    from_name: 'Parket5.ru',
    products: JSON.stringify(newOrder),
    totalProducts: totalProducts,
    price: totalPrice,
    send: import.meta.env.VITE_ADMIN_MAIL_1,
    phone: phone,
    userEmail: mail,
    address: address,
  };

  const handleSubmit = (
    e: Event | React.FormEventHandler<HTMLFormElement> | undefined | any
  ) => {
    e.preventDefault();
    if (mail === '') {
      setErrorMail('red');
      setTimeout(() => {
        setErrorMail('white');
      }, 200);
    } else if (phone === '') {
      setErrorPhone('red');
      setTimeout(() => {
        setErrorPhone('white');
      }, 200);
    } else if (address === '') {
      setErrorAddress('red');
      setTimeout(() => {
        setErrorAddress('white');
      }, 200);
    } else {
      sendEmail(templateParams);
      if (mail !== null && mail !== undefined) {
        addToOrders(mail, newOrder);

        let deleteProducts = userBasket.filter(
          (item: any) => !orderIDS.includes(item.id)
        );

        dispatch(deleteMarked(mail, deleteProducts));
        navigate('/orders');
      }
    }
  };

  if (
    isLogin !== CODE_ERRORS.err1 &&
    isLogin !== CODE_ERRORS.err2 &&
    isLogin !== CODE_ERRORS.err3 &&
    isLogin !== CODE_ERRORS.err4 &&
    isLogin !== '' &&
    isLogin !== null
  ) {
    return (
      <Box
        sx={{
          margin: '50px 0 150px 0',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <form style={{ width: '350px' }} onSubmit={(e) => handleSubmit(e)}>
          <label>Адрес электронной почты</label>
          <Box sx={{ width: '100%', marginBottom: '25px' }}>
            <TextField
              sx={{ width: '350px' }}
              style={{ backgroundColor: errorMail }}
              placeholder="ivan@mail.ru"
              value={mail}
              onChange={(e) => handleInputMail(e.target.value)}
            />
          </Box>
          <label>Номер телефона</label>
          <Box
            sx={{
              width: '100%',
              marginBottom: '25px',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <TextField
              sx={{ width: '350px' }}
              style={{ backgroundColor: errorPhone }}
              placeholder="+7(918)000-00-00"
              value={phone}
              onChange={(e) => handleInputPhone(e.target.value)}
            />
          </Box>
          <label>Адрес</label>
          <Box sx={{ width: '100%', marginBottom: '25px' }}>
            <TextField
              sx={{ width: '350px' }}
              style={{ backgroundColor: errorAddress }}
              placeholder="г. Ростов-на-Дону ул. 5-я Кольцевая д.17"
              value={address}
              onChange={(e) => handleInputAddress(e.target.value)}
            />{' '}
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
          <Box className="discription-order">{discretion}</Box>
          <Box
            sx={{
              width: '100%',
              marginBottom: '25px',

              display: 'flex',
              justifyContent: 'center',
              marginTop: '25px',
            }}
          >
            <Button variant="contained" type="submit">
              Сделать заказ
            </Button>
          </Box>
        </form>
      </Box>
    );
  }
  return (
    <Box
      sx={{ margin: '100px 0 150px 0', display: 'grid', placeItems: 'center' }}
    >
      <Box sx={{ fontWeight: '500', fontSize: '20px' }}>
        Авторизируйтесь, чтобы продолжить{' '}
      </Box>
      <NavLink to={'/login'}>
        <Button
          sx={{
            marginTop: '25px',
            backgroundColor: '#00BFFF',
            color: 'black',
            fontWeight: '500',
          }}
        >
          Войти в аккаунт
        </Button>
      </NavLink>
    </Box>
  );
}
