import React, { useEffect, useRef } from "react";
import { View, Image, ActivityIndicator, Animated } from "react-native";

const bg = require("../assets/bg-loading.png");
const logo = require("../assets/logo.png");

const Welcome = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Image
          source={bg}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      <Animated.Image
        source={logo}
        style={{ width: 305, height: 305, marginBottom: 0, opacity: fadeAnim, }}
        resizeMode="contain"
      />

      <ActivityIndicator size="large" color="#3C84C4" />
    </View>
  );
};

const styles = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export default Welcome;
