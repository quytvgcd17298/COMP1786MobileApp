import React from 'react'
import { Button, View, TouchableOpacity } from 'react-native'

const BellVibrate = () => {
    return (
        <View
        style = {{
            alignItems:"center",
            justifyContent:"center"
            }}>
            <TouchableOpacity
            style = {{
                width: 370,
                height: 50,
                borderWidth: 3,
                backgroundColor: "lighblue",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                marginTop:20,
                marginHorizontal:5,
            }}>
                <Text
                style = {{
                    alignItems:"center",
                    justifyContent:"center",
                    paddingHorizontal:20,
                    fontSize:20,
                    textTransform:"uppercase",
                    color:"black"
                }}
                    >Show Dialog</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BellVibrate;
