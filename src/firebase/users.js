
import { getDoc, setDoc, addDoc, collection, doc } from 'firebase/firestore'

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
//import db from '../App'

const DUMMY_VAL = 1
const DUMMY_STR = "tmp"

function tmpInit() {
    const firebaseConfig = {
    apiKey: 'AIzaSyCY_0yMY9ebb5ITeIjyRCY8F2cHEyXy17I',
    authDomain: 'sustainabit-ec733.firebaseapp.com',
    databaseUrl: 'https://sustainabit-ec733.firebaseio.com',
    projectId: 'sustainabit-ec733',
    storageBucket: 'sustainabit-ec733.appspot.com',
    }
    const fbapp = initializeApp(firebaseConfig);
    const db = getFirestore(fbapp);
    return db
}

export async function createNewUser(
    firstName,
    lastName,
    username,
    password,
    email
){
//TODO probably need to import the db from the App
    db = tmpInit()
    const docRef = await setDoc(doc(db, "users", username),
    {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email
    });
    console.log("Document written with ID: ", docRef.id)
}

export function getUser(){

}

export function editUser(){

}