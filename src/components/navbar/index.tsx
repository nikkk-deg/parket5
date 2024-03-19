import Title from './title';
import Basket from './basket';

import Search from './search';
import Login from './login';
import CatalogTitle from './catalod-title';
import OrdersNavBar from './orders';

export default function Header() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-md fixed-top bg-body-tertiary">
        <div className="container-fluid">
          <Title />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <CatalogTitle />
              </li>
              <li className="nav-item ">
                <Basket />
              </li>
              <li className="nav-item">
                <OrdersNavBar />
              </li>
              <li className="nav-item">
                <Login />
              </li>
            </ul>
            <div className="d-flex" role="search">
              <Search />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
