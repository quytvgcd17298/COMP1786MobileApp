import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import {Picker} from '@react-native-picker/picker';



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
    if (property.length === 0 || !bedroom || datetime.length === 0 || monthlyprice.length === 0 
        || !furniture || reporter.length === 0) {
        Alert.alert("Warning !!! Please enter inputs !!!");
      } else {
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


const createTable = () => {
    database.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS DATABASE(Id INTEGER PRIMARY KEY AUTOINCREMENT, Property TEXT, Bedrooms TEXT, Datetime TEXT, Monthlyrentprice TEXT, Furniture TEXT, Note TEXT, Reporter TEXT);"
      );
    });
  };

    return (
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
          <Picker.Item label="Bedrooms" value="Empty" />
          <Picker.Item label="Single" value="Single" />
          <Picker.Item label="Double" value="Double" />
          <Picker.Item label="King room" value="King room" />
          <Picker.Item label="Apartment" value="Apartment" />
          <Picker.Item label="President" value="President" />
        </Picker>
      </View>
      

       <TextInput
        style={styles.input}
        placeholder="Date and time"
        onChangeText={(value) => setDatetime(value)}
        value={datetime}
      />
       <TextInput
        style={styles.input}
        placeholder="Monthly rent price"
        onChangeText={(value) => setMonthlyprice(value)}
        value={monthlyprice}
      />
      <View style={styles.picker}>
        <Picker
          selectedValue={furniture}
          onValueChange={(itemValue, itemIndex) => setFurniture(itemValue)}>
          <Picker.Item label="Furniture types" value="Empty" />
          <Picker.Item label="Classic" value="Classic" />
          <Picker.Item label="Modern" value="Modern" />
          <Picker.Item label="Neoclassical" value="Neoclassical" />
          <Picker.Item label="Indochina Style" value="Indochina Style" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Notes"
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
    </View>
    )
}

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
      borderRadius: 5,
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
      borderRadius: 5,
    }
  });

export default Home
