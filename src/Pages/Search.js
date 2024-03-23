import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Button, SafeAreaView } from 'react-native';
import ProfilePreview from '../Components/ProfilePreview'; 
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
// Mock data and function for demonstration purposes
const usersData = [
  { id: '1', name: 'annariley', points: 120, profilePic: require('../assets/rynn.jpeg')},
  { id: '2', name: 'rynnzhang', points: 150, profilePic: require('../assets/rynn.jpeg') },
  { id: '3', name: 'iaincopland', points: 120, profilePic: require('../assets/rynn.jpeg') },
  { id: '4', name: 'joelcheney', points: 150, profilePic: require('../assets/rynn.jpeg')},
  { id: '5', name: 'sikaparadis', points: 120, profilePic: require('../assets/rynn.jpeg') },
  // Add more users as needed
];

const fetchUsersBySearchTerm = (searchTerm) => {
  return usersData.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
};

const Search = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const fetchedUsers = fetchUsersBySearchTerm(searchTerm);
      setUsers(fetchedUsers);
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>

    <Header navigation={navigation} current={'Search'} title={"Search"} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by username"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProfilePreview
            route={route}
            navigation={navigation}
            id={item.id}
            name={item.name}
            points={item.points}
            profilePic={item.profilePic}
            displayPoints={false}
          />
        )}
      />

    <NavBar navigation={navigation} current={'Home'}/>
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
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    color:'#50692D'
  },
});

export default Search;
