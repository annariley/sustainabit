import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VisibilityDropdown = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Everyone', value: 'everyone', icon: () => <Icon name="earth" size={20} color="#50692D" />},
    {label: 'Friends', value: 'friends', icon: () => <Icon name="account-group" size={20} color="#50692D" />},
    {label: 'Only you', value: 'you', icon: () => <Icon name="account" size={20} color="#50692D" />},
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        zIndex={1000} // Ensure dropdown appears above other content
        zIndexInverse={1000}
        dropDownDirection="BOTTOM" // Can adjust based on layout
        listMode="SCROLLVIEW" // Use "MODAL" for larger lists
        arrowIconStyle={{width: 20, height: 20}} // Style for the down arrow icon
        customArrowUp={(size, color) => <Icon name="chevron-up" size={size} color={color} />} // Custom up arrow icon
        customArrowDown={(size, color) => <Icon name="chevron-down" size={size} color={color} />} // Custom down arrow icon
        customTickIcon={() => <Icon name="check" size={20} color="#50692D" />} // Custom selected item tick icon
        placeholder="Select an activity"
        style={{ borderColor: '#50692D', backgroundColor: "#F5F5F5", color:  '#50692D' }}
        dropDownContainerStyle={{
          backgroundColor: "#F5F5F5",
          borderColor: '#50692D',
          color:  '#50692D' 
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      width: '80%',
      marginLeft:'10%',
      marginBottom:20,
      backgroundColor: '#F5F5F5',
      zIndex:998
    },
  });

export default VisibilityDropdown;
