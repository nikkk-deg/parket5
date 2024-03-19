import { Box } from '@mui/material';
import { CODE_ERRORS } from './log-in';
import { getOrders } from '../store/reducers/actions-creators';
import AdminPanel from './admin-panel';

export default function Orders() {
  const isLogin = localStorage.getItem('email');

  if (
    isLogin === import.meta.env.VITE_ADMIN_MAIL_1 ||
    isLogin === import.meta.env.VITE_ADMIN_MAIL_2 ||
    isLogin === import.meta.env.VITE_ADMIN_MAIL_3
  ) {
    return (
      <Box>
        <AdminPanel />
      </Box>
    );
  }

  if (
    isLogin !== CODE_ERRORS.err1 &&
    isLogin !== CODE_ERRORS.err2 &&
    isLogin !== CODE_ERRORS.err3 &&
    isLogin !== CODE_ERRORS.err4 &&
    isLogin !== '' &&
    isLogin !== null &&
    isLogin !== undefined
  ) {
    getOrders(isLogin);
    let orders = JSON.parse(localStorage.getItem('orders') || '{}');

    if (JSON.stringify(orders).length <= 2 || orders === null) {
      return (
        <Box
          sx={{
            width: '100%',
            height: '100px',
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            fontWeight: '500',
            fontSize: '25px',
            marginBottom: '150px',
          }}
        >
          У Вас еще нет заказов
        </Box>
      );
    }

    const keys = Object.keys(orders);

    const getFormatedDate = (date: string) => {
      const newDate = new Date(Number(date));
      const yyyy = newDate.getFullYear();
      let mm = String(newDate.getMonth() + 1);
      let dd = String(newDate.getDate());

      if (Number(dd) < 10) dd = '0' + dd;
      if (Number(mm) < 10) mm = '0' + mm;

      const formattedDate = dd + '/' + mm + '/' + yyyy;
      return formattedDate;
    };

    return (
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          width: '100%',
          margin: '30px 0 100px 0',
        }}
      >
        {keys.map((item) => {
          return (
            <Box
              sx={{
                backgroundColor: '#ddd',
                width: '100%',
                margin: '10px 0 10px 0',
              }}
            >
              <Box sx={{ margin: '0 0 10px 10px' }}>
                {getFormatedDate(item)}
              </Box>
              {orders[item].map((item2: any) => (
                <>
                  <Box sx={{ marginLeft: '10px' }}>{`${
                    orders[item].indexOf(item2) + 1
                  }.`}</Box>
                  <Box
                    sx={{ position: 'relative', top: '-25px', left: '28px' }}
                  >
                    {`${item2.title} - ${Number(item2.price)}р. x ${Number(
                      item2.count
                    )}шт. =  ${Number(item2.price) * Number(item2.count)}р.`}
                  </Box>
                </>
              ))}
              <Box
                sx={{ marginLeft: '10px', marginBottom: '15px' }}
              >{`Итого: ${orders[item].reduce(
                (totalPrice: any, item: any) =>
                  Number(totalPrice) + Number(item.price) * Number(item.count),
                0
              )}р.`}</Box>
            </Box>
          );
        })}
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100px',
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: '500',
        fontSize: '25px',
        marginBottom: '150px',
      }}
    >
      У Вас еще нет заказов
    </Box>
  );
}
