import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../api/firebase';
import { AppDispatch } from '..';
import { setBasket, setLogin } from './user-slice';
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { setCatalog } from './catalog-slice';
import { Product } from '../../types';

export const SignIn =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setLogin({
            isLogin: true,
            email: user.email,
          })
        );
        console.log('success');
        localStorage.setItem('email', email);
      })
      .catch((error) => {
        console.warn(error.code);
        dispatch(
          setLogin({
            isLogin: false,
            email: error.code,
          })
        );
      });
  };

export const getCatalog = () => async (dispatch: AppDispatch) => {
  try {
    const catalog: Product[] = [];
    const catalogData = await getDocs(collection(db, 'catalog'));
    catalogData.forEach((item: any) => {
      catalog.push(item.data().newItem);
    });
    dispatch(setCatalog(catalog));
  } catch (error) {
    console.warn(error);
  }
};

export const handleClickBasket =
  (email: string | null) => async (dispatch: AppDispatch) => {
    if (email === null) {
      let localBasket = JSON.parse(localStorage.getItem('localBasket') || '{}');
      dispatch(setBasket(localBasket));
      return;
    }
    let localBasket = JSON.parse(localStorage.getItem('localBasket') || '{}');
    if (localBasket === null) localBasket = [];
    try {
      const docRef = doc(db, 'basket', `${email}`);
      const docSnap = await getDoc(docRef);
      let basket = docSnap.data();

      if (basket !== undefined) {
        for (let key in basket) {
          let flag = false;
          localBasket.map((item: any) => {
            if (basket !== undefined) {
              if (item.id === basket[key].id) {
                flag = true;
              }
            }
          });
          if (flag === false) {
            localBasket.push(basket[key]);
          }
        }
      }

      dispatch(setBasket(localBasket));
      await deleteDoc(doc(db, 'basket', `${email}`));
      localBasket.map((item: any) => {
        setDoc(docRef, { [localBasket.indexOf(item)]: item }, { merge: true });
      });
      localStorage.setItem('localBasket', JSON.stringify([]));
    } catch (error) {
      console.warn(error);
    }
  };

export interface BasketData {
  id: string;
  img: string;
  title: string;
  count: string;
  price: string;
}

export const addToBasket =
  (email: string | null, data: BasketData) => async (dispatch: AppDispatch) => {
    if (email === null) {
      let localBasket = JSON.parse(localStorage.getItem('localBasket') || '[]');
      console.log(localBasket.length);

      if (localBasket === null) localBasket = [];
      localBasket.push(data);
      localStorage.setItem('localBasket', JSON.stringify(localBasket));
      dispatch(setBasket(localBasket));
      return;
    }
    try {
      const docRef = doc(db, 'basket', email);
      const docSnap = await getDoc(docRef);
      const basket = docSnap.data();
      if (basket !== undefined) {
        let length = Object.keys(basket).length;
        setDoc(docRef, { [length]: data }, { merge: true });
        console.log('Add to basket is Success');
      } else {
        setDoc(docRef, { [0]: data }, { merge: true });
        console.log('Add to basket is Success');
      }
    } catch (error) {
      console.warn(error);
    }
  };

export const editBasket =
  (email: string | null, data: BasketData, remove = false, storeArr: any) =>
  async (dispatch: AppDispatch) => {
    if (email === null) {
      let localBasket = JSON.parse(localStorage.getItem('localBasket') || '{}');
      if (remove) {
        localBasket = localBasket.filter(
          (item: BasketData) => item.id !== data.id
        );
      } else {
        localBasket.map((item: BasketData) => {
          if (item.id === data.id) {
            item.count = data.count;
          }
        });
      }
      localStorage.setItem('localBasket', JSON.stringify(localBasket));
      dispatch(setBasket(localBasket));
      return;
    }
    try {
      const docRef = doc(db, 'basket', email);
      const docSnap = await getDoc(docRef);
      if (remove) {
        let basket = docSnap.data();
        let newBasket: any[] = [];
        if (basket !== undefined) {
          for (let key in basket) {
            if (basket[key].id !== data.id) {
              newBasket.push(basket[key]);
            }
          }
          dispatch(setBasket(newBasket));
          await deleteDoc(doc(db, 'basket', `${email}`));
          newBasket.map((item: any) => {
            setDoc(
              docRef,
              { [newBasket.indexOf(item)]: item },
              { merge: true }
            );
          });
        }
      } else {
        let basket = docSnap.data();
        let newBasket: any[] = [];
        let changeProductID = '';
        if (basket !== undefined) {
          for (let key in basket) {
            if (basket[key].id === data.id) {
              changeProductID = key;
              basket[key].count = data.count;
            }
            newBasket.push(basket[key]);
          }

          if (Number(newBasket.length) !== Number(storeArr.length)) return; //firestore send error file if flud
          dispatch(setBasket(newBasket));
          await updateDoc(docRef, {
            changeProductID: deleteField(),
          });
          setDoc(docRef, { [changeProductID]: data }, { merge: true });
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

export const deleteMarked =
  (email: string | null, data: any) => async (dispatch: AppDispatch) => {
    if (email === null) {
      localStorage.setItem('localBasket', JSON.stringify(data));
      let localBasket = JSON.parse(localStorage.getItem('localBasket') || '{}');
      dispatch(setBasket(localBasket));
      return;
    }
    try {
      const docRef = doc(db, 'basket', email);
      dispatch(setBasket(data));
      await deleteDoc(doc(db, 'basket', `${email}`));
      data.map((item: any) => {
        setDoc(docRef, { [data.indexOf(item)]: item }, { merge: true });
      });
    } catch (error) {
      console.warn(error);
    }
  };

export const addToOrders = (email: string, data: BasketData | any) => {
  try {
    const docRef = doc(db, 'orders', email);
    let key = Date.now();
    setDoc(docRef, { [key]: data }, { merge: true });
  } catch (error) {
    console.warn(error);
  }
};

export const getOrders = async (email: string) => {
  try {
    const docRef = doc(db, 'orders', `${email}`);
    const docSnap = await getDoc(docRef);
    localStorage.setItem('orders', JSON.stringify(docSnap.data()));
  } catch (error) {
    console.warn(error);
  }
};

export const editCatalog = async (id: string, data: BasketData | any) => {
  try {
    await setDoc(doc(db, 'catalog', id), { newItem: data });
  } catch (error) {
    console.warn(error);
  }
};

export const deleteCatalog = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'catalog', `${id}`));
  } catch (error) {
    console.warn(error);
  }
};
