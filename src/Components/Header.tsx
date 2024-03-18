// Header.tsx
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import colours from '../assets/constants/colours';
import { user, createNewUser } from '../firebase/user';
import { createNewCommuteActivity } from '../firebase/activity';

interface HeaderProps {
  title: string;
}
function handle(){
  
}

class Header extends Component<HeaderProps> {
  render() {
    const { title } = this.props;

    return (
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => handle()}>
          <Image source={require('../assets/search.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Image source={require('../assets/gears.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Image source={require('../assets/bell.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: 'white',
    },
    headerButton: {
      padding: 10,
    },
    headerIcon: {
      width: 30,
      height: 30,
    },
    headerTitleContainer: {
      flex: 1,
      alignItems: 'center',
      marginLeft: '12%'
    },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#415A50'
  },
});

export default Header;
