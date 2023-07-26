// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';
import { getStorage } from 'firebase/storage';
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

// INIT APP
const app = initializeApp(firebaseConfig);

// INIT AUTH
export const auth = getAuth(app);

// INIT DATABASE
export const db = getDatabase(app);
export const dbRef = ref(db);

// INIT STORAGE
export const storage = getStorage();
