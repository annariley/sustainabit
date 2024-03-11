// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Leaderboard from './Pages/Leaderboard';
import Track from './Pages/Track';
import ComingSoon from './Pages/ComingSoon';
import Profile from './Pages/Profile';
import * as Font from 'expo-font';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCY_0yMY9ebb5ITeIjyRCY8F2cHEyXy17I',
  authDomain: 'sustainabit-ec733.firebaseapp.com',
  databaseUrl: 'https://sustainabit-ec733.firebaseio.com',
  projectId: 'sustainabit-ec733',
  storageBucket: 'sustainabit-ec733.appspot.com',
}

const loadFonts = async () => {
  await Font.loadAsync({
    'NanumMyeongjo-Regular': require('./assets/fonts/NanumMyeongjo-Regular.ttf'),
    // Add more font weights if necessary
  });
};

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    loadFonts(); // Load fonts when the app starts
    //const fbapp = initializeApp(firebaseConfig);
    //const db = getFirestore(fbapp);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
        <Stack.Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }}  />
        <Stack.Screen name="TrackActivity" component={Track} options={{ headerShown: false }}  />
        <Stack.Screen name="ComingSoon" component={ComingSoon} options={{ headerShown: false }}  />
        <Stack.Screen name="Personal" component={Profile} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};