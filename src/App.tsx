import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFonts, NanumMyeongjo_700Bold } from '@expo-google-fonts/nanum-myeongjo';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function App() {
  GoogleSignin.configure();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your authentication logic
  const [currentUser, setCurrentUser] = useState({})

  const handleLoginWithGoogle = async () => {
    console.log('Login with Google clicked');
    // Google login & authentication
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setCurrentUser({ userInfo, error: undefined });
      setIsLoggedIn(true)
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // user cancelled the login flow
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // play services not available or outdated
          break;
        default:
        // some other error happened
      }
    };
  };

  const [fontsLoaded] = useFonts({
    NanumMyeongjo: NanumMyeongjo_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/fern.png')} // Replace with the path to your app logo
        style={styles.logo}
      />
      <Text style={styles.title}>Sustain-A-Bit</Text>

      {!isLoggedIn ? (
        <TouchableOpacity onPress={handleLoginWithGoogle} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.homeContainer}>
          <Text style={styles.text}>Welcome to Sustain-a-bit Home Feed!</Text>
          {/* Add your home feed components here */}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415A50', // Original background color
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
    fontFamily: 'NanumMyeongjo', // Use Nanum Myeongjo font
    fontWeight: 'bold',
    color: '#F8F1D5',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'NanumMyeongjo', // Use Nanum Myeongjo font
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
    fontFamily: 'NanumMyeongjo',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  homeContainer: {
    alignItems: 'center',
  },
});
