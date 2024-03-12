import { getDoc, setDoc, addDoc, collection, doc, Timestamp } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//import db from '../App'

const DUMMY_VAL = 1
const DUMMY_STR = "tmp"

//TODO change reference to be from app
function tempInit() {
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

export async function createNewPost(
    author,
    activityType,
    activityRef,
    title,
    visibility
){
    db = tempInit();
    const docRef = await addDoc(collection(db, "posts"),
    {
        author: author,
        activityType: activityType,
        activityRef: activityRef,
        title: title,
        visibility: visibility,
        likes: 0,
        creationTime: Timestamp.now()
    });
    console.log("Post Document written with ID: ", docRef.id)

    await setDoc(doc(db, 'users', author, 'posts', docRef.id),{ref: docRef})
}