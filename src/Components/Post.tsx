import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colours from '../assets/constants/colours';
interface PostProps {
    name: string;
    title: string;
    time: string;
    profilePic: any;
    likes: any;
    comments: any;
  }
class Post extends Component<PostProps> {
  render() {
    const { name, title, time,  profilePic, likes, comments } = this.props;
    return (
        <View style={styles.postContainer}>
            <View style={styles.headerContainer}>
                <Image source={{uri:profilePic}} style={styles.profileIcon} />
                <View style={{flex:1,flexDirection:'column'}}>
                  <Text style={styles.postText}>{time}</Text>
                  <Text style={styles.postTitle}>{name}</Text>
                </View>
                <Text style={styles.postTitle}>{title}</Text>
            </View>
            <View style={styles.postActions}>
                <View style={styles.likeContainer}>
                  <TouchableOpacity>
                    <View>
                      <Image source={require('../assets/likeleaf.png')} style={styles.actionIcon} />
                      <Text style={styles.postText}>{likes}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.commentContainer}>
                  <TouchableOpacity>
                    <View>
                      <Image source={require('../assets/comment.png')} style={styles.actionIcon} />
                      <Text style={styles.postText}>{comments}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    );
  }
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
    color: '#415A50',
  },
  postText: {
    fontSize: 10,
    flex: 1,
    color: '#415A50',
  },
  postActions: {
    flexDirection: 'row',
    height:'25%',
    marginBottom:'-7%',
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    width:'50%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    width:'50%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Post;
