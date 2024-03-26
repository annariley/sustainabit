import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FriendButton = ({ callback, status }) => {
    function getFriendButtonStyle() {
        console.log("Friend Status: ", status)
        if (status == "current") {
          return styles.friendBackground
        } else if (status == "friends") {
          return styles.friendBackground
        } else if (status == "pending") {
          return styles.requestedBackground
        } else if (status == "requested") {
          return styles.requestedBackground
        } else {
          return styles.addFriendBackground
        }
      }    
    function getButtonText() {
        console.log("Friend Status: ", status)
        if (status == "current") {
          return "You!"
        } else if (status == "friends") {
          return "Friends"
        } else if (status == "pending") {
          return "Pending"
        } else if (status == "requested") {
          return "Requested"
        } else {
          return "Add Friend"
        }
      }   
    function getButtonIcon() {
        console.log("Friend Status: ", status)
        if (status == "current") {
          return "account-plus"
        } else if (status == "friends") {
          return "account-multiple"
        } else if (status == "pending") {
          return "account-clock"
        } else if (status == "requested") {
          return "account-key"
        } else {
          return "account-plus"
        }
    }
    if (status == 'current') return (<View style={{height: 20}}></View>)

  return (
    <View style={{alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity onPress={callback}>
            <View style={getFriendButtonStyle()}>
                <Text style={styles.friendText}>{getButtonText()}</Text>
                <Icon name={getButtonIcon()} size={20} color="#E7ECDF" />
            </View>
        </TouchableOpacity>
    </View>
    )}

const styles = StyleSheet.create({
    friendText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#E7ECDF',
        padding: 10
    },
    addFriendBackground: {
        backgroundColor: '#415A50',
        borderRadius:20,
        marginBottom:20,
        width:168,
        alignItems:'center', 
        justifyContent:'center',
        flexDirection:'row'
    },
    friendBackground: {
        backgroundColor: '#b0b8b4',
        borderRadius:20,
        marginBottom:20,
        width:130,
        alignItems:'center', 
        justifyContent:'center',
        flexDirection:'row',
        color:'white'
    }, 
    requestedBackground: {
        backgroundColor: 'yellow'
    },
    });
    
export default FriendButton;
