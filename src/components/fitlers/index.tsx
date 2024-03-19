import { Box } from '@mui/material';
import Country from './country';
import Price from './price';
import Type from './type';
import Option from './option';
import Reset from './reset';

export default function Filters() {
  return (
    <>
      <Box
        sx={{ width: 'max-content', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Фильтры
        </button>
      </Box>

      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Фильтры
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Option />
              <Type />
              <Price />
              <Country />
              <Reset />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
