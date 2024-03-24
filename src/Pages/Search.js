import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Button, SafeAreaView } from 'react-native';
import ProfilePreview from '../Components/ProfilePreview'; 
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import { searchUsers } from '../firebase/user';
import { downloadImage } from '../firebase/storage';
// Mock data and function for demonstration purposes



const Search = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([])

  useEffect(() => {
    if (searchTerm) {
      searchUsers(searchTerm.toLowerCase()).then((results) => {
        setupResults(results)
      })
    } else {
      setUsers([]);
    }
    
  }, [searchTerm]);
  
  async function setupResults(results){
    let formattedResults = []
    results.forEach( async (result) => {
      formattedResults.push({
        username: result['username'],
        score: result['score'],
        profilePic: await downloadImage(`/images/profile_pics/${result['username']}.png`)
      })
    })

    setUsers(formattedResults)
  }

  return (
    <View style={styles.container}>

    <Header navigation={navigation} current={'Search'} title={"Search"} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by username..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#50692D"
      />
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProfilePreview
            route={route}
            navigation={navigation}
            id={item.id}
            name={item.username}
            points={item.score}
            profilePic={item.profilePic}
            displayPoints={false}
          />
        )}
      />

    <NavBar navigation={navigation} current={'Search'}/>
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

export default Search;
