import React from "react";
import { Image, Text, View } from "react-native";

const logo = require("../assets/logo1.png");

const TabBar = ({ text }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: 100,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 3,
        flexDirection: "row",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      <Image source={logo} style={{ marginLeft: 22, zIndex: 10 }} />
      
      <View
        style={{
          backgroundColor: "#6DAFCB",
          height: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          marginLeft: 60, 
          position: "relative",
          zIndex: 1
        }}
      >
        <View style={{
            position: 'absolute',
            left: -50,
            top: 0,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderLeftWidth: 50,
            borderBottomWidth: 140,
            borderLeftColor: 'transparent',
            borderBottomColor: '#6DAFCB',
        }} />

        <Text
            style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 38
            }}
        >{text}</Text>
      </View>
    </View>
  );
};

export default TabBar;