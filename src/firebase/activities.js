import { setDoc, addDoc, collection, doc, Timestamp } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
//import db from '../App'

const DUMMY_VAL = 1
const DUMMY_STR = "tmp"
const COMMUTE_ACTIVITY = 0
const MEAL_ACTIVITY = 1
const OTHER_ACTIVITY = 2

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

export async function createNewCommuteActivity(
    user,
    commuteType,
    commuteDistance,
    commuteData,
    carbonReduced,
    points
){
    db = tempInit()
    const docRef = await addDoc(collection(db, "activities"),
    {
        activityType: COMMUTE_ACTIVITY,
        user: user,
        commuteType: commuteType,
        commuteDistance: commuteDistance,
        commuteData: commuteData,
        carbonReduced: carbonReduced,
        points: points,
        creationTime: Timestamp.now()
    });
    console.log("Activity Document written with ID: ", docRef.id)
}