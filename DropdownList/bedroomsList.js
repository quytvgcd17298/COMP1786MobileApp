import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet, View} from "react-native";



const bedroomsList = (props) => {
    return (
        <View>
        <RNPickerSelect
        />
        </View>
    )
}
const styles = StyleSheet.create({
    inputList: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        height: 50,
        width: 300,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
      },
});

export default bedroomsList
