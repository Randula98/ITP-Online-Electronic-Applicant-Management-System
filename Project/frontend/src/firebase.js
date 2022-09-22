// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCdXke6HikUmgEbN9LIj6QKiqKW_PJ5xeQ",
	authDomain: "synthetic-dealz.firebaseapp.com",
	projectId: "synthetic-dealz",
	storageBucket: "synthetic-dealz.appspot.com",
	messagingSenderId: "52571386458",
	appId: "1:52571386458:web:9b58d0fd983e801fcbde63",
	measurementId: "G-WMG65C12DN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
