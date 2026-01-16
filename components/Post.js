import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Post = () => {
  return (
    <View style={{ marginTop: 7 }}>
      <View
        style={{
          height: 1,
          backgroundColor: "#11A4E1",
          opacity: 0.2,
          width: "100%",
        }}
      />

      <View>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 12 }}
        >
          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhA_VuqI8DqCHBMlOg_Y6KMjEuJsX_prJX9g&s" }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#eee",
            }}
          />

          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Dr. Strange
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "gray", fontSize: 12 }}>1 นาที</Text>
              <Text
                style={{ color: "gray", fontSize: 12, marginHorizontal: 4 }}
              >
                •
              </Text>
              <Text style={{ color: "gray", fontSize: 10 }}>🌍</Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            paddingHorizontal: 12,
            marginBottom: 10,
            fontSize: 15,
            color: "#000",
          }}
        >
          ตรวจหาเม็ดเลือดขาวของไก่ที่ผมเลี้ยงกับมือ
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {[1, 2, 3, 4].map((item, index) => (
            <Image
              key={index}
              source={ require('../assets/AVC2-69BW_022.jpg') }
              style={{
                width: width / 2, 
                height: width / 2, 
                borderWidth: 0.5,
                borderColor: "#fff",
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Post;
