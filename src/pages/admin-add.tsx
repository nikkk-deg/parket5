import { Box, TextField } from '@mui/material';
import { v4 as randomID } from 'uuid';
import { useState } from 'react';
import { editCatalog } from '../store/reducers/actions-creators';
import { useNavigate } from 'react-router-dom';

export default function AdminAdd() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [overview, setOverview] = useState('');
  const [type, setType] = useState('');
  const [manufactured, setManufactured] = useState('');
  const [rating, setRating] = useState('');
  const [img, setImg] = useState('');
  const [consumption, setConsumption] = useState('');

  const id = randomID();
  const navigate = useNavigate();

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
      navigate('/orders');
      location.reload();
    }
  };

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
          Тип продукта(glue - Клей, varnish - Лак, parquet - Паркет, sandpaper -
          Наждачная бумага)
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
          Рейтинг товара(товары c самым высоким рейтигом отображаютя на главной
          странице)
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
          Добавит в базу данных
        </button>
      </form>
    </Box>
  );
}
