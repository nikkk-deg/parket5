import { FormControl } from '@mui/base';
import { InputLabel, NativeSelect } from '@mui/material';
import { OPTIONS, setOption } from '../../store/reducers/fitler-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function Option() {
  const { option } = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();

  const handleChangeOption = (
    e: React.ChangeEventHandler<HTMLSelectElement> | any
  ) => {
    dispatch(setOption(e.target.value));
  };

  return (
    <FormControl>
      <InputLabel>Фильтровать по</InputLabel>
      <NativeSelect
        fullWidth
        onChange={(e) => handleChangeOption(e)}
        value={option}
      >
        <option value={OPTIONS[0].key}>{OPTIONS[0].value}</option>
        <option value={OPTIONS[1].key}>{OPTIONS[1].value}</option>
        <option value={OPTIONS[2].key}>{OPTIONS[2].value}</option>
      </NativeSelect>
    </FormControl>
  );
}
