import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const addData = async (id: string, products: string) => {
  await setDoc(doc(db, 'basket', id), {
    basket: products,
  });
};

export const getData = async (id: string) => {
  const docRef = doc(db, 'basket', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
  } else {
    console.warn('No such document!');
  }
};
