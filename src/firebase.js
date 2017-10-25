import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBnIS0Bn9Z4U9OP694TEV8JjTtEZhHeiaA",
  authDomain: "myapplication-893fe.firebaseapp.com",
  databaseURL: "https://myapplication-893fe.firebaseio.com",
  projectId: "myapplication-893fe",
  storageBucket: "myapplication-893fe.appspot.com",
  messagingSenderId: "812113005092"
};

firebase.initializeApp(config);
export default firebase;
