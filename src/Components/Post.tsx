import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
interface PostProps {
    name: string;
    title: string;
    profilePic: any;
  }
class Post extends Component<PostProps> {
  render() {
    const { name, title, profilePic } = this.props;
    return (
        <View style={styles.postContainer}>
            <View style={styles.headerContainer}>
                <Image source={profilePic} style={styles.profileIcon} />
                <Text style={styles.postTitle}>{name}</Text>
                <Text style={styles.postTitle}>{title}</Text>
                <View style={styles.postActions}>
                    <TouchableOpacity>
                        <Image source={require('../assets/home_icon.png')} style={styles.actionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/home_icon.png')} style={styles.actionIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    width: '105%',
    justifyContent: 'space-around', 
    marginLeft: '-2.5%',
    height: 150,
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
  },
  postActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Post;
