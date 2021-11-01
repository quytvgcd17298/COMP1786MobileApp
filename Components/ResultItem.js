import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ResultItem = ({ result, navigation }) => {
  return (
    <View style = {styles.container}>
    {/* <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ResultDetail", { result })}
    > */}
      <View style={{ width: "90%" }}>
        <Text style={styles.text}>Property Type: {result.Property} </Text>
        <Text style={styles.text}>Bedrooms: {result.Bedrooms}</Text>
        <Text style={styles.text}>Date and Time: {result.Datetime}</Text>
        <Text style={styles.text}>Monthly rent price: {result.Monthlyrentprice}</Text>
        <Text style={styles.text}>Furniture Type: {result.Furniture}</Text>
        <Text style={styles.text}>Note: {result.Note}</Text>
        <Text style={styles.text}>Reporter Name: {result.Reporter}</Text>
      </View>
    {/* </TouchableOpacity> */}
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
});