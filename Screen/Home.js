import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from "react-native";
import CustomButton from "../Components/CustomButton";
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import CurrencyInput from 'react-native-currency-input';



const database = SQLite.openDatabase("dbName", 2.0);

const Home = ({navigation}) => {
    const [property, setProperty] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [datetime, setDatetime] = useState("");
    const [monthlyprice, setMonthlyprice] = useState("");
    const [furniture, setFurniture] = useState("");
    const [note, setNote] = useState("");
    const [reporter, setReporter] = useState("");

    useEffect(() => {
        createTable();
      }, []);

const submit = () => {
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
          database.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO DATABASE (Property, Bedrooms, Datetime, Monthlyrentprice, Furniture, Note, Reporter) VALUES (?,?,?,?,?,?,?);",
              [property, bedroom, datetime, monthlyprice, furniture, note, reporter],
              (tx, results) => {
                console.log(results.rowsAffected);
              }
            );
          });
          Alert.alert("Input Entered");
          navigation.navigate("Result");
        } catch (error) {
          console.log(error);
        }
      }
};

const showResult = () =>{
    navigation.navigate("Result");
};
const search = () =>{
  navigation.navigate("Search");
};
const confirmDialog = () =>{
  navigation.navigate("BellVibrate");
};

const createTable = () => {
    database.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS DATABASE(Id INTEGER PRIMARY KEY AUTOINCREMENT, Property TEXT, Bedrooms TEXT, Datetime TEXT, Monthlyrentprice TEXT, Furniture TEXT, Note TEXT, Reporter TEXT);"
      );
    });
  };

    return (   
      <ScrollView>
    <View style={styles.body}>
      <Text style={styles.text}>Home</Text>
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
      <View style = {{flexDirection:"row"}}>
      <CustomButton title="Show All" handlePress ={showResult} />
      <CustomButton title="Search"  handlePress = {search}/>
      <CustomButton title="Submit" handlePress={submit}/>
      </View>
      <TouchableOpacity
      onPress = {confirmDialog}
      style = {styles.touch}
    >
      <Text
      style = {{
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:20,
        fontSize:20,
        textTransform:"uppercase",
        color:"black"
      }}>Confirmation Dialog Box</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
      fontSize: 20,
      justifyContent: "flex-start",
      textAlignVertical: 'top'
    },
    touch:
  {
    paddingLeft: 2,
    width: 370,
    height: 50,
    borderWidth: 3,
    backgroundColor: "yellow",
    fontSize: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop:20,
    marginHorizontal:5,
  }
  });

export default Home
