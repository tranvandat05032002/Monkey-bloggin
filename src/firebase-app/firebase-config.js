import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAW9WwLMp4FrwfiwvZruhU8R94PPuAZMDU",
  authDomain: "monkey-bloggin-5af2c.firebaseapp.com",
  projectId: "monkey-bloggin-5af2c",
  storageBucket: "monkey-bloggin-5af2c.appspot.com",
  messagingSenderId: "301435967311",
  appId: "1:301435967311:web:656b45c7fff00c0b8b973a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firebase auth
export const auth = getAuth(app);
// Init service
export const db = getFirestore(app);
