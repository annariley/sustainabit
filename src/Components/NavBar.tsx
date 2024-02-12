// NavBar.js
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';

interface NavBarProps {}

interface NavBarState {
  activeButton: string | null;
}

class NavBar extends Component<NavBarProps, NavBarState>  {
  constructor(props: NavBarProps) {
    super(props);
    this.state = {
      activeButton: null,
    };
  }

  handlePress = (button: string) => {
    this.setState((prevState) => ({
      activeButton: prevState.activeButton === button ? null : button,
    }));
  };
  render() {
    const { activeButton } = this.state;
    return (
      <SafeAreaView style={styles.navigationBar}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navButton, activeButton === 'home' && styles.activeButton]}
          onPress={() => this.handlePress('home')}
        >
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.navButton, activeButton === 'leaderboards' && styles.activeButton]}
            onPress={() => this.handlePress('leaderboards')}
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
            style={[styles.navButton, activeButton === 'comingsoon' && styles.activeButton]}
            onPress={() => this.handlePress('comingsoon')}
          >
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Coming Soon</Text>
        </TouchableOpacity></View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity           
            style={[styles.navButton, activeButton === 'personal' && styles.activeButton]}
            onPress={() => this.handlePress('personal')}
          >
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Personal</Text>
        </TouchableOpacity></View>
      </SafeAreaView>
    );
  }
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
    fontFamily: 'NanumMyeongjo',
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
