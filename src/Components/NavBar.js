import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import colours from '../assets/constants/colours';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function NavBar({ navigation, current }){
  function handlePress(button) {
    navigation.navigate(button);
  }

  return (
    <SafeAreaView style={styles.navigationBar}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navButton, current === 'Home' && styles.activeButton]}
          onPress={() => handlePress('Home')}
        >
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.navButton, current === 'Leaderboard' && styles.activeButton]}
            onPress={() => handlePress('Leaderboard')}
          >
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Leaderboards</Text>
        </TouchableOpacity></View>
        <View style={styles.bigbuttonContainer}>
        <TouchableOpacity           
            style={styles.trackButton}>
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Track Activity</Text>
        </TouchableOpacity></View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.navButton, current === 'ComingSoon' && styles.activeButton]}
            onPress={() => handlePress('ComingSoon')}
          >
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Coming Soon</Text>
        </TouchableOpacity></View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity           
            style={[styles.navButton, current === 'Personal' && styles.activeButton]}
            onPress={() => handlePress('Personal')}
          >
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Personal</Text>
        </TouchableOpacity></View>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navigationBar: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around', // Spread items horizontally
    alignItems: 'center',
    width: '100%',
  },
  navButton: {
    marginTop: '2%',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    width:'19%',
  },
  bigbuttonContainer: {
    alignItems: 'center',
    width:'24%'
  },
  activeButton: {
    backgroundColor: '#cad7cc', // Active button color
    borderRadius: 5,
    width:'88%'
  },
  trackButton: {
    marginTop: '2%',
    alignItems: 'center',
    marginHorizontal:20,
  },
  navIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    marginTop: 5,
  },
  navText: {
    color: '#415A50',
    fontFamily: 'NanumMyeongjo-Regular',
    fontSize: 11,
    marginBottom: 5,
  },
  activeText: {
    color: 'black', // Change the text color when button is active
    fontSize: 6,
    marginBottom: 5,
  },
});
export default NavBar;