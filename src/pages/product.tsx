import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { Product as ProductType } from '../types';
import { FaRubleSign } from 'react-icons/fa6';
import ButtonAddToBasket from '../components/product/button';

export default function Product() {
  const { id } = useParams();

  const { catalog } = useAppSelector((state) => state.catalogReducer);
  const product = catalog.filter((item: ProductType) => item.id === id);

  return (
    <Box>
      {product.map((item: ProductType) => (
        <Box key={item.id}>
          <Box className="text-center" sx={{ fontSize: 'xx-large' }}>
            {item.title}
          </Box>
          <Box
            sx={{
              marginTop: '50px',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: 'max-content',
            }}
          >
            <div
              id="carouselExampleControls"
              className="carousel slide carousel-dark"
              data-bs-interval="1000000000"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <div className="carousel-item active">
                    <img
                      src={item.img}
                      width={'320px'}
                      className="d-block "
                      alt="..."
                    />
                  </div>
                </div>

                <div
                  className="modal "
                  id="staticBackdrop"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                >
                  <Box sx={{}}>
                    <div className="modal-dialog">
                      <div className="modal-body">
                        <Box
                          component="img"
                          sx={{
                            left: '-160px',
                            position: 'absolute',
                            width: '170%',
                          }}
                          src={item.img}
                        />
                      </div>
                    </div>
                  </Box>
                </div>

                <div
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <div className="carousel-item">
                    <img
                      src={item.img}
                      width={'320px'}
                      className="d-block "
                      alt="..."
                    />
                  </div>
                </div>

                <div
                  className="modal "
                  id="staticBackdrop"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                >
                  <Box sx={{}}>
                    <div className="modal-dialog">
                      <div className="modal-body">
                        <Box
                          component="img"
                          sx={{
                            left: '-150px',
                            position: 'absolute',
                            minWidth: '150%',
                          }}
                          src={item.img}
                        />
                      </div>
                    </div>
                  </Box>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </Box>

          <Box className="button-buy-product-page">
            <Box
              sx={{
                float: 'right',
                marginRight: '20px',
              }}
            >
              <ButtonAddToBasket
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
              />
            </Box>
            <Box
              sx={{
                float: 'right',
                marginTop: '-5px',
                marginRight: '20px',
                fontSize: 'x-large',
                fontWeight: 'bold',
              }}
            >
              {item.price}
              <FaRubleSign />
            </Box>
          </Box>

          <Box component="p" className="overview-product-page">
            Описание:
          </Box>
          <Box className="overview-product-page text-break">
            {item.overview}
          </Box>

          <Box component="p" className="overview-product-page">
            Производство:
          </Box>
          <Box className="overview-product-page text-break manufactured">
            {item.manufactured}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
