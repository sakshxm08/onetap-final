import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// const firebaseConfig = {
//     apiKey: "AIzaSyCggZCcBun0cwNfOWGC2K8pZcgIRWMfqwY",
//     authDomain: "olx-sijeesh.firebaseapp.com",
//     projectId: "olx-sijeesh",
//     storageBucket: "olx-sijeesh.appspot.com",
//     messagingSenderId: "767411886432",
//     appId: "1:767411886432:web:2ef6862afc88f2c423a605",
//     measurementId: "G-4ELNR9DJHL"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyDFLr8sqoFq_wXEK09RSULtUv49D_VbVZI",
  authDomain: "original-bolt-359819.firebaseapp.com",
  projectId: "original-bolt-359819",
  storageBucket: "original-bolt-359819.appspot.com",
  messagingSenderId: "1080402575491",
  appId: "1:1080402575491:web:4eabde866323044a5ddbb6",
  measurementId: "G-6HY3K1J3MY",
};
export const Firebase = firebase.initializeApp(firebaseConfig); //named export
