import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colours from '../assets/constants/colours';

function ProfilePreview({ route, navigation, id, name, points, profilePic, displayPoints }) {
  const handlePress = () => {
    navigation.navigate('Personal', {profileUserId: id})
  };

  return (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.headerContainer}>
          <Image source={{ uri: profilePic }} style={styles.profileIcon} />
          <Text style={styles.postTitle}>{name}</Text>
          {displayPoints ? (
            <View style={styles.pointBackground}>
              <Text style={styles.pointText}>{points}</Text>
            </View>
          ) : (
            <View></View>
          )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    width: '105%',
    justifyContent: 'space-around',
    marginLeft: '-2.5%',
    height: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#415A50',
  },
  pointBackground: {
    backgroundColor: '#E7ECDF',
    borderRadius: 20,
    marginVertical: 10,
    marginRight: 30,
    height: 35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pointText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#415A50',
    padding: 10,
  },
});

export default ProfilePreview;
