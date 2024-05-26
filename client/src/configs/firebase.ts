// Lib Imports.
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth/cordova';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase Configuration Object.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};

// Firebase Services in-use.
const app = getApp() || initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Third-Party Authentication Providers.
const GoogleAuth = new GoogleAuthProvider();
const GithubAuth = new GithubAuthProvider();

export { auth, firestore, storage, GoogleAuth, GithubAuth };
