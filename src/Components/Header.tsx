// Header.tsx
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import colours from '../assets/constants/colours';
import { user, createNewUser } from '../firebase/users';
import { createNewPost } from '../firebase/posts';
import { createNewCommuteActivity } from '../firebase/activities';

interface HeaderProps {
  title: string;
}
async function handle() {
  create();
}
async function create() {
  for(let i = 0; i < 3; i++){
    createNewCommuteActivity("iaincopland", "bike", 10, "tmpref", 1, 100);
    createNewPost("iaincopland", 0, "activities/tempIain", "Iain biked to work!", 0);
    createNewCommuteActivity("sikaparadis", "bike", 20, "tmpref", 1, 100);
    createNewPost("sikaparadis", 0, "activities/tempKiko", "Sika biked to work!", 0);
    createNewCommuteActivity("joelcheney", "bus", 20, "tmpref", 1, 100);
    createNewPost("joelcheney", 0, "activities/tempKiko", "Joel took the bus!", 0);
    createNewCommuteActivity("rynnzhang", "bike", 20, "tmpref", 1, 100);
    createNewPost("rynnzhang", 0, "activities/tempKiko", "Rynn biked to work!", 0);
  }
}
async function setup() {
  createNewUser("Anna", "Riley", "annariley", "password", "annariley@sustainabit.ca");
  createNewUser("Iain", "Copland", "iaincopland", "password", "iaincopland@sustainabit.ca");
  createNewUser("Joel", "Cheney", "joelcheney", "password", "joelcheney@sustainabit.ca");
  createNewUser("Sika", "Paradis", "sikaparadis", "password", "sikaparadis@sustainabit.ca");
  createNewUser("Rynn", "Zhang", "rynnzhang", "password", "rynnzhang@sustainabit.ca");

  const anna = new user("annariley")
  anna.addFriend("iaincopland")
  anna.addFriend("joelcheney")
  anna.addFriend("rynnzhang")
  anna.addFriend("sikaparadis")

  await anna.update()

  console.log("User Friends: ", anna.friends)
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
