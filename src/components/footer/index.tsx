import { Box } from '@mui/material';

export default function Footer() {
  return (
    <footer className="mt-auto footer bg-secondary">
      <Box sx={{ paddingTop: '20px' }} className="container">
        <div className="row">
          <div className="col-md-3">
            <h2>ПАРКЕТ НА 5-ОЙ</h2>
          </div>
          <div className="col-md-3">
            <h5>О нас</h5>
            <p>
              Паркет на 5-ой - розничный магазин паркета, паркетных лаков и
              клеёв.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Наши контакты</h5>
            <ul className="list-unstyled">
              <li>Email: mihail@parket5.ru</li>
              <li>Тел. : +7(918)581-90-10</li>
              <li>Адрес: г. Ростов-на-Дону ул. 5-я Кольцевая д.17</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>© 2024 Parquet-shop. Все права защищены.</p>
          </div>
        </div>
      </Box>
    </footer>
  );
}
