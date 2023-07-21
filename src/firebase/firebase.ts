// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCghFCtRfQaVwPzyiZZSYrjEnvzIwdxvJM',
  authDomain: 'chat-c5ab6.firebaseapp.com',
  databaseURL: 'https://chat-c5ab6-default-rtdb.firebaseio.com',
  projectId: 'chat-c5ab6',
  storageBucket: 'chat-c5ab6.appspot.com',
  messagingSenderId: '1015273522497',
  appId: '1:1015273522497:web:ea7c962d95b555b366cdc0',
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Init Firebase AUTH
export const auth = getAuth(app);

// Init Firebase DB
export const db = getDatabase(app);
export const dbRef = ref(db);
