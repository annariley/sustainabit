import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useFonts, NanumMyeongjo_700Bold } from '@expo-google-fonts/nanum-myeongjo';
import Home from "./Pages/Home";
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import Post from './Components/Post';

export default function App() {
  const isLoggedIn = true; // Replace with your authentication logic

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

  // Dummy data for posts
  const posts = [
    { id: '1', name: "Rynn", title: 'Post 1', profileIcon: require('./assets/rynn.jpeg') },
    { id: '2', name: "Rynn", title: 'Post 2', profileIcon: require('./assets/rynn.jpeg') },
    { id: '3', name: "Rynn", title: 'Post 3', profileIcon: require('./assets/rynn.jpeg') },
    // Add more posts as needed
  ];
  if (!isLoggedIn){
    return (
      <View style={styles.containerHome}>
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
      <View style={styles.container}>
  
        {/* Search, settings, and notifications buttons */}
        <Header title='Home'/>
        {/* List of posts */}

        <ScrollView style={styles.scrollView}>
          {/* Render the list of ProfilePreview components */}
          {posts.map(({ id, name, title, profileIcon }) => (
          <Post key={id} name={name} title={title} profilePic={profileIcon} />
        ))}
        </ScrollView>
        {/* Navigation bar */}
        <NavBar />
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
  containerHome: {
    flex: 1,
    backgroundColor: '#7BC47F', // Earthly green thumb color
    padding: 10,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4A7D6B', // Green thumb color
    paddingVertical: 10,
    marginBottom: 10,
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  navText: {
    fontFamily: 'NanumMyeongjo',
    color: 'white',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerButton: {
    padding: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postTitle: {
    flex: 1,
    fontSize: 16,
  },
  postActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
});