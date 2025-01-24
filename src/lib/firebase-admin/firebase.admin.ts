import { getAuth } from "firebase-admin/auth";
import admin, { type ServiceAccount } from "firebase-admin";
import { browser } from "$app/environment";
import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";

export let app: App | null = null;

const firebaseConfig: ServiceAccount = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  privateKey: import.meta.env.VITE_FIREBASE_PRIVATE_KEY,
  clientEmail: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
};

// console.log("Is browser:", browser);
// console.log("Number of Firebase apps:", admin.apps.length);

if (!browser && admin.apps.length === 0) {
  const cert = admin.credential.cert(firebaseConfig)
  app = admin.initializeApp({
    credential: cert
  })
  // console.log("Firebase app initialized:", adminApp);
}

export const auth: Auth | null = app ? getAuth(app) : null