import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import AppContext from '../Components/AppContext';
import { auth, provider } from '../firebase/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { getUsernamefromUID, user, createNewUser } from '../firebase/user';


const Login = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing status
  const { currentUser } = useContext(AppContext)
  const [curUser, setCurUser] = currentUser

  useEffect(() => {
    const email = "purang@gmail.com"
    const password = "password"
    const firstName = "Purang"
    const lastName = "Abolmaesumi"
    const username = "purangabolmaesumi"
    const location = "Montreal, QC"
    //create(email, password, firstName, lastName, username, location)
    login(email, password)
  }, []);

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const sign_user = userCredential.user;
        getUsernamefromUID(sign_user['uid'])
          .then((username) => {
            const new_user = new user(username)
            setCurUser(new_user)
            navigation.navigate('Home')
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function create(email, password, firstName, lastName, username, location){
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("Created Auth for ", userCredential)
        const sign_user = userCredential.user;
        const uid = sign_user['uid']
        console.log(uid)
        console.log(firstName)
        createNewUser(uid, firstName, lastName, username, password, email, location, 'tmp').then(() => {
          console.log("Created new user: ", username)
          const new_user = new user(username)
          setCurUser(new_user)
          navigation.navigate('Home')
        })
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate loading data for 2 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
    // Dummy data for posts
    const posts = [
      { id: '1' },
    ];
  return (
    <View style={styles.container}>
        <View style={styles.container}>
          <Header navigation={navigation} current={'Login'} title={"Login"} />
          <FlatList
            data={posts}
            renderItem={()=> {<Text>Login Page</Text>}}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollView}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          <NavBar navigation={navigation} current={'Login'}/>
        </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415A50',
  },
  containerHome: {
    flex: 1,
    backgroundColor: '#415A50',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    //fontFamily: 'NanumMyeongjo-Regular',
    fontWeight: 'bold',
    color: '#F8F1D5',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    //fontFamily: 'NanumMyeongjo-Regular',
    color: '#F8F1D5',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#C8A160',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#F8F1D5',
    //fontFamily: 'NanumMyeongjo-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 1,
  },
});

  

export default Login;
