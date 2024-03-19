import { useNavigate, useParams } from 'react-router-dom';
import { Product as ProductType } from '../types';
import { useAppSelector } from '../store/hooks';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { deleteCatalog, editCatalog } from '../store/reducers/actions-creators';

export default function ProductAdmin() {
  const { id } = useParams();

  const { catalog } = useAppSelector((state) => state.catalogReducer);

  const navigate = useNavigate();

  const product = catalog.filter((item: ProductType) => item.id === id);

  const [title, setTitle] = useState(product[0]?.title);
  const [price, setPrice] = useState(product[0]?.price);
  const [overview, setOverview] = useState(product[0]?.overview);
  const [type, setType] = useState(product[0]?.type);
  const [manufactured, setManufactured] = useState(product[0]?.manufactured);
  const [rating, setRating] = useState(product[0]?.rating);
  const [img, setImg] = useState(product[0]?.img);
  const [consumption, setConsumption] = useState(product[0]?.consumption);

  if (title === undefined && product[0] !== undefined) {
    setTitle(product[0].title);
    setPrice(product[0]?.price);
    setOverview(product[0]?.overview);
    setType(product[0]?.type);
    setManufactured(product[0]?.manufactured);
    setRating(product[0]?.rating);
    setImg(product[0]?.img);
    setConsumption(product[0]?.consumption);
  }

  const handleChangeTitle = (newValue: string) => {
    setTitle(newValue);
  };
  const handleChangePrice = (newValue: string) => {
    setPrice(newValue);
  };
  const handleChangeOverview = (newValue: string) => {
    setOverview(newValue);
  };
  const handleChangeType = (newValue: string) => {
    setType(newValue);
  };
  const handleChangeManufactured = (newValue: string) => {
    setManufactured(newValue);
  };
  const handleChangeRaiting = (newValue: string) => {
    setRating(newValue);
  };
  const handleChangeImg = (newValue: string) => {
    setImg(newValue);
  };
  const handleChangeConsumotion = (newValue: string) => {
    setConsumption(newValue);
  };

  const handleDelete = () => {
    if (id !== undefined) {
      deleteCatalog(id);
      navigate('/orders');
      location.reload();
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      title: title,
      price: price,
      overview: overview,
      type: type,
      manufactured: manufactured,
      rating: rating,
      img: img,
      consumption: consumption,
      id: id,
    };

    if (id !== undefined) {
      editCatalog(id, data);
    }
    location.reload();
  };

  if (product !== undefined) {
    return product.map(() => {
      return (
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box className="title-admin-input">Название</Box>
            <TextField
              style={{ width: '95%', marginLeft: '10px', marginRight: '10pxs' }}
              onChange={(e) => handleChangeTitle(e.target.value)}
              value={title}
            />
            <Box className="title-admin-input">Цена</Box>
            <TextField
              style={{ width: '95%', marginLeft: '10px', marginRight: '10pxs' }}
              onChange={(e) => handleChangePrice(e.target.value)}
              value={price}
            />
            <Box className="title-admin-input">Опсание</Box>
            <TextField
              style={{ width: '95%', marginLeft: '10px', marginRight: '10pxs' }}
              onChange={(e) => handleChangeOverview(e.target.value)}
              value={overview}
            />
            <Box className="title-admin-input">
              Тип продукта(glue - Клей, varnish - Лак, parquet - Паркет,
              sandpaper - Наждачная бумага)
            </Box>
            <TextField
              style={{ width: '95%', marginLeft: '10px', marginRight: '10pxs' }}
              onChange={(e) => handleChangeType(e.target.value)}
              value={type}
            />
            <Box className="title-admin-input">Страна производства</Box>
            <TextField
              style={{ width: '95%', marginLeft: '10px', marginRight: '10pxs' }}
              onChange={(e) => handleChangeManufactured(e.target.value)}
              value={manufactured}
            />
            <Box className="title-admin-input">
              Рейтинг товара(товары c самым высоким рейтигом отображаютя на
              главной странице)
            </Box>
            <TextField
              style={{ width: '95%', marginLeft: '10px', marginRight: '10pxs' }}
              onChange={(e) => handleChangeRaiting(e.target.value)}
              value={rating}
            />
            <Box className="title-admin-input">url картинки</Box>
            <TextField
              style={{ width: '95%', marginLeft: '10px', marginRight: '10pxs' }}
              onChange={(e) => handleChangeImg(e.target.value)}
              value={img}
            />
            <Box className="title-admin-input">Расход материала</Box>
            <TextField
              style={{ width: '95%', marginLeft: '10px', marginRight: '10pxs' }}
              onChange={(e) => handleChangeConsumotion(e.target.value)}
              value={consumption}
            />
            <button
              style={{ margin: '50px 0 50px 0', backgroundColor: 'orange' }}
              type="submit"
            >
              Сделать изменение
            </button>
            <Button
              sx={{
                marginLeft: '50px',
                backgroundColor: 'red',
                color: 'black',
                fontWeight: 'bold',
              }}
              onClick={handleDelete}
            >
              Удалить из Базы Данных
            </Button>
          </form>
        </Box>
      );
    });
  }
}
