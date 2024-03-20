import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { user, createNewUser } from '../firebase/users';
import { downloadImage } from '../firebase/storage';

const Profile = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing status
  const [posts, setPosts] = useState([])


  const onRefresh = () => {
    setRefreshing(true);
    getMyFeed();
    // Simulate loading data for 2 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  async function getMyFeed() {
    const numPosts = 10
    const anna = new user("annariley")
    await anna.update()
    
    const feed = await anna.getFeed(10)
    for (let i = 0; i < numPosts; i++){
      posts[i] = {
        id: i.toString(),
        name: feed[i]['author'],
        title: feed[i]['title'],
        profileIcon: await downloadImage(`/images/profile_pics/${feed[i]['author']}.png`),
        likes: feed[i]['likes'],
        comments: 0
      }
      console.log("NEW POST: ", posts[i])
    }
    setPosts(posts)
  }
    // Dummy data for posts
    const posts2 = [
      { id: '1' },
    ];
  return (
    <View style={styles.container}>
        <Header title="Personal" />
        <View style={styles.containerHeading}>
            <Image source={require('../assets/rynn.jpeg')} style={styles.profilePhoto} />
            <Text style={styles.title}>Rynn Zhang (rynnzhang)</Text>
            <Text style={styles.text}>Vancouver, BC</Text>
            <View style={styles.pointBackground}>
              <Text style={styles.pointText}>788,765</Text>
            </View>
        </View>
        <View style={styles.headingContainer2}>
          <View style={styles.headingContainer3}>
            <Text style={styles.title}>Friends</Text>
            <Text style={styles.text}>86</Text>
            <Text style={styles.title}>Activity</Text>
            <Text style={styles.text}>78</Text>
          </View>
          <View style={styles.headingContainer3}>
          <Image source={require('../assets/carbonreduced.png')} style={styles.profilePhoto} />
          </View>
        </View>
        <View style={styles.flatListContainer}>

          <Text style={styles.title}>Recent Activities</Text>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Post name={item.name} title={item.title} profilePic={item.profileIcon} likes={item.likes} comments={item.comments} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollView}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
        <NavBar navigation={navigation} current={'Personal'}/>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerHeading: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },  
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#415A50',
    marginVertical:10
  },
  pointText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#415A50',
    padding: 10
  },
  pointBackground: {
    backgroundColor: '#E7ECDF',
    borderRadius:20,
    marginVertical:10
  },
  text: {
    fontSize: 14,
    color: '#415A50',
  },
  headingContainer2:{
    flex:1,
    flexDirection:'row'
  },
  headingContainer3:{
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center'
  },
  flatListContainer:{
    height:250,
    alignItems:'center'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  buttonText: {
    color: '#F8F1D5',
    fontFamily: 'NanumMyeongjo-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
});

  

export default Profile;
