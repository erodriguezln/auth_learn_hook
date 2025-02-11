import { initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { type Auth, signOut as firebaseSignOut } from "firebase/auth";
import { getAuth, setPersistence, type Persistence } from "firebase/auth";

export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
export const initializeFirebase = () => {
  // console.log(`initial: ${auth}`)
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app)
    console.log("Firebase SDK initialized successfully.");
    console.log(`auth: ${JSON.stringify(auth, null, 2)}`)
  }
}


export const signOut = () => firebaseSignOut(auth);