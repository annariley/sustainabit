import { db } from "./firebase";
import { setDoc, addDoc, collection, doc, Timestamp } from 'firebase/firestore'

export async function createNewPost(
    author,
    activityType,
    activityRef,
    title,
    visibility
){
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

    return docRef
}

export class post{
    constructor(postRef) {
        this.postRef = postRef;
    }

}