import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  TITLES_PRODUCT_TYPE,
  deleteType,
  setType,
} from '../../store/reducers/fitler-slice';

export default function Type() {
  const dispatch = useAppDispatch();
  const { catalog } = useAppSelector((state) => state.catalogReducer);
  const { type } = useAppSelector((state) => state.filterReducer);

  const typeArr: string[] = [];

  catalog.map((item) => {
    if (!typeArr.includes(item.type)) {
      typeArr.push(item.type);
    }
  });

  const handleCheck = (newType: string) => {
    if (type.includes(newType)) {
      dispatch(deleteType(newType));
      return;
    }
    dispatch(setType(newType));
  };

  const returnLabel = (value: string) => {
    switch (value) {
      case 'glue':
        return TITLES_PRODUCT_TYPE.glue;
      case 'varnish':
        return TITLES_PRODUCT_TYPE.varnish;
      case 'parquet':
        return TITLES_PRODUCT_TYPE.parquet;
      case 'sandpaper':
        return TITLES_PRODUCT_TYPE.sandpaper;
      default:
        return '';
    }
  };

  return (
    <FormGroup sx={{ marginTop: '20px' }}>
      <>Тип товара:</>
      {typeArr.map((item: string) => (
        <FormControlLabel
          key={item}
          onChange={() => handleCheck(item)}
          control={<Checkbox checked={type.includes(item)} />}
          label={returnLabel(item)}
        />
      ))}
    </FormGroup>
  );
}
