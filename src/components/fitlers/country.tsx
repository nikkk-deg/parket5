import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteCounty, setCounty } from '../../store/reducers/fitler-slice';

export default function Country() {
  const dispatch = useAppDispatch();
  const { catalog } = useAppSelector((state) => state.catalogReducer);
  const { county } = useAppSelector((state) => state.filterReducer);

  const countyArr: string[] = [];

  catalog.map((item) => {
    if (!countyArr.includes(item.manufactured)) {
      countyArr.push(item.manufactured);
    }
  });

  const handleCheck = (newCounty: string) => {
    if (county.includes(newCounty)) {
      dispatch(deleteCounty(newCounty));
      return;
    }
    dispatch(setCounty(newCounty));
  };

  return (
    <FormGroup sx={{ marginTop: '20px' }}>
      <Box>Страна производитель:</Box>
      {countyArr.map((item) => (
        <FormControlLabel
          key={item}
          onChange={() => handleCheck(item)}
          control={<Checkbox checked={county.includes(item)} />}
          label={item}
        />
      ))}
    </FormGroup>
  );
}
