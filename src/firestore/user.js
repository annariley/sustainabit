/*import firestore from '@react-native-firebase/firestore'

/*
User
*/
/*
export class UserDoc {
    constructor(userDocID) {
      this.userDoc = getUser(userDocID);
      this.firstName = documentSnapshot.get('first_name');
      this.lastName = documentSnapshot.get('last_name');
      this.username = documentSnapshot.get('username');
      this.email = documentSnapshot.get('email');
      this.password = documentSnapshot.get('password');
      this.creationTime = documentSnapshot.get('creation_time');
      this.friends = this.userDoc.collection('friends').get();
    }

    getUser(userdocid) {
      return firestore()
      .collection('users')
      .doc(user)
      .get();
    }

    addFriend(){
      this.userDoc
      .collection('friends')
      .add({
        user: friend
      })
      .then(() => {
        console.log(`Added ${friend} to ${user}'s friends`);
      });
    }

    removeFriend(){
      this.userDoc
      .collection('friends')
      .doc(friend)
      .delete()
      .tent(() => {
        console.log(`Removed ${friend} from ${user}'s friends`)
      })
    }
}

export function createNewUser(
  firstName,
  lastName,
  username,
  password,
  email
) {
  firestore()
  .collection('users')
  .add({
    first_name: firstName,
    last_name: lastName,
    username: username,
    password: password,
    email: email,

    carbon_baseline: 1,
    carbon_reduction: 1,
    creation_time: "1",
    profile_picture: "tmp",
    uid: "tmp"
  })
  .then(() => {
    console.log("USER ADDED")
  })
}

*/