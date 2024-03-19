import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
  userEmail: string | null;
  userRole: string;
  userBasket: any[];
  isLoading: boolean;
  error: string;
  order: any[];
}

const initialState: UserState = {
  isLogin: false,
  userEmail: '',
  userRole: 'user',
  userBasket: [],
  isLoading: false,
  error: '',
  order: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearEmail(state) {
      state.userEmail = null;
    },
    clearIsLoading(state) {
      state.isLoading = false;
    },
    setLogin(state, action) {
      state.isLogin = action.payload.isLogin;
      state.userEmail = action.payload.email;
    },
    setBasket(state, action) {
      state.userBasket = action.payload;
    },
    setOrder(state, action) {
      state.order = [...state.order, action.payload];
    },

    deleteOrder(state, action) {
      state.order = state.order.filter((item: any) => {
        return item !== action.payload;
      });
    },
    deleteAllOrder(state) {
      state.order = [];
    },
    addAllOrder(state, action) {
      state.order = action.payload;
    },
  },
});

export const {
  setLogin,
  setBasket,
  setOrder,
  deleteOrder,
  deleteAllOrder,
  addAllOrder,
  clearEmail,
  clearIsLoading,
} = userSlice.actions;

export default userSlice.reducer;
