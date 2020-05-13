
  import firebase from 'firebase';
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCDzsqt44EzQ0XuXdWJQ6AX1xbt55KHgBY",
    authDomain: "vue-shop-ae03d.firebaseapp.com",
    databaseURL: "https://vue-shop-ae03d.firebaseio.com",
    projectId: "vue-shop-ae03d",
    storageBucket: "vue-shop-ae03d.appspot.com",
    messagingSenderId: "622966700637",
    appId: "1:622966700637:web:c3fca85af33e7b8285ebb4",
    measurementId: "G-VHBHT6FQ7H"
  };
  // Initialize Firebase
  export const fb = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
