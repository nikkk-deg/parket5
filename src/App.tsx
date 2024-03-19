import { Route, Routes } from 'react-router-dom';
import Homepage from './pages';
import Basket from './pages/basket';
import Login from './pages/log-in';
import NotFoundPage from './pages/not-found';
import Layout from './components/Layout';
import Catalog from './pages/catalog';
import Registration from './pages/registration';
import Order from './pages/order';
import Product from './pages/product';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import {
  getCatalog,
  handleClickBasket,
} from './store/reducers/actions-creators';
import Logout from './pages/log-out';
import Orders from './pages/orders';
import ProductAdmin from './pages/product-admin';
import AdminAdd from './pages/admin-add';
function App() {
  const dispatch = useAppDispatch();

  const catalog = () => {
    dispatch(getCatalog());
  };
  const email = localStorage.getItem('email');

  useEffect(() => {
    dispatch(handleClickBasket(email));
    catalog();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="basket" element={<Basket />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Registration />} />
          <Route path="order" element={<Order />} />
          <Route path="orders" element={<Orders />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/:id" element={<Product />} />
          <Route path="/admin/:id" element={<ProductAdmin />} />
          <Route path="/admin/add-to-DB" element={<AdminAdd />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
