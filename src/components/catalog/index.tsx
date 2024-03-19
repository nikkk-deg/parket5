import { Box } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { OPTIONS } from '../../store/reducers/fitler-slice';
import { Product } from '../../types';
import Card from '../card';

export default function Cards() {
  let catalogArr = useAppSelector((state) => state.catalogReducer.catalog);
  const { priceMin } = useAppSelector((state) => state.filterReducer);
  const { priceMax } = useAppSelector((state) => state.filterReducer);
  const { type } = useAppSelector((state) => state.filterReducer);
  const { option } = useAppSelector((state) => state.filterReducer);
  const { county } = useAppSelector((state) => state.filterReducer);

  if (county.length !== 0) {
    catalogArr = catalogArr.filter((item: Product) =>
      county.includes(item.manufactured)
    );
  }

  if (type.length !== 0) {
    catalogArr = catalogArr.filter((item: Product) => type.includes(item.type));
  }

  if (priceMin !== '') {
    catalogArr = catalogArr.filter(
      (item: Product) => Number(item.price) > Number(priceMin)
    );
  }

  if (priceMax !== '') {
    catalogArr = catalogArr.filter(
      (item: Product) => Number(item.price) < Number(priceMax)
    );
  }

  switch (option) {
    case OPTIONS[0].key: {
      catalogArr = [...catalogArr].sort((a: Product, b: Product) =>
        Number(b.rating) > Number(a.rating)
          ? 1
          : Number(b.rating) < Number(a.rating)
          ? -1
          : 0
      );
      break;
    }
    case OPTIONS[1].key: {
      catalogArr = [...catalogArr].sort((a: Product, b: Product) =>
        Number(b.price) > Number(a.price)
          ? 1
          : Number(b.price) < Number(a.price)
          ? -1
          : 0
      );
      break;
    }
    case OPTIONS[2].key: {
      catalogArr = [...catalogArr].sort((a: Product, b: Product) =>
        Number(b.price) < Number(a.price)
          ? 1
          : Number(b.price) > Number(a.price)
          ? -1
          : 0
      );
      break;
    }
    default: {
      break;
    }
  }
  return (
    <Box className="cards-conteiner">
      {catalogArr.map((item: Product) => {
        return (
          <Card
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.title}
            price={item.price}
          />
        );
      })}
    </Box>
  );
}
