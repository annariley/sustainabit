
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { user, createNewUser } from '../firebase/user';
import { downloadImage } from '../firebase/storage';
import { useContext } from 'react';
import AppContext from '../Components/AppContext';
import { post } from '../firebase/post';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing status
  const [posts, setPosts] = useState([])
  const cur_user = useContext(AppContext)

  useEffect(() => {
    setRefreshing(true)
    getRecentFeed().then(() => {
      setRefreshing(false)
    })
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate loading data for 2 seconds
    getRecentFeed().then(() => {
      setRefreshing(false)
    })
    setTimeout(() => {
      setRefreshing(false);
    }, 5000)
  };

  async function getRecentFeed() {
    await cur_user.sync()
    
    const postIDs = await cur_user.getFriendsFeed();
    console.log("POST IDs: ", postIDs)
    let posts = []
    let i = 0
    postIDs.forEach( async (next_post_id) => {
      console.log(i)
      i = i+1
      let next_post = new post(next_post_id)
      await next_post.sync()
      let author = new user(next_post.author)
      await author.sync()
      posts.push([next_post, author])
    })
  
    setPosts(posts)
  }
  return (
    <View style={styles.container}>
        <View style={styles.container}>
          <Header navigation={navigation} current={'Home'} title={"Home"} />
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Post name={item[1].username} title={item[0].title} profilePic={item[1].profilePic} likes={item[0].likes} comments={item[0].comments} />
            )}
            keyExtractor={(item) => item[0].id}
            contentContainerStyle={styles.scrollView}
            refreshing={refreshing}
            onRefresh={this.props}
          />
          <NavBar navigation={navigation} current={'Home'}/>
        </View>
    </View>
  );
}
  

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415A50',
  },
  containerHome: {
    flex: 1,
    backgroundColor: '#415A50',
    padding: 10,
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
    fontFamily: 'NanumMyeongjo-Regular',
    fontWeight: 'bold',
    color: '#F8F1D5',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'NanumMyeongjo-Regular',
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
    fontFamily: 'NanumMyeongjo-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 1,
  },
});

  

export default Home;
