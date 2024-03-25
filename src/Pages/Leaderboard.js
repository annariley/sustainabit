import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilePreview from '../Components/ProfilePreview';
import { useContext } from 'react';
import AppContext from '../Components/AppContext';
import { isValidTimestamp } from '@firebase/util';
import { downloadImage } from '../firebase/storage';

const Leaderboard = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing status
  const [leaderboard, setLeaderboard] = useState(null);
  const cur_user = useContext(AppContext)

  useEffect(() => {
    console.log("Fetching data for leaderboard: ")
    setRefreshing(true)

    cur_user.sync().then(() => {
      getMyLeaderboard().then(() =>{
        setRefreshing(false)
      })
    })
  }, []);

  async function getMyLeaderboard() {
    const friendScores = await cur_user.getFriendLeaderboard()
    console.log(friendScores)
    let leaderboard = []
    for (let i = 0; i < friendScores.length; i++) {
      leaderboard.push({
        id: i,
        name: friendScores[i][0],
        points: friendScores[i][1],
        profilePic: await downloadImage(`/images/profile_pics/${friendScores[i][0]}.png`)
      })
    }
    leaderboard.push({
      id: friendScores.length,
      name: cur_user.username,
      points: cur_user.score,
      profilePic: cur_user.profilePic
    })

    leaderboard.sort(function(a,b) {
      var keyA = a.points;
      var keyB = b.points;
      if (keyA < keyB) return 1;
      if (keyB < keyA) return -1;
      return 0;
    })
    console.log("Got leaderboard data: ")
    console.log(leaderboard)
    setLeaderboard(leaderboard)
  }

  const onRefresh = () => {
    setRefreshing(true);
    cur_user.sync().then(() => {
      getMyLeaderboard().then(() =>{
        setRefreshing(false)
      })
    })

    // Simulate loading data for 2 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Header navigation={navigation} current={'Leaderboard'} title={"Leaderboard"} />
          <View style={styles.friendsContainer}>
            <Text style={styles.friendsText}>Friends</Text>
          </View>
          <View style={styles.pointContainer}>
            <View style={{width:80, marginHorizontal:20, marginVertical:18}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#415A50'}}>Your score this month</Text>
            </View>
            <View style={styles.pointBackground}>
              <Text style={styles.pointText}>{cur_user.score}</Text>
            </View>
          </View>
          <View style={{height:35, marginVertical:5}}>
            <View style={styles.sustainerContainer}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#415A50', marginRight:50}}>Sustainer</Text>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#415A50', marginLeft:50}}>Current Score</Text>
            </View>
          </View>
          <View style={{height:495}}>
            <FlatList
              data={leaderboard}
              renderItem={({ item }) => (
                <ProfilePreview navigation={navigation} id={item.id} name={item.name} points={item.points} profilePic={item.profilePic} displayPoints={true} />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.scrollView}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>

          <NavBar navigation={navigation} current={'Leaderboard'}/>
        </View>
    </SafeAreaView>
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
    //fontFamily: 'NanumMyeongjo-Regular',
    fontWeight: 'bold',
    color: '#F8F1D5',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    //fontFamily: 'NanumMyeongjo-Regular',
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
    //fontFamily: 'NanumMyeongjo-Regular',
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
    height:40,
    borderColor: '#415A50',
    justifyContent:'space-around',
    alignItems: 'center'
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
    // flex:1,
    flexDirection:'row',
    justifyContent:'center',
  }
});

  

export default Leaderboard;
