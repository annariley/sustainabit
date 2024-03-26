import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useFocusEffect } from 'react-native';
import colours from '../assets/constants/colours';
import { useContext } from 'react';
import AppContext from '../Components/AppContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Notification({ route, navigation, id, name, profilePic }) {
  const [refreshing, setRefreshing] = useState(false)
  const [pendingRequests, setPendingRequests] = useState([])

  

  const handlePress = () => {
    navigation.navigate('Personal', {profileUserId: id})
  };

  const handleDeny = () => {
    curUser.denyFriend()
  }

  const handleAccept = () => {

  }

  return (
    <View style={styles.postContainer}>
      <View style={styles.headerContainer}>
          <Image source={{ uri: profilePic }} style={styles.profileIcon} />
          <Text style={styles.postTitle}>{name}</Text>
          <View style={{justifyContent:'flex-end', flexDirection:'row', width:250, marginRight:10}}>
            <TouchableOpacity style={styles.denyBackground}>
                <Text style={{color: '#50692D'}}>Deny</Text>
                <Icon name="account-remove" size={20} color="#50692D" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBackground}>
                <Text style={{color: '#50692D'}}>Accept</Text>
                <Icon name="account-check" size={20} color="#50692D" />
            </TouchableOpacity>
          </View>
      </View>
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
  postContainerCurUser: {
    backgroundColor: '#bad1c8'
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
  denyBackground: {
    backgroundColor: '#d1c5c2',
    borderRadius: 20,
    marginVertical: 10,
    marginRight: 15,
    height: 35,
    width:80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  acceptBackground: {
    backgroundColor: '#E7ECDF',
    borderRadius: 20,
    marginVertical: 10,
    marginRight: 15,
    height: 35,
    width:80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  pointText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#415A50',
    padding: 10,
  },
});

export default Notification;
