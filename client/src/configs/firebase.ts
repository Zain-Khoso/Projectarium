// Lib Imports.
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth/cordova';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase Configuration Object.
const firebaseConfig = {
  apiKey: 'AIzaSyBiQkTmSNouRBbXWEjIBjbZf8J8pKRiXxI',
  authDomain: 'the-projectarium.firebaseapp.com',
  projectId: 'the-projectarium',
  storageBucket: 'the-projectarium.appspot.com',
  messagingSenderId: '630185915124',
  appId: '1:630185915124:web:f46686bdf1fcbf1c0524a1',
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
