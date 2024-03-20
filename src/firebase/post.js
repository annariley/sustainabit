import { db } from "./firebase";
import { setDoc, addDoc, collection, doc, Timestamp, getDoc } from 'firebase/firestore'
import { user } from "./user";

export async function createNewPost(
    author,
    activityType,
    activityID,
    title,
    visibility
){
    const docRef = await addDoc(collection(db, "posts"),
    {
        author: author,
        activityType: activityType,
        activityID: activityID,
        title: title,
        visibility: visibility,
        creationTime: Timestamp.now()
    });
    console.log("Post Document written with ID: ", docRef.id)

    await setDoc(doc(db, 'users', author, 'posts', docRef.id),{ref: docRef})

    return docRef
}

export class post{
    constructor(postID) {
        this.postID = postID;
    }

    async sync() {
        this.postDoc = await this.getPostDoc()
        this.postData = this.postDoc.data()
        console.log(this.postData)

        this.activityID = this.postData['activityID']
        this.activityDoc = await this.getActivityDoc()
        this.activityData = this.activityDoc.data()

        this.author = this.postData['author'];
        this.activityType = this.postData['activityType'];
        this.title = this.postData['title'];
        this.visibility = this.postData['visibility']

        this.timeCompleted = this.activityData['timeCompleted'];
        this.locationCompleted = this.postData[''];
        this.score = this.activityData['points'];
        
        this.likes = 0
        this.comments = 0
        //TODO media

        //TODO likes
        //TODO comments
    }

    async getPostDoc(){
        postDoc = await getDoc(doc(db, 'posts', this.postID))
        return postDoc
    }

    async getActivityDoc(){
        activityDoc = await getDoc(doc(db, 'activities', this.activityID))
        return activityDoc
    }

    addLike() {
        //TODO
    }

    removeLike() {
        //TODO
    }

    addComment() {
        //TODO
    }

    removeComment() {
        //TODO
    }

}