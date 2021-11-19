import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import CustomButton from "../Components/CustomButton";
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import CurrencyInput from 'react-native-currency-input';

const db = SQLite.openDatabase("dbName", 2.0);

const Update  = ({ route, navigation }) => {
    const [updateId, setUpdateId] = useState("");
    const [property, setProperty] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [datetime, setDatetime] = useState("");
    const [monthlyprice, setMonthlyprice] = useState("");
    const [furniture, setFurniture] = useState("");
    const [note, setNote] = useState("");
    const [reporter, setReporter] = useState("");
 //const { result } = route.params;

 useEffect(() => {
  setUpdateId(route.params.Id);
  setProperty(route.params.Property);
  setBedroom(route.params.Bedrooms);
  setDatetime(route.params.Datetime);
  setMonthlyprice(route.params.Monthlyrentprice);
  setFurniture(route.params.Furniture);
  setNote(route.params.Note);
  setReporter(route.params.Reporter);
}, []);

  const updateHandle = () => {
    if (property.length === 0) {
        Alert.alert("Warning !!! Please enter property");
      }
      else if( bedroom.length === 0){Alert.alert("Warning !!! Please select bedroom")}
      else if( datetime.length === 0){Alert.alert("Warning !!! Please enter datetime")}
      else if( monthlyprice.length === 0){Alert.alert("Warning !!! Please enter monthly price")}
      else if( furniture.length === 0){Alert.alert("Warning !!! Please select furniture type")}
      else if( reporter.length === 0){Alert.alert("Warning !!! Please enter reporter name")}
      else {
        try {
          db.transaction((tx) => {
            tx.executeSql(
                'UPDATE DATABASE SET Property = ?, Bedrooms = ?, Datetime = ?, Monthlyrentprice = ?, Furniture = ?, Note = ?, Reporter = ? WHERE Id = ?',
                [property, bedroom, datetime, monthlyprice, furniture, note, reporter, updateId],
              (tx, result) => {
                console.log('Results',result.rowsAffected);
              }
            );
          });
          Alert.alert("Update Completed");
          navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        }
      }
};

  return (    
    <ScrollView>     
    <View style={styles.body}>
    <Text style={styles.text}>Update Form</Text>
    <TextInput
      placeholder="Property Type"
      style={styles.input}
      onChangeText={(value) => setProperty(value)}
      value={property}
    />
    <View style={styles.picker}>
      <Picker
        selectedValue={bedroom}
        onValueChange={(itemValue, itemIndex) => setBedroom(itemValue)}>
        <Picker.Item label="Bedrooms" value="" />
        <Picker.Item label="Single" value="Single" />
        <Picker.Item label="Double" value="Double" />
        <Picker.Item label="King room" value="King room" />
        <Picker.Item label="Apartment" value="Apartment" />
        <Picker.Item label="President" value="President" />
      </Picker>
    </View>
    
    <View>
      <DatePicker
        style={styles.datePickerStyle}
        date={datetime}
        mode="date"
        placeholder="Date and Time"
        format="DD-MM-YYYY"
        minDate="01-01-2016"
        maxDate="01-01-2025"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            marginLeft: 36,
            fontSize: 20,
            textAlign:"left"
          },
          dateIcon: {
            position: 'relative',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
        }}
        onDateChange={(date) => {
          setDatetime(date);
        }}
      />
      </View>
     {/* <TextInput
      style={styles.input}
      placeholder="Monthly rent price"
      onChangeText={(value) => setMonthlyprice(value)}
      value={monthlyprice}
    /> */}
    <View
    style = {styles.input}>
    <CurrencyInput
    style = {{
    textAlign:"left",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,}}
    value={monthlyprice}
    onChangeValue={setMonthlyprice}
    unit="$"
    delimiter=","
    separator="."
    precision={2}
    placeholder="Monthly rent price"
    onChangeText={(formattedValue) => setMonthlyprice(formattedValue)}/>

    </View>
    <View style={styles.picker}>
      <Picker
        selectedValue={furniture}
        onValueChange={(itemValue, itemIndex) => setFurniture(itemValue)}>
        <Picker.Item label="Furniture types" value="" />
        <Picker.Item label="Classic" value="Classic" />
        <Picker.Item label="Modern" value="Modern" />
        <Picker.Item label="Neoclassical" value="Neoclassical" />
        <Picker.Item label="Indochina Style" value="Indochina Style" />
      </Picker>
    </View>

    <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Notes"
        numberOfLines={10}
        multiline={true}
        onChangeText={(value) => setNote(value)}
        value={note}
    />
    <TextInput
      style={styles.input}
      placeholder="Name of the reporter"
      onChangeText={(value) => setReporter(value)}
      value={reporter}
    />
    <View>
    <CustomButton title="UPDATE" handlePress ={updateHandle} />
    </View>
  </View>
  </ScrollView>
  )
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      },
      text: {
        fontSize: 40,
        fontWeight: "bold",
        margin: 15,
      },
      input: {
        borderWidth: 1,
        height: 50,
        width: 300,
        borderRadius: 2,
        textAlign:"left",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
      },
      picker: {
        height:50,
        width: 300,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        borderColor: "#000000",
        borderRadius: 2,
      },
      datePickerStyle: {
        alignItems: "center",
        justifyContent:"center",
        height:60,
        width: 370,
        fontSize:20,
      },
      textArea: {
        borderWidth: 1,
        height: 100,
        width: 300,
        fontSize:20,
        justifyContent: "flex-start",
        textAlignVertical: 'top'
      }
});
export default Update;
