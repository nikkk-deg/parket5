import { Box } from '@mui/material';
import CountInput from './number-input';

import { FaRubleSign } from 'react-icons/fa6';

import { BasketData } from '../../store/reducers/actions-creators';
import DeleteProduct from './delete-product';
import CheckProduct from './check';
import { NavLink } from 'react-router-dom';

export default function BasketCard({
  img,
  count,
  title,
  id,
  price,
}: BasketData) {
  const data = {
    id: id,
    img: img,
    count: count,
    title: title,
    price: price,
  };

  let totalPrice = Number(data.price) * Number(data.count);
  let marginRubble = '0px';
  if (totalPrice > 1000000) marginRubble = '-90px';
  else if (totalPrice > 100000) marginRubble = '-80px';
  else if (totalPrice > 10000) marginRubble = '-70px';
  else if (totalPrice > 1000) marginRubble = '-60px';
  else if (totalPrice > 100) marginRubble = '-50px';

  return (
    <Box className="basket-card">
      <Box className="basket-card-box">
        <CheckProduct data={data} />
        <NavLink to={`/${id}`}>
          <Box className="basket-card-title">{title}</Box>
          <img
            className="basket-card-img"
            width="100px"
            height="90px"
            src={img}
          />
        </NavLink>
        <CountInput data={data} />
        <Box className="basket-card-price">{totalPrice}</Box>
        <FaRubleSign
          className="ruble-icon"
          style={{
            marginRight: `${marginRubble}`,
          }}
        />
        <DeleteProduct data={data} />
      </Box>
    </Box>
  );
}
