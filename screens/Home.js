import React, { useState, useCallback, useEffect, useRef } from "react";
import { Image, Text, View, ScrollView, RefreshControl } from "react-native";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
const logo = require("../assets/logo1.png");

const Home = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (route.params?.refreshId) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        onRefresh();
    }
  }, [route.params?.refreshId]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, backgroundColor: 'white' }} 
        contentContainerStyle={{ paddingBottom: 90 }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            progressViewOffset={50}
            tintColor="#11A4E1"
          />
        }
      >
        <View
          style={{
            height: 80,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#11A4E1" }}>
            Avain Blood
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image
            source={logo}
            style={{ width: 48, height: 48, marginTop: 14, marginBottom: 14 }}
          />
          <Text>We bring intelligence to poultry diagnostics.</Text>
          <Text style={{ opacity: 0.5 }}>
            Detect abnormalities in seconds and enhance flock
          </Text>
          <Text style={{ opacity: 0.5 }}>
            health with advanced deep-learning analysis of
          </Text>
          <Text style={{ opacity: 0.5 }}>chicken blood cells.</Text>
        </View>

        <Post />
        <Post />
      </ScrollView>

      <Navbar />
    </View>
  );
};

export default Home;