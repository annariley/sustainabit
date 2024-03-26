import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { getUsernamefromUID, user, createNewUser } from '../firebase/user';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [reference, setReference] = useState('');  
  const handleCreateProfile = () => {
    // Handle the profile creation logic
    console.log('Creating profile with the following details:', { name, birthday, city, reference });
    navigation.navigate('Home')
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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoButton}>
        <Icon name="photo-library" size={26} color="#50692D" style={{marginBottom:5}}/>
        <Text style={styles.text} >Add Profile</Text>
        <Text style={styles.text} >Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="your name"
        placeholderTextColor={'#50692D'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setBirthday}
        value={birthday}
        placeholder="your birthday"
        placeholderTextColor={'#50692D'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setCity}
        value={city}
        placeholder="your city"
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
  buttonText: {
    color:'F8F1D5',
  },
});

  

export default Login;
