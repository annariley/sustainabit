import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.text}>Welcome to Sustain-a-bit Home Feed!!!</Text>
      {/* Add your home feed components here */}
    </View>
  );
};


const styles = StyleSheet.create({
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
  

export default Home;
