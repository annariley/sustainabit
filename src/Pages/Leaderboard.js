import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Leaderboard = ({navigation}) => {
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
      { id: '1' },
    ];
  return (
    <View style={styles.container}>
        <View style={styles.container}>
          <Header title="Leaderboard" />
          <View style={styles.friendsContainer}>
            <Text style={styles.friendsText}>Friends</Text>
          </View>
          <View style={styles.pointContainer}>
            <View style={{width:80, marginHorizontal:20, marginVertical:18}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#415A50'}}>Your score this month</Text>
            </View>
            <View style={styles.pointBackground}>
              <Text style={styles.pointText}>786,675</Text>
            </View>
          </View>
          {/* <View style={styles.sustainerContainer}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#415A50'}}>Sustainer</Text>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#415A50'}}>Current Score</Text>
          </View> */}
          <View style={{height:495}}>
            <FlatList
              data={posts}
              renderItem={()=> {<Text>Leaderboard Page</Text>}}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.scrollView}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>

          <NavBar navigation={navigation} current={'Leaderboard'}/>
        </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
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
  friendsContainer: {
    borderWidth: 1,
    width:'100%',
    height:35,
    borderColor: '#415A50',
    alignItems:'center',
    backgroundColor:'white'
  },  
  sustainerContainer: {
    flex:1,
    flexDirection:'row',
    borderWidth: 1,
    width:'100%',
    height:30,
    marginVertical:30,
    borderColor: '#415A50',
    justifyContent:'space-around',
  },
  friendsText:{
    fontSize: 16,
    color: '#415A50',
    marginTop:8
  },
  pointText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#415A50',
    padding: 10,
  },
  pointBackground: {
    backgroundColor: '#E7ECDF',
    borderRadius:20,
    marginVertical:10,
    height:50
  },
  pointContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
  }
});

  

export default Leaderboard;
