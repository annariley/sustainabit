import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colours from '../assets/constants/colours';
interface ProfileProps {
    id: any;
    name: string;
    points: any;
    profilePic: any;
    displayPoints: any;
  }
class ProfilePreview extends Component<ProfileProps> {
  render() {
    const { id, name, points, profilePic, displayPoints } = this.props;
    return (
        <View style={styles.postContainer}>
            <View style={styles.headerContainer}>
                <Image source={{uri:profilePic}} style={styles.profileIcon} />
                <Text style={styles.postTitle}>{name}</Text>
              {
              displayPoints ? 
              <View style={styles.pointBackground}>
                <Text style={styles.pointText}>{points}</Text>
              </View>
              :
              <View></View>
              }
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
  pointBackground: {
    backgroundColor: '#E7ECDF',
    borderRadius:20,
    marginVertical:10,
    marginRight:30,
    height:35,
    alignItems:'center',
    justifyContent: 'flex-end'
  },
  pointText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#415A50',
    padding: 10,
  },
});

export default ProfilePreview;
