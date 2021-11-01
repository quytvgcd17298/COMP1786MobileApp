/* import * as SQLite from "expo-sqlite";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const db = SQLite.openDatabase("dbName", 1.0);

const UserDetail = ({ route, navigation }) => {
  const { property } = route.params;
  const { bedroom } = route.params;
  const { datetime } = route.params;
  const { monthlyprice } = route.params;
  const { furniture } = route.params;
  const { note } = route.params;
  const { reporter } = route.params;

  const deleteUser = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Users WHERE id = ?",
          [user.Id],
          (tx, result) => {
            Alert.alert("Deleted !!!");
            navigation.navigate("Users");
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text>{user.Id}</Text>
      <Text>{user.Property}</Text>
      <Text>{user.Bedrooms}</Text>
      <Text>{user.Datetime}</Text>
      <Text>{user.Monthlyrentprice}</Text>
      <Text>{user.Furniture}</Text>
      <Text>{user.Note}</Text>
      <Text>{user.Reporter}</Text>
      <CustomButton title="Delete"/>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ResultDetail;
 */