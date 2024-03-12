import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddMedia = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icon name="photo-library" size={18} color="#50692D" />
        <Text style={styles.text}>Add Photos/Videos</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#50692D',
    borderRadius: 4,
    borderStyle: 'dashed', 
    margin: '10%',
    height: '50%'
  },
  icon: {
    width: 20, // Adjust the size to fit your design
    height: 20, // Adjust the size to fit your design
    marginRight: 5,
    marginBottom: '5%'
  },
  text: {
    color: '#50692D', // Adjust the color to fit your design
  },
});

export default AddMedia;
``
