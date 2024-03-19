import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user-slice';
import filterReducer from './reducers/fitler-slice';
import catalogReducer from './reducers/catalog-slice';

const rootReducer = combineReducers({
  userReducer,
  filterReducer,
  catalogReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
