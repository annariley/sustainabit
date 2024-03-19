import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import NavBar from '../Components/NavBar';
import Header from '../Components/Header';
import Post from '../Components/Post';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Profile = ({navigation}) => {
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
          <Header title="Personal" />
          <View style={styles.containerHeading}>
              <Image source={require('../assets/rynn.jpeg')} style={styles.profilePhoto} />
              <Text style={styles.title}>Rynn Zhang (rynnzhang)</Text>
              <Text style={styles.text}>Vancouver, BC</Text>
              <View style={styles.pointBackground}>
                <Text style={styles.pointText}>788,765</Text>
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
          </View>
          <FlatList
            data={posts}
            renderItem={()=> {<Text>Profile Page</Text>}}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollView}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          <NavBar navigation={navigation} current={'Personal'}/>
        </View>
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
  },
  text: {
    fontSize: 14,
    color: '#415A50',
  },
  headingContainer2:{
    flex:1,
    flexDirection:'row',
    height: 100
  },
  headingContainer3:{
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center'
  },
  logo: {
    width: 100,
    height: 100,
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

  

export default Profile;
