import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { user, createNewUser } from '../firebase/user';
import { downloadImage } from '../firebase/storage';
import { post } from '../firebase/post';
import AppContext from '../Components/AppContext';


const Profile = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing status
  const [posts, setPosts] = useState([])
  const cur_user = useContext(AppContext)

  const onRefresh = () => {
    setRefreshing(true);
    getMyFeed();
    // Simulate loading data for 2 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  async function getMyFeed() {
    await cur_user.sync()
    
    const postIDs = await cur_user.getPersonalFeed()
    let posts = []
    postIDs.forEach( async (next_post_id) => {
      let next_post = new post(next_post_id)
      await next_post.sync()
      let author = new user(next_post.author)
      await author.sync()
      posts.push([next_post, author])
    })

    console.log("POSTS: ", posts)
  
    setPosts(posts)
  }

  return (
    <View style={styles.container}>
        <Header title="Personal" />
        <View style={styles.containerHeading}>
            <Image source={{uri:cur_user.profilePic}} style={styles.profilePhoto} />
            <Text style={styles.title}>{cur_user.firstName} {cur_user.lastName} ({cur_user.username})</Text>
            <Text style={styles.text}>{cur_user.location}</Text>
            <View style={styles.pointBackground}>
              <Text style={styles.pointText}>{cur_user.score}</Text>
            </View>
        </View>
        <View style={styles.headingContainer2}>
          <View style={styles.headingContainer3}>
            <Text style={styles.title}>Friends</Text>
            <Text style={styles.text}>{cur_user.friends.length}</Text>
            <Text style={styles.title}>Activity</Text>
            <Text style={styles.text}>{cur_user.numPosts}</Text>
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
              <Post name={item[1].username} title={item[0].title} profilePic={item[1].profilePic} likes={item[0].likes} comments={item[0].comments} />
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
