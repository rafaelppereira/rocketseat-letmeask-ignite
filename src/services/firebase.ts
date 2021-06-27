import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAlVKIzXC39oQJM4FY7Cfhp3_5tRZOpEx4",
  authDomain: "letmeask-dbd02.firebaseapp.com",
  databaseURL: "https://letmeask-dbd02-default-rtdb.firebaseio.com",
  projectId: "letmeask-dbd02",
  storageBucket: "letmeask-dbd02.appspot.com",
  messagingSenderId: "245681721614",
  appId: "1:245681721614:web:da86c4a8c3d7eb33a1c75f"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }