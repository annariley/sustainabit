import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView, 
  TextInput
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AddMedia from '../Components/AddMedia';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../Components/Header';
import NavBar from '../Components/NavBar';
import ActivityDropdown from '../Components/dropdowns/ActivityDropdown';
import TimeCompletedDropdown from '../Components/dropdowns/TimeCompletedDropdown';
import { useContext } from 'react';
import AppContext from '../Components/AppContext';


// You'll want to create custom components for the Dropdown, ActivityItem, and BottomTab
// Assuming you've created the respective components and imported them here

const Track = ({ navigation }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [timeCompleted, setTimeCompleted] = useState(new Date());
  const [customText, onChangeCustomText] = useState('Describe your activity...');
  const cur_user = useContext(AppContext)

  async function trackActivity(activityType, textInput) {
    await cur_user.update_local_info()
    cur_user.trackActivity(activityType, textInput, commuteType="bike",commuteData="tmp")
  }

  const onPressPost = () => {
    console.log(selectedActivity)
    console.log(timeCompleted)
    console.log(customText)
    trackActivity(selectedActivity, customText)
  }
  const onAddMediaPress = () =>{
  //   const options = {
  //     mediaType: 'photo',
  //     quality: 1,
  //     includeBase64: false,
  //   };
  
  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       const photos = response.assets;
  //       // Do something with the photos, such as setting state or uploading to a server
  //     }
  //   });
  }
  return (
    <View style={styles.container}>
      <Header title="Track Activity" />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>Activity: {selectedActivity}</Text>
        <ActivityDropdown value={selectedActivity} setValue={setSelectedActivity} />
        {selectedActivity == 'custom' ?
            <View
            style={{
              backgroundColor: '#F5F5F5',
              borderColor: '#50692D',
              borderWidth: 1,
              borderRadius: 5,
              margin: '10%',
              marginBottom: '-1%',
              height: 100
            }}>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              onChangeText={text => onChangeCustomText(text)}
              value={customText}
              style={{ color:'#50692D', margin: '3%'}}
            />
          </View> :
        <View></View>}
        <AddMedia onPress={onAddMediaPress} />
        <Text style={styles.text}>Time Completed: {timeCompleted.toLocaleString()}</Text>
        <TimeCompletedDropdown date={timeCompleted} setDate={setTimeCompleted} /> 
        <TouchableOpacity style={styles.postButton} onPress={onPressPost}>
          <Text style={styles.postText}>Upload Activity</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavBar navigation={navigation} current={'TrackActivity'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#50692D',
    margin: 20,
  },
  scrollView: {
    flex: 1,
  },
  activityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  postButton: {
    backgroundColor: '#50692D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  postText: {
    color: 'white',
    fontSize: 16,
  },
  // Add other styles as needed
});

export default Track;
