import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {initializeApp, provideFirebaseApp} from '@angular/fire/app'
import {getFirestore, provideFirestore } from '@angular/fire/firestore'

// Your web app's Firebase configuration firebaseConfig goes here
// Copy the firebaseConfig object from your Firebase project settings
// const firebaseConfig = { ...... }
const firebaseConfig = {

  apiKey: "AIzaSyDT8kOSonelhssh4sehVvZyakbXW5IBeH0",

  authDomain: "userinfo-82b08.firebaseapp.com",

  projectId: "userinfo-82b08",

  storageBucket: "userinfo-82b08.firebasestorage.app",

  messagingSenderId: "245330248738",

  appId: "1:245330248738:web:7c29099a842e75ccc1767b"

};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),

    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    provideFirestore(()=>getFirestore())
  
  ]
};
