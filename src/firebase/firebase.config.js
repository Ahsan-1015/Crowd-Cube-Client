// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAvbvRSdm7QgXbOQSkTCzeYjXISuz5kXvc',
  authDomain: 'assignment-10-10e8f.firebaseapp.com',
  projectId: 'assignment-10-10e8f',
  storageBucket: 'assignment-10-10e8f.firebasestorage.app',
  messagingSenderId: '966497230883',
  appId: '1:966497230883:web:9fac607b4fe2a8dcfb5196',
  measurementId: 'G-TLVL7JBC8H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
export default auth;
