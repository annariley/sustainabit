import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = ({navigation}) => {
  const { currentUser } = useContext(AppContext)
  const [curUser, setCurUser] = currentUser
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reference, setReference] = useState(''); 

  const handleCreateProfile = () => {
    // Handle the profile creation logic
    console.log('Creating profile with the following details:', { first, last, email, password, reference });
    create(email, password, first, last, username, 'Vancouver')
  };  
  const handleLogIn = () => {
    // Handle the profile creation logic
    console.log('Creating profile with the following details:', { first, last, email, password, reference });
    login(email, password)
  };
  
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
        console.log(error.message)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function create(email, password, firstName, lastName, username, location){
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("post then")
        const sign_user = userCredential.user;
        const uid = sign_user['uid']
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
        console.error(errorMessage)
        // ..
      });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoButton}>
        <Icon name="photo-library" size={26} color="#50692D" style={{marginBottom:5}}/>
        <Text style={styles.text} >Add Profile</Text>
        <Text style={styles.text} >Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setFirst}
        value={first}
        placeholder="first name"
        placeholderTextColor={'#50692D'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setLast}
        value={last}
        placeholder="last name"
        placeholderTextColor={'#50692D'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="your email"
        placeholderTextColor={'#50692D'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="username"
        placeholderTextColor={'#50692D'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        placeholderTextColor={'#50692D'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setReference}
        value={reference}
        placeholder="how did you hear about us?"
        placeholderTextColor={'#50692D'}
      />
      <TouchableOpacity
        onPress={handleCreateProfile}
        style={styles.createProfileButton}
      >
        <Text style={styles.buttonText}>create profile</Text>
      </TouchableOpacity>
      <Text style={styles.smallText}>already have an account?</Text>
      <TouchableOpacity
        onPress={handleLogIn}
        style={styles.logInButton}
      >
        <Text style={styles.buttonText}>log in</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8A160',
    alignItems:'center',
    justifyContent: 'center'
  },
  photoButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'space-around',
    backgroundColor:'#F8F1D5'
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff', // Replace with a color that matches the "Add Profile Photo" circle
  },
  input: {
    height: 40,
    margin: 12,
    borderRadius:8,
    padding: 10,
    width: '80%',
    color:'#50692D',
    backgroundColor: '#F8F1D5', // Input field background color
  },
  text:{
    color:'#50692D',
    fontSize:12
  },
  createProfileButton: {
    backgroundColor: '#50692D', // Match this with your button's background color
    padding: 10,
    borderRadius: 20,
    marginTop: 20
  },
  logInButton: {
    backgroundColor: '#50692D', // Match this with your button's background color
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color:'#F8F1D5',
  },
  smallText: {
    color:'#F8F1D5',
    fontSize:12,
    marginTop:14,
    marginBottom:8
  },
});

  

export default Login;
