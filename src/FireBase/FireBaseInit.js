// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsEr6LRz4Dzarady1kZ2C_mntkFCSlgbs",
  authDomain: "mywordsdic.firebaseapp.com",
  projectId: "mywordsdic",
  storageBucket: "mywordsdic.appspot.com",
  messagingSenderId: "796382765384",
  appId: "1:796382765384:web:11c759c7c92c9fe7be537d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const dbFireStore = getFirestore(app);

// try {
//   fetch("https://jsonplaceholder.typicode.com/todosX/1")
//     .then((response) => {
//       if (response.status >= 200 && response.status < 300) {
//         return response.json();
//       } else {
//         let error = new Error(response.statusText);
//         error.response = response;
//         console.log(error);
//         throw error;
//       }
//     })
//     .then((json) => console.log(json));
// } catch (error) {
//   console.log("error: ", error);
// }
