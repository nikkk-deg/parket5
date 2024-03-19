import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
  priceMin: string;
  priceMax: string;
  option: string;
  county: string[];
  type: string[];
}

export const TITLES_PRODUCT_TYPE = {
  ['glue']: 'Клей',
  ['varnish']: 'Лак',
  ['parquet']: 'Паркет',
  ['sandpaper']: 'Наждачная бумага',
};

export const OPTIONS = [
  { key: 'popular', value: 'популярности' },
  { key: 'price-down', value: 'убыванию цены' },
  { key: 'price-up', value: 'возрастанию цены' },
];

const initialState: FilterState = {
  priceMin: '',
  priceMax: '',
  option: OPTIONS[0].key,
  county: [],
  type: [],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPriceMin(state, action) {
      state.priceMin = action.payload;
    },
    setPriceMax(state, action) {
      state.priceMax = action.payload;
    },
    setOption(state, action) {
      state.option = action.payload;
    },
    setCounty(state, action) {
      state.county = [...state.county, action.payload];
    },
    deleteCounty(state, action) {
      state.county = state.county.filter((item) => item !== action.payload);
    },
    setType(state, action) {
      state.type = [...state.type, action.payload];
    },
    deleteType(state, action) {
      state.type = state.type.filter((item) => item !== action.payload);
    },
    reset(state) {
      state.priceMin = initialState.priceMin;
      state.priceMax = initialState.priceMax;
      state.option = initialState.option;
      state.county = initialState.county;
      state.type = initialState.type;
    },
  },
});
export const {
  deleteType,
  setType,
  setPriceMin,
  setPriceMax,
  setOption,
  setCounty,
  reset,
  deleteCounty,
} = filterSlice.actions;

export default filterSlice.reducer;
