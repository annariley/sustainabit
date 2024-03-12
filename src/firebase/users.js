
import { getDoc, setDoc, addDoc, collection, doc, Timestamp, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

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

export async function createNewUser(
    firstName,
    lastName,
    username,
    password,
    email
){
    db = tempInit();
    const docRef = await setDoc(doc(db, "users", username),
    {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email,
        score: 0,
        carbonBaseline: DUMMY_VAL,
        carbonReduction: DUMMY_VAL,
        profilePicture: DUMMY_STR,
        creationTime: Timestamp.now()
    });

    console.log("User Document created with username: ", username)
    
}

export class user{
    constructor(username) {
        this.username = username;
        this.update()
    }

    async update() {
        this.userDoc = await this.getUserDoc()
        this.userData = this.userDoc.data()

        this.email = this.userData['email'];
        this.firstName = this.userData['firstName'];
        this.lastName = this.userData['lastName'];
        this.password = this.userData['password'];
        this.friends = await this.getFriends()
    }

    async getUserDoc(){
        db = tempInit();
        userDoc = await getDoc(doc(db, 'users', this.username));
        return userDoc;
    }

    editUserInfo(data){
        setDoc(doc(db, 'users', this.username), data, { merge: true })
    }

    addFriend(friend){
        setDoc(doc(db, 'users', this.username, 'friends', friend),
        {
            ref: doc(db, 'users', friend),
            status: "pending"
        })
    }

    checkFriend() {
        return 0
    }

    async getFriends() {
        console.log(this.docRef)
        friendsRef = await getDocs(collection(db, 'users', this.username, 'friends'))
        const friends = [];
        for(let i=0; i<friendsRef.size; i++){
            friends[i] = friendsRef.docs[i].id
        }
        return friends
    }

    async getFeed(numPosts) {
        console.log("Getting ", numPosts, " most recent posts for ", this.username)
        const q = query(collection(db, 'posts'), 
                        where("author", "in", this.friends), 
                        orderBy("creationTime", "desc"), 
                        limit(numPosts));
        const qSnapshot = await getDocs(q)
        const feedData = []
        qSnapshot.forEach((doc) => {
            feedData.push(doc.data())
        })
        console.log(feedData)
        return feedData;
    }
}