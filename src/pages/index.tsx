import { Box } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { Product } from '../types';
import Card from '../components/card';

export default function Homepage() {
  let { catalog } = useAppSelector((state) => state.catalogReducer);

  catalog = [...catalog].sort((a: Product, b: Product) =>
    Number(b.rating) > Number(a.rating)
      ? 1
      : Number(b.rating) < Number(a.rating)
      ? -1
      : 0
  );

  return (
    <Box>
      <Box sx={{ position: 'relative' }} className="background-main ">
        <img
          src="/img/background2.png"
          className="rounded mx-auto d-block"
          alt="..."
        />
      </Box>
      <Box className="products-main">
        <Box className="cards-conteiner">
          {catalog.slice(0, 4).map((item: Product) => (
            <Card
              id={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              key={item.id}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
