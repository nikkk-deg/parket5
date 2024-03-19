import { Box, TextField } from '@mui/material';
import { BasketData, editBasket } from '../../store/reducers/actions-creators';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IoMdAdd } from 'react-icons/io';
import { FiMinus } from 'react-icons/fi';

interface CountInput {
  value: number;
  id: string;
}

export default function CountInput({ data }: BasketData | any) {
  const { userBasket } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const email = localStorage.getItem('email');

  const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    INPUT: 'input',
  };

  const handleChange = (action: string, value = 0) => {
    switch (action) {
      case ACTIONS.INCREMENT: {
        data.count = String(Number(data.count) + 1);

        break;
      }
      case ACTIONS.DECREMENT: {
        if (data.count > 1) {
          data.count = String(Number(data.count) - 1);
        }
        break;
      }
      case ACTIONS.INPUT: {
        if (Number(value) < 100) {
          if (Number(value) < 0) {
            value = Number(value) * -1;
          }
          data.count = String(value);
        }
        break;
      }
      default: {
        break;
      }
    }
    dispatch(editBasket(email, data, false, userBasket));
  };

  return (
    <Box className="number-input-box">
      <FiMinus
        className="number-decrement"
        onClick={() => handleChange(ACTIONS.DECREMENT)}
      />
      <TextField
        sx={{ width: '50px' }}
        size="small"
        id="outlined-basic"
        type="number"
        variant="outlined"
        value={data.count}
        onChange={(e) => handleChange(ACTIONS.INPUT, Number(e.target.value))}
      />{' '}
      <IoMdAdd
        className="number-increment"
        onClick={() => handleChange(ACTIONS.INCREMENT)}
      />
    </Box>
  );
}
