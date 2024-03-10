// Header.tsx
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import colours from '../assets/constants/colours';
//import { createNewUser } from '../firestore/user'

interface HeaderProps {
  title: string;
}

class Header extends Component<HeaderProps> {
  render() {
    const { title } = this.props;

    return (
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.headerButton}> 
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
