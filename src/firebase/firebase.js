import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, GoogleAuthProvider, getReactNativePersistence } from 'firebase/auth';
//import { ReactNativeAsyncStorage } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
    apiKey: 'AIzaSyCY_0yMY9ebb5ITeIjyRCY8F2cHEyXy17I',
    authDomain: 'sustainabit-ec733.firebaseapp.com',
    databaseUrl: 'https://sustainabit-ec733.firebaseio.com',
    projectId: 'sustainabit-ec733',
    storageBucket: 'sustainabit-ec733.appspot.com',
}

export const firebase = initializeApp(firebaseConfig)
export const db = getFirestore(firebase)
export const auth = initializeAuth(firebase,
    {persistence: getReactNativePersistence(ReactNativeAsyncStorage)})
export const provider = new GoogleAuthProvider(firebase)