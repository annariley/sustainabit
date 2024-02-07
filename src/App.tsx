import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFonts, NanumMyeongjo_700Bold } from '@expo-google-fonts/nanum-myeongjo';

export default function App() {
  const isLoggedIn = false; // Replace with your authentication logic

  const handleLoginWithGoogle = () => {
    console.log('Login with Google clicked');
    // Implement Google login logic here
  };

  const [fontsLoaded] = useFonts({
    NanumMyeongjo: NanumMyeongjo_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  if (!isLoggedIn){
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/fern.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Sustain-A-Bit</Text>
        <TouchableOpacity onPress={handleLoginWithGoogle} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.homeContainer}>
      <Text style={styles.text}>Welcome to Sustain-a-bit Home Feed!</Text>
      {/* Add your home feed components here */}
    </View>
    );

  }
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
