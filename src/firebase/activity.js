import { setDoc, addDoc, collection, doc, Timestamp } from 'firebase/firestore'
import { db } from "./firebase";


function processCommute(commuteData) {
    //TODO this is dummy
    commuteDistance = 10 //km
    carbonReduced = 5
    return [commuteDistance, carbonReduced]
}

export async function createNewCommuteActivity(
    username,
    commuteType,
    commuteData,
    timeCompleted = Timestamp.now()
){
    //TODO this needs to be balanced
    if (commuteType == "bus") {
        points = 70
    } else if (commuteType == "bike") {
        points = 100
    } else {
        points = 0
    }

    [commuteDistance, carbonReduced] = processCommute(commuteData)
    const docRef = await addDoc(collection(db, "activities"),
        {
            activityType: "commute",
            user: username,
            commuteType: commuteType,
            commuteDistance: commuteDistance,
            carbonReduced: carbonReduced,
            commuteData: commuteData,
            points: points,
            timeCompleted: timeCompleted
        });
    console.log("New Commute Activity Document written with ID: ", docRef.id)

    return [docRef.id, points]
}

export async function createNewMealActivity(
    username,
    timeCompleted = Timestamp.now()
){
    //TODO Need to balance points
    points = 50
    const docRef = await addDoc(collection(db, "activities"),
        {
            activityType: "veganMeal",
            user: username,
            points: points,
            timeCompleted: timeCompleted
        });
    console.log("New Vegan Meal Activity Document written with ID: ", docRef.id)

    return [docRef.id, points]
}

export async function createNewCustomActivity(
    username,
    description,
    timeCompleted = Timestamp.now()
){
    points = 10 //TODO this should be calculated somehow
    const docRef = await addDoc(collection(db, "activities"),
        {
            activityType: "custom",
            user: username,
            description: description,
            points: points,
            timeCompleted: timeCompleted
        })
    console.log("New Custom Activity Document written with ID: ", docRef.id)

    return [docRef.id, points]
}

