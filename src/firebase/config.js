import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmAyN-hxWjvhFWjpGxV3xD_zLSHdRc0kU",
  authDomain: "cooking-ninja-site-2f1e8.firebaseapp.com",
  projectId: "cooking-ninja-site-2f1e8",
  storageBucket: "cooking-ninja-site-2f1e8.appspot.com",
  messagingSenderId: "503093798140",
  appId: "1:503093798140:web:50887d11d6e08c4675a379",
};

// init Firebase
firebase.initializeApp(firebaseConfig);

//init Services
const projectFireStore = firebase.firestore()

export { projectFireStore }