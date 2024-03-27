import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Button, SafeAreaView, useFocusEffect } from 'react-native';
import Notification from '../Components/Notification'; 
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import { searchUsers } from '../firebase/user';
import { downloadImage } from '../firebase/storage';
import { useContext } from 'react';
import AppContext from '../Components/AppContext';

const Notifications = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [requests, setRequests] = useState([]);
  const [profPics, setProfPics] = useState({})
  const { currentUser } = useContext(AppContext)
  const [curUser, _] = currentUser

  useEffect(() => {
    setRefreshing(true)
      curUser.getIncomingRequests().then((incoming_requests) => {
        console.log("Incoming requests: ", incoming_requests)
        getProfPics(incoming_requests)
        .then(() => {
          if (requests.length != incoming_requests.length) {
            setRequests(incoming_requests)
          }
          setRefreshing(false)
        })
      })
  }, [requests]);

  async function getProfPics(results) {
    let profilePics = {}
    for (let i = 0; i < results.length; i++) {
      if (!(results[i] in profilePics)) {
        profilePics[results[i]] = await downloadImage(`/images/profile_pics/${results[i]}.png`)
      }
    }

    setProfPics(profilePics)
  }

  function callback() {
    curUser.getIncomingRequests().then((incoming_requests) => {
      console.log("Incoming requests: ", incoming_requests)
      getProfPics(incoming_requests)
      .then(() => {
        if (requests.length != incoming_requests.length) {
          setRequests(incoming_requests)
        }
        setRefreshing(false)
      })
    })
  }

  return (
    <View style={styles.container}>
    <Header navigation={navigation} current={'Notifications'} title={"Notifications"} />
      <FlatList
        data={requests}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Notification
            route={route}
            navigation={navigation}
            id={item}
            name={item}
            profilePic={profPics[item]}
            callback={callback}
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
