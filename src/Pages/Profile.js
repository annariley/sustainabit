import React, { useState, useEffect, componentDidMount, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { user, createNewUser } from '../firebase/user';
import { downloadImage } from '../firebase/storage';
import { post } from '../firebase/post';
import AppContext from '../Components/AppContext';
import { requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({route, navigation}) => {
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing status
  const [posts, setPosts] = useState([])
  const [profUser, setUser] = useState(null)

  useEffect(() => {
    console.log("Fetching data for profile: " + route.params['profileUserId'])
    setRefreshing(true)

    setupUser().then((cur_user) => {
      getUserFeed(cur_user).then(() => {
        setRefreshing(false)
      })
    })
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getUserFeed(profUser).then(() => {
      setRefreshing(false)
    })
    // Simulate loading data for 2 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  async function setupUser(){
    console.log("Setting up user...")

    const username = route.params['profileUserId']
    new_user = new user(username)
    await new_user.sync()
    setUser(new_user)

    return new_user
  }

  async function getUserFeed(cur_user) {

    console.log("Getting Feed...")

    await cur_user.sync()
    
    const load_posts = await cur_user.getPersonalFeed()
  
    setPosts(load_posts)
  }

  
  function formatTime(timestamp) {
    const { seconds, nanoseconds } = timestamp;
    // Create a Date object using the seconds (multiplied by 1000 to convert to milliseconds)
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    
    // Convert to a local date string
    const dateString = date.toLocaleDateString("en-US"); // Adjust the locale as needed
    const timeString = date.toLocaleTimeString("en-US"); // Adjust the locale as needed
    
    // Combine date and time for full timestamp in local string format
    const fullDateTimeString = `${dateString} ${timeString}`;
    
    return fullDateTimeString;
  }

  function addFriend() {

  }
  
  if (profUser == null){
    return (
      <View style={styles.container}>
          <Header navigation={navigation} current={'Personal'} title={"Personal"} />
          <View style={styles.containerHeading}>
            <Image source={require('../assets/willow.png')} style={styles.profilePhoto} />
            <Text style={styles.title}>Loading...</Text>
            <Text style={styles.text}>Loading...</Text>
            <View style={styles.pointBackground}>
              <Text style={styles.pointText}>{"Loading..."}</Text>
            </View>
          </View>
          <View style={styles.headingContainer2}>
            <View style={styles.headingContainer3}>
              <Text style={styles.title}>Friends</Text>
              <Text style={styles.text}>{"Loading..."}</Text>
            </View>
            <View style={styles.headingContainer3}>
              <Text style={styles.title}>Activities</Text>
              <Text style={styles.text}>{"Loading..."}</Text>
            </View>
            <View style={styles.headingContainer3}>
              <Image source={require('../assets/carbonreduced.png')} style={styles.profilePhoto} />
            </View>
          </View>
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity onPress={addFriend}>
              <View style={styles.friendBackground}>
                <Text style={styles.friendText}>Add Friend</Text>
                <Icon name="account-plus" size={20} color="#E7ECDF" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.flatListContainer}>
            <View style={styles.activityHeaderContainer}>
              <Text style={styles.title}>Recent Activities</Text>
            </View>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <Post name={"Loading"} title={"Loading"} time={"Loading"} profilePic={"Loading"} likes={"Loading"} comments={"Loading"} />
              )}
              contentContainerStyle={styles.scrollView}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>
          <NavBar navigation={navigation} current={'Personal'}/>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
          <Header navigation={navigation} current={'Personal'} title={"Personal"} />
          <View style={styles.containerHeading}>
            <Image source={{uri:profUser.profilePic}} style={styles.profilePhoto} />
            <Text style={styles.title}>{profUser.firstName} {profUser.lastName} ({profUser.username})</Text>
            <Text style={styles.text}>{profUser.location}</Text>
            <View style={styles.pointBackground}>
              <Text style={styles.pointText}>{profUser.score}</Text>
            </View>
          </View>
          <View style={styles.headingContainer2}>
            <View style={styles.headingContainer3}>
              <Text style={styles.title}>Friends</Text>
              <Text style={styles.text}>{profUser.friends.length}</Text>
            </View>
            <View style={styles.headingContainer3}>
              <Text style={styles.title}>Activity</Text>
              <Text style={styles.text}>{profUser.numPosts}</Text>
            </View>
            <View style={styles.headingContainer3}>
            <Image source={require('../assets/carbonreduced.png')} style={styles.profilePhoto} />
            </View>
          </View>
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity onPress={addFriend}>
              <View style={styles.friendBackground}>
                <Text style={styles.friendText}>Add Friend</Text>
                <Icon name="account-plus" size={20} color="#E7ECDF" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.flatListContainer}>
            <View style={styles.activityHeaderContainer}>
              <Text style={styles.title}>Recent Activities</Text>
            </View>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <Post name={item['name']} title={item['title']}  time={formatTime(item['time'])} profilePic={profUser.profilePic} likes={item['likes']} comments={item['comments']} />
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
  }
  
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
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#415A50',
    marginTop:5
  },
  pointText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#415A50',
    padding: 10
  },
  pointBackground: {
    backgroundColor: '#E7ECDF',
    borderRadius:20,
    marginTop:10
  },
  friendText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E7ECDF',
    padding: 10
  },
  friendBackground: {
    backgroundColor: '#415A50',
    borderRadius:20,
    marginBottom:20,
    width:168,
    alignItems:'center', 
    justifyContent:'center',
    flexDirection:'row'
  },
  text: {
    fontSize: 15,
    color: '#415A50',
  },
  headingContainer2:{
    flexDirection:'row'
  },
  headingContainer3:{
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center'
  },
  flatListContainer:{
    height:320,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
    backgroundColor: '#415A50',
  },
  activityHeaderContainer: {
    borderWidth: 1,
    width:'100%',
    borderColor: '#415A50',
    alignItems:'center',
    height:32
  }
});

export default Profile;