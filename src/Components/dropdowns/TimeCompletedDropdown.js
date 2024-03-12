import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const theme = require("../../assets/themes/dropdownTheme");
import DateTimePicker from '@react-native-community/datetimepicker';

DropDownPicker.addTheme("dropdownTheme", theme);
DropDownPicker.setTheme("dropdownTheme");

const TimeCompletedDropdown = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'datetime'}
          is24Hour={true}
          onChange={onChange}
          accentColor="green"
        />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      width:'100%',
      backgroundColor: '#F5F5F5',
      zIndex:1000
    },
  });

export default TimeCompletedDropdown;
