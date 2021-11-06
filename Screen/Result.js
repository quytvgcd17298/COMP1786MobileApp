import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ResultItem from "../Components/ResultItem";

const database = SQLite.openDatabase("dbName", 2.0);

const Result = ({navigation}) => {

/*  const [property, setProperty] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [datetime, setDatetime] = useState("");
    const [monthlyprice, setMonthlyprice] = useState("");
    const [furniture, setFurniture] = useState("");
    const [note, setNote] = useState("");
    const [reporter, setReporter] = useState(""); */
    const [data, setData] = useState([]);


    useEffect(() => {
/*    getData(); */      
      getResult();
      }, []);
      
 /*  const getData = () => {
    try {
      database.transaction((tx) => {
        console.log(123);
        tx.executeSql("SELECT Property, Bedrooms, Datetime, Monthlyrentprice, Furniture, Note, Reporter FROM DATABASE;", [], (tx, result) => {
          console.log(JSON.stringify(result.rows));
          var len = result.rows.length;
          console.log(len);
          if (len > 0) {
            const resultProperty= result.rows.item(0).Property;
            const resultBedroom = result.rows.item(0).Bedrooms;
            const resultDatetime = result.rows.item(0).Datetime;
            const resultMonthlyprice = result.rows.item(0).Monthlyrentprice;
            const resultFurniture = result.rows.item(0).Furniture;
            const resultNote = result.rows.item(0).Note;
            const resultReporter = result.rows.item(0).Reporter;
            setProperty(resultProperty);
            setBedroom(resultBedroom);
            setDatetime(resultDatetime);
            setMonthlyprice(resultMonthlyprice);
            setFurniture(resultFurniture);
            setNote(resultNote);
            setReporter(resultReporter);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }; */

    const getResult = () => {
        try {
          database.transaction((tx) => {
            tx.executeSql("SELECT * FROM DATABASE", [], (tx, result) => {
              var len = result.rows.length;
              console.log(JSON.stringify(result.rows));
              for (let i = 0; i < len; i++) {
                let row = result.rows.item(i);
                setData((prevState) => [
                  ...prevState,
                  {Id: row.Id, Property: row.Property, Bedrooms: row.Bedrooms, Datetime: row.Datetime, Monthlyrentprice: row.Monthlyrentprice, Furniture: row.Furniture, Note: row.Note, Reporter: row.Reporter},
                ]);
              }
            });
          });
        } catch (error) {
          console.log(error);
        }
      };
    
    return (
        <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.Id)}
        renderItem={({ item }) => (
          <ResultItem result={item} navigation={navigation} />
        )}
      />
    </View>
    )
}

export default Result
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
  });
