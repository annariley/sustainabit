
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing status


  const onRefresh = () => {
    setRefreshing(true);
    // Simulate loading data for 2 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
    // Dummy data for posts
    const posts = [
      { id: '1', name: "Rynn", title: 'Post 1', profileIcon: require('../assets/rynn.jpeg') },
      { id: '2', name: "Rynn", title: 'Post 2', profileIcon: require('../assets/rynn.jpeg') },
      { id: '3', name: "Rynn", title: 'Post 3', profileIcon: require('../assets/rynn.jpeg') },
      { id: '4', name: "Rynn", title: 'Post 4', profileIcon: require('../assets/rynn.jpeg') },
      { id: '5', name: "Rynn", title: 'Post 5', profileIcon: require('../assets/rynn.jpeg') },
      { id: '6', name: "Rynn", title: 'Post 6', profileIcon: require('../assets/rynn.jpeg') },
      { id: '7', name: "Rynn", title: 'Post 7', profileIcon: require('../assets/rynn.jpeg') },
      { id: '8', name: "Rynn", title: 'Post 8', profileIcon: require('../assets/rynn.jpeg') },
      { id: '9', name: "Rynn", title: 'Post 9', profileIcon: require('../assets/rynn.jpeg') },
      { id: '10', name: "Rynn", title: 'Post 10', profileIcon: require('../assets/rynn.jpeg') },
      { id: '11', name: "Rynn", title: 'Post 11', profileIcon: require('../assets/rynn.jpeg') },
      { id: '12', name: "Rynn", title: 'Post 12', profileIcon: require('../assets/rynn.jpeg') },
      // Add more posts as needed
    ];
  return (
    <View style={styles.container}>
        <View style={styles.container}>
          <Header title="Home" />
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Post name={item.name} title={item.title} profilePic={item.profileIcon} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollView}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          <NavBar navigation={navigation} current={'Home'}/>
        </View>
    </View>
  );
};



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
