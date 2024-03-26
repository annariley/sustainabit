import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Button, SafeAreaView } from 'react-native';
import Notification from '../Components/Notification'; 
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import { searchUsers } from '../firebase/user';
import { downloadImage } from '../firebase/storage';

const Notifications = ({ route, navigation }) => {
  const [users, setUsers] = useState([]);
  const [profPics, setProfPics] = useState({})


  async function getProfPics(results) {
    let profilePics = {}
    for (let i = 0; i < results.length; i++) {
      if (!(results[i]['username'] in profilePics)) {
        profilePics[results[i]['username']] = await downloadImage(`/images/profile_pics/${results[i]['username']}.png`)
      }
    }

    setProfPics(profilePics)
  }

  const fakeUsers = [
        {
            username: 'joelcheney'
        }
    ]

  return (
    <View style={styles.container}>
    <Header navigation={navigation} current={'Notifications'} title={"Notifications"} />
      <FlatList
        data={fakeUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Notification
            route={route}
            navigation={navigation}
            id={item["username"]}
            name={item["username"]}
            profilePic={'../assets/willow.png'}
          />
        )}
      />

    <NavBar navigation={navigation} current={'Notifications'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor:'#cad7cc',
  },
  searchInput: {
    height: 40,
    borderColor: '#50692D',
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius:8,
    padding: 10,
    margin: 10,
    color:'#50692D'
  },
});

export default Notifications;
