import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ResultItem = ({ result, navigation}) => {
const detailResult = () => {
  navigation.navigate("Detail", { result })
  };

const updateResult = () => {
  navigation.navigate("Update", { result })
  };
  return (
    <View style = {styles.container}>
      <View>
        <Text style={styles.Id}>Id: {result.Id} </Text>
        <Text style={styles.text}>Property Type: {result.Property} </Text>
        <Text style={styles.text}>Bedrooms: {result.Bedrooms}</Text>
        <Text style={styles.text}>Date and Time: {result.Datetime}</Text>
        <Text style={styles.text}>Monthly rent price: {result.Monthlyrentprice}$</Text>
        <Text style={styles.text}>Furniture Type: {result.Furniture}</Text>
        <Text style={styles.text}>Note: {result.Note}</Text>
        <Text style={styles.text}>Reporter Name: {result.Reporter}</Text>
      </View>
    <View>
    <TouchableOpacity
    onPress = {detailResult}
    style = {styles.touch}
    >
      <Text
      style = {{
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:20,
        fontSize:12,
        textTransform:"uppercase",
        color:"white"
      }}>Detail</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress = {updateResult}
    style = {styles.touch}
    >
      <Text
      style = {{
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:20,
        fontSize:12,
        textTransform:"uppercase",
        color:"white"
      }}>Update</Text>
    </TouchableOpacity>
    </View>
    </View>

  );
};

export default ResultItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: "2%",
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: "5%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 40,
      fontWeight: "bold",
      margin: 15,
  },
  Id:{
      fontSize: 40,
      fontWeight: "bold",
      margin: 15,
      color:"green"
  },
  touch:
  {
    paddingLeft: 2,
    width: 100,
    height: 50,
    borderWidth: 3,
    backgroundColor: "green",
    fontSize: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop:20,
    marginHorizontal:5,
  }
});