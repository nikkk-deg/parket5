import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { FaRubleSign } from 'react-icons/fa6';

interface props {
  img: string;
  price: string;
  title: string;
  id: string;
}

export default function Card({ img, price, title, id }: props) {
  return (
    <NavLink to={`/${id}`}>
      <Box
        sx={{
          color: 'black',
          height: '370px',
          minWidth: '18rem',
          maxWidth: '18rem',
          display: 'flex-block',
          border: '2px solid #eee',
          backgroundColor: '#eee',
          borderRadius: '10px',
          margin: '10px 10px 10px 10px',
        }}
      >
        <img
          src={img}
          className="card-img-top"
          width={'300px'}
          height="250px"
          style={{ borderRadius: '10px' }}
        />
        <div className="card-body">
          <Box
            sx={{ fontWeight: 'bold', fontSize: 'large', margin: '10px ' }}
            className="card-text"
          >
            {price}
            <Box
              sx={{
                position: 'relative',
                top: '-30px',
                left: `${price.length * 10}px`,
              }}
            >
              <FaRubleSign />
            </Box>
          </Box>
          <Box
            className="card-title"
            sx={{ marginTop: '-30px', marginLeft: '10px' }}
          >
            {title}
          </Box>
        </div>
      </Box>
    </NavLink>
  );
}
