import React, { useState } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { myStyle } from "../styles/myStyle";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

const bg = require("../assets/login.png");

const Login = ({ navigation }) => {
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
          <View
            style={{ flex: 1, paddingBottom: 30, backgroundColor: "white" }}
          >
            <View style={{ width: "100%" }}>
              <Image source={bg} style={{ width: "100%" }} resizeMode="cover" />
            </View>

            <Text style={myStyle.textheader}>Login</Text>

            <View style={{ marginTop: 40 }}>
              {/* Email */}
              <View style={myStyle.inputContainer}>
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
              <View style={myStyle.inputContainer}>
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
              <Text style={{ alignSelf: "flex-end" }}>Forget password?</Text>
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
              onPress={() => navigation.navigate('Home')}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Login
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                width: "55%",
                alignSelf: "center",
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#8D8D8D" }}
              />
              <Text
                style={{ marginHorizontal: 10, color: "#8D8D8D", fontSize: 14 }}
              >
                or sign up with
              </Text>
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#8D8D8D" }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 16,
                alignSelf: "center",
                gap: 20,
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 50,
                  backgroundColor: "#E4E4E4",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="facebook"
                  size={40}
                  color={"#1877F2"}
                />
              </View>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 50,
                  backgroundColor: "#E4E4E4",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="google" size={40} color="#DB4437" />
              </View>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 50,
                  backgroundColor: "#E4E4E4",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5 name="line" size={40} color="#06C755" />
              </View>
            </View>

            <View style={{ marginTop: 30, alignSelf: "center" }}>
              <Text style={{ color: "#8D8D8D", fontSize: 16 }}>
                Don’t have an account ?{" "}
                <Text style={{ color: "#3B82F6" }} onPress={() => navigation.navigate('SignUp')}>Sign up</Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
