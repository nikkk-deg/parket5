import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface CatalogState {
  catalog: Product[];
  minPrice: number;
  maxPrice: number;
  manufactured: string;
  productType: string;
  makerFirm: string;
  sorting: string;
  id: string;
}

const initialState: CatalogState = {
  catalog: [],
  minPrice: 0,
  maxPrice: 100000,
  manufactured: '',
  productType: '',
  makerFirm: '',
  sorting: 'popular',
  id: '',
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCatalog(state, action) {
      state.catalog = action.payload;
    },
  },
});

export const { setCatalog } = catalogSlice.actions;

export default catalogSlice.reducer;
