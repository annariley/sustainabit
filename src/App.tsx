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
import Search from './Pages/Search';
import Notifications from './Pages/Notifications';
import * as Font from 'expo-font';
import { user } from './firebase/user';
import AppContext from './Components/AppContext';

const CUR_USER = "iaincopland"

// const fetchFonts = () => {
//   return Font.loadAsync({
//     // The key is the name you'll use in your styles. The value is the path to the font file.
//     'NanumMyeongjo-Regular': require('./assets/fonts/NanumMyeongjo-Regular.ttf'),
//   });
// };

const Stack = createStackNavigator();

export default function App() {
  const [curUser, setCurUser] = useState(new user(CUR_USER))

  useEffect(() => {
    //fetchFonts(); // Load fonts when the app starts
  }, []);


  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  return (
    <AppContext.Provider value = {{currentUser : [curUser, setCurUser]}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
          <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}  />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
          <Stack.Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }}  />
          <Stack.Screen name="TrackActivity" component={Track} options={{ headerShown: false }}  />
          <Stack.Screen name="ComingSoon" component={ComingSoon} options={{ headerShown: false }}  />
          <Stack.Screen name="Personal" component={Profile} options={{ headerShown: false }}  />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}  />
          <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};