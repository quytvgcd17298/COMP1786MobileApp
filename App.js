import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screen/Home';
import Result from './Screen/Result';
import Detail from './Screen/Detail';
import Search from './Screen/Search';
import Update from './Screen/Update';
import ConfirmDialog from './Screen/ConfirmDialog';



const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Home",
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          title: "Result",
        }}
        name="Result"
        component={Result}
      />
      <Stack.Screen
       name="Detail" 
       component={Detail} 
      />
      <Stack.Screen 
      name="Search" 
      component={Search} 
      />
      <Stack.Screen 
      name="Update" 
      component={Update} 
      />
      <Stack.Screen 
      name="ConfirmDialog" 
      component={ConfirmDialog} 
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
