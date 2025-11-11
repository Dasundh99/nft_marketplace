import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDAsmCIXGkChqz--m-3Kb70B2ICv3JBLLk",
    authDomain: "nfthrive-8d704.firebaseapp.com",
    projectId: "nfthrive-8d704",
    storageBucket: "nfthrive-8d704.firebasestorage.app",
    messagingSenderId: "941067083783",
    appId: "1:941067083783:web:c8e0a21a6062b698b74aa2",
    measurementId: "G-6KVY5D31NW"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
