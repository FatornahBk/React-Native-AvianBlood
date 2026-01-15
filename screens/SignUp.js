import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { myStyle } from "../styles/myStyle";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const bg = require("../assets/signup.png");

const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, paddingBottom: 30 }}>
            <View style={{ width: "100%", position: "relative", height: 300 }}>
              <Image
                source={bg}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
              <View
                style={{
                  backgroundColor: "#3C84C4",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.58,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "#0F2C42",
                alignSelf: "center",
                marginTop: 12,
              }}
            >
              Sign up
            </Text>

            <View>
              {/* first name */}
              <View style={myStyle.inputContainer2}>
                <View style={myStyle.iconBox}>
                  <Ionicons name="person" size={27} color="white" />
                </View>
                <TextInput
                  placeholder="First name"
                  keyboardType="default"
                  style={myStyle.textInput}
                />
              </View>
              {/* last name */}
              <View style={myStyle.inputContainer2}>
                <View style={myStyle.iconBox}>
                  <Ionicons name="person" size={27} color="white" />
                </View>
                <TextInput
                  placeholder="Last name"
                  keyboardType="default"
                  style={myStyle.textInput}
                />
              </View>
              {/* Username */}
              <View style={myStyle.inputContainer2}>
                <View style={myStyle.iconBox}>
                  <Ionicons name="person" size={27} color="white" />
                </View>
                <TextInput
                  placeholder="Username"
                  keyboardType="default"
                  style={myStyle.textInput}
                />
              </View>
              {/* email */}
              <View style={myStyle.inputContainer2}>
                <View style={myStyle.iconBox}>
                  <MaterialCommunityIcons
                    name="gmail"
                    size={27}
                    color="white"
                  />
                </View>
                <TextInput
                  placeholder="Enter your email"
                  keyboardType="default"
                  style={myStyle.textInput}
                />
              </View>
              {/* Password */}
              <View style={myStyle.inputContainer2}>
                <View style={myStyle.iconBox}>
                  <MaterialCommunityIcons name="lock" size={27} color="white" />
                </View>
                <TextInput
                  placeholder="Enter password"
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  style={[myStyle.textInput, { flex: 1 }]}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setShowPassword(!showPassword)}
                  style={myStyle.eyeIcon}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="grey"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 20, width: 297, alignSelf: "center" }}>
              <Text style={{ alignSelf: "flex-end" }} onPress={() => navigation.navigate('Login')}>
                Already have an account?
              </Text>
            </View>

            <TouchableOpacity
              style={{
                alignSelf: "center",
                width: 221,
                height: 43,
                backgroundColor: "#2196F3",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={() => console.log("กดปุ่ม Sign up")}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
