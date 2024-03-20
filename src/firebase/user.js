
import { getDoc, setDoc, addDoc, collection, doc, Timestamp, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from './firebase';

import { createNewCommuteActivity, createNewCustomActivity, createNewMealActivity } from './activity';
import { createNewPost, post } from './post';

import { downloadImage } from '../firebase/storage';



const DUMMY_VAL = 1
const DUMMY_STR = "tmp"

export async function createNewUser(
    firstName,
    lastName,
    username,
    password,
    email,
    location,
    profilePicRef
){
    const docRef = await setDoc(doc(db, "users", username),
    {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email,
        location: location,
        score: 0,
        carbonBaseline: DUMMY_VAL,
        carbonReduction: DUMMY_VAL,
        profilePicture: profilePicRef,
        creationTime: Timestamp.now()
    });

    console.log("User Document created with username: ", username)
    
}

export async function searchUsers(queryString) {
    q = query(collection(db, 'users'),
            where("username", ">=", queryString),
            where("username", "<=", queryString + "\uf7ff"))
    const qSnapshot = await getDocs(q)

    const results = [];
    qSnapshot.forEach((doc) => {
        results.push(doc.data())
    })

    return results
}

async function checkUserExists(username){
    //TODO
    return true
}

export class user{
    constructor(username) {
        this.username = username;
    }

    async sync() {
        this.userDoc = await this.getUserDoc()
        this.userData = this.userDoc.data()

        this.email = this.userData['email'];
        this.firstName = this.userData['firstName'];
        this.lastName = this.userData['lastName'];
        this.location = this.userData['location'];
        this.score = this.userData['score'];

        this.profilePic = await downloadImage(`/images/profile_pics/${this.username}.png`)

        this.friends = await this.getFriends();
    }

    async getUserDoc(){
        userDoc = await getDoc(doc(db, 'users', this.username));
        return userDoc;
    }

    editUserInfo(data){
        setDoc(doc(db, 'users', this.username), data, { merge: true })
    }

    increaseScore(points) {
        newScore = Number(this.score) + Number(points)
        this.editUserInfo({"score": newScore})
    }


    /*
    ACTIVITY TRACKING
    */
    async trackActivity(
        activityType,
        visibility,
        commuteType = null,
        commuteData = null,
        description = null,
        timeCompleted = Timestamp.now()
    ){
        switch (activityType) {
            case "commute": 
                [activityID, score] = await createNewCommuteActivity(
                    this.username,
                    commuteType,
                    commuteData,
                    timeCompleted
                )
                if (commuteType == "bike") {
                    title = this.firstName + " biked to work!"
                } else if (commuteType == "bus") {
                    title = this.firstName + " took the bus to work!"
                }
                break;
            
            case "veganMeal": 
                [activityID, score] = await createNewMealActivity(
                    this.username,
                    timeCompleted
                )
                title = this.firstName + " ate a vegan meal!"
                break;
            
            case "custom": 
                [activityID, score] = await createNewCustomActivity(
                    this.username,
                    description,
                    timeCompleted
                )
                title = this.firstName + " tracked a custom activity!"
                break;
            
            default:
                console.log("Invalid Activity Type")
        }
        const postRef = await createNewPost(
            this.username,
            activityType,
            activityID,
            title,
            visibility
        )
        this.increaseScore(score)

        return postRef.id
    }
    
    /*
    FRIENDS
    */
    async addFriend(friend){
        const checkExists = await checkUserExists()
        if (checkExists) {
            setDoc(doc(db, 'users', this.username, 'friends', friend),
                    {
                        ref: doc(db, 'users', friend),
                        status: "requested"
                    })
            setDoc(doc(db, 'users', friend, 'friends', this.username),
                    {
                        ref: doc(db, 'users', friend),
                        status: "pending"
                    })
            console.log("Request sent!")
        } else {
            console.log("User ", friend, " does not exist.")
        }
    }
    
    async getFriends() {
        const q = query(collection(db, 'users', this.username, 'friends'),
                        where("status", "==", "friends"));
        const qSnapshot = await getDocs(q)

        const friends = [];
        qSnapshot.forEach((doc) => {
            friends.push(doc.id)
        })

        return friends
    }

    async getFriendRequests() {
        console.log("Getting pending friend requests for ", this.username)
        const q = query(collection(db, 'users', this.username, 'friends'),
                        where("status", "==", "pending"));

        const qSnapshot = await getDocs(q)
        const friendRequests = []
        qSnapshot.forEach((doc) => {
            friendRequests.push(doc.data())
        })

        console.log("Success!")

        return friendRequests
    }

    confirmFriend(friend) {
        setDoc(doc(db, 'users', this.username, 'friends', friend),
                {
                    ref: doc(db, 'users', friend),
                    status: "friends"
                })
        setDoc(doc(db, 'users', friend, 'friends', this.username),
                {
                    ref: doc(db, 'users', friend),
                    status: "friends"
                })
    }

    async getFriendLeaderboard() {
        const q = query(collection(db, 'users', this.username, 'friends'),
                        where("status", "==", "friends"));
        const qSnapshot = await getDocs(q)

        const leaderboard = [];
        qSnapshot.forEach((doc) => {
            leaderboard.push([doc.data()['username'], doc.data()['score'], doc.data()['location']])
        })

        return leaderboard
    }


    /*
    FEED
    */
    async getFriendsFeed() {
        console.log("Getting all friends' posts for ", this.username)

        const q = query(collection(db, 'posts'), 
                        where("author", "in", this.friends), 
                        orderBy("creationTime", "desc"));
        const qSnapshot = await getDocs(q)
        const feedData = []
        qSnapshot.forEach( (doc) => {
            feedData.push(doc.id)
        })
        return feedData;
    }

    async getPersonalFeed() {
        console.log("Getting personal feed for ", this.username)

        const q = query(collection(db, 'posts'), 
                        where("author", "==", this.username), 
                        orderBy("creationTime", "desc"));
        const qSnapshot = await getDocs(q)
        const feedData = []
        qSnapshot.forEach( (doc) => {
            feedData.push(doc.id)
        })
        return feedData;
    }
}