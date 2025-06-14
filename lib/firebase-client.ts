import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBvOkBH0J0FL0A1fEbvbvbvbvbvbvbvbvb", // Dette vil bli satt som miljøvariabel
  authDomain: "smarthylle.firebaseapp.com",
  projectId: "smarthylle",
  storageBucket: "smarthylle.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop",
}

// Initialize Firebase Client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const clientDb = getFirestore(app)
