import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDCOPgZHhpSxSPaPEuhfAa1Ui-gxcdh4yk",
    authDomain: "adminpanel-male-fashion.firebaseapp.com",
    projectId: "adminpanel-male-fashion",
    storageBucket: "adminpanel-male-fashion.appspot.com",
    messagingSenderId: "584164394752",
    appId: "1:584164394752:web:8ecdd17e96d8a42f0ed5e5",
    measurementId: "G-49J1FEHTXB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);