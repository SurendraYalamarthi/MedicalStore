import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBVtu0ypwILOVwp_RPJ_DBGcc0BJNLln_s",
  authDomain: "medicine-store-1e88d.firebaseapp.com",
  databaseURL: "https://medicine-store-1e88d-default-rtdb.firebaseio.com",
  projectId: "medicine-store-1e88d",
  storageBucket: "medicine-store-1e88d.appspot.com",
  messagingSenderId: "854887258726",
  appId: "1:854887258726:web:7c386c5ccd936b7c0d6ba7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;