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
  createNewUser("Anna", "Riley", "ajriley", "pass", "ajr@yeet.com")
  for(let i = 0; i < 5; i++){
    createNewCommuteActivity("iainwcop", "bike", 10, "tmpref", 1, 100);
    createNewPost("iainwcop", 0, "activities/tempIain", "Iain post #" + i, 0);
    createNewCommuteActivity("mikan.soccer", "bike", 20, "tmpref", 1, 100);
    createNewPost("mikan.soccer", 0, "activities/tempKiko", "Kiko post #" + i, 0);
  }
  const anna = new user("ajriley")
  anna.addFriend("iainwcop")
  anna.addFriend("mikan.soccer")
  await anna.update()
  console.log("User Friends: ", anna.friends)
  const feed = await anna.getFeed(10)
  console.log("User Feed: ", feed)
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
