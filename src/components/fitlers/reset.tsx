import Button from '@mui/material/Button';
import { useAppDispatch } from '../../store/hooks';
import { reset } from '../../store/reducers/fitler-slice';

export default function Reset() {
  const dispatch = useAppDispatch();
  const handleReset = () => {
    dispatch(reset());
  };
  return (
    <Button
      variant="text"
      sx={{ fontWeight: 'bold', color: '#555', float: 'right' }}
      onClick={handleReset}
    >
      Очистить
    </Button>
  );
}
