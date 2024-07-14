// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAFT3QLahKKsXKWdX6bjmnji9QxwWDay7M',
  authDomain: 'mininotes-899ec.firebaseapp.com',
  projectId: 'mininotes-899ec',
  storageBucket: 'mininotes-899ec.appspot.com',
  messagingSenderId: '770484310343',
  appId: '1:770484310343:web:48b483f6af0e658fe6fc62'
}

// Initialize Firebase
export const APP = initializeApp(firebaseConfig)
export const AUTH = getAuth(APP)
export const DB = getFirestore(APP)
