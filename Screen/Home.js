import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";

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
        || !furniture|| note.length === 0|| reporter.length === 0) {
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
        style={styles.input}
        placeholder="Property Type"
        onChangeText={(value) => setProperty(value)}
        value={property}
      />
      <TextInput
        style={styles.input}
        placeholder="Bedrooms"
        onChangeText={(value) => setBedroom(value)}
        value={bedroom}
      />
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
       <TextInput
        style={styles.input}
        placeholder="Furniture"
        onChangeText={(value) => setFurniture(value)}
        value={furniture}
      />
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
      <CustomButton title="Search" />
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
      textAlign: "center",
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
    },
  });

export default Home
