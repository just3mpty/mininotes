// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB-Ar8HalB7QwNYO6REf7sQE5R2m7vOIjY',
  authDomain: 'mininotes-4c421.firebaseapp.com',
  projectId: 'mininotes-4c421',
  storageBucket: 'mininotes-4c421.appspot.com',
  messagingSenderId: '506620778878',
  appId: '1:506620778878:web:3f62e2ea8d8ff3013dbb2f'
}

// Initialize Firebase
export const APP = initializeApp(firebaseConfig)
export const AUTH = getAuth(APP)
export const DB = getFirestore(APP)
