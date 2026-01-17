import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import { myStyle } from "../styles/myStyle";
import HeaderBar from "../components/HeaderBar";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Profile({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    name: "Dr.Strange",
    username: "@dr.strangenajahahaha",
    email: "strange121@gmail.com",
    phone_number: "Enter your phone number",
    password: "1423",
    avatar_url: { uri: "https://i.pravatar.cc/300" },
  });

  const [draft, setDraft] = useState(user);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("currentUser");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser((prev) => ({ ...prev, ...userData }));
          setDraft((prev) => ({ ...prev, ...userData }));
        }
      } catch (err) {
        console.log("Error loading user:", err);
      }
    };
    loadUser();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Sorry, we need camera roll permissions to make this work!",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setDraft({ ...draft, avatar_url: { uri: base64Img } });
    }
  };

  const startEdit = () => {
    setDraft(user);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(user);
    setIsEditing(false);
    setShowPassword(false);
  };

  const saveEdit = async () => {
    if (!draft.name.trim()) return Alert.alert("Error", "Name ห้ามว่าง");
    if (!draft.email.includes("@"))
      return Alert.alert("Error", "Email ไม่ถูกต้อง");

    try {
      if (!user.id) {
        Alert.alert("Error", "ไม่พบ ID ผู้ใช้ ไม่สามารถบันทึกได้");
        return;
      }

      const updateData = {
        name: draft.name,
        username: draft.username,
        email: draft.email,
        password: draft.password,
        phone_number: draft.phone_number || "Enter your phone number",
        avatar_url: draft.avatar_url,
      };

      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, updateData);

      const newUserData = { ...user, ...updateData };
      await AsyncStorage.setItem("currentUser", JSON.stringify(newUserData));

      setUser(newUserData);
      setIsEditing(false);
      setShowPassword(false);
      Alert.alert("Success", "บันทึกข้อมูลเรียบร้อย");
    } catch (error) {
      console.error("Update Error:", error);
      Alert.alert("Error", "เกิดข้อผิดพลาดในการบันทึก: " + error.message);
    }
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <HeaderBar title={"Profile"} />

      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Profile Card */}
        <View style={{ paddingHorizontal: 18, paddingTop: 18 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <TouchableOpacity
              onPress={isEditing ? pickImage : null}
              disabled={!isEditing}
            >
              <View style={{ position: "relative" }}>
                <Image
                  source={isEditing ? draft.avatar_url : user.avatar_url}
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: 43,
                    backgroundColor: "#ddd",
                  }}
                />
                {/* ไอคอนกล้องจะโชว์เฉพาะตอนกด Edit */}
                {isEditing && (
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      backgroundColor: "#0F2C42",
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                      borderColor: "white",
                    }}
                  >
                    <Ionicons name="camera" size={16} color="white" />
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 22, fontWeight: "800", color: "#0F2C42" }}
              >
                {user.name}
              </Text>
              <Text style={{ marginTop: 2, color: "#6b7280" }}>
                {"@" + user.username}
              </Text>

              {/* Buttons */}
              {!isEditing ? (
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    alignSelf: "flex-start",
                    backgroundColor: "#0F2C42",
                    paddingVertical: 10,
                    paddingHorizontal: 18,
                    borderRadius: 12,
                  }}
                  onPress={startEdit}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#0F2C42",
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                    }}
                    onPress={saveEdit}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      Save
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E5E7EB",
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                    }}
                    onPress={cancelEdit}
                  >
                    <Text style={{ color: "#111827", fontWeight: "700" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Fields text box */}
        <View style={{ paddingHorizontal: 18, marginTop: 18 }}>
          <EditableField
            label="Name"
            value={isEditing ? draft.name : user.name}
            editable={isEditing}
            onChangeText={(t) => setDraft((p) => ({ ...p, name: t }))}
          />

          <EditableField
            label="Username"
            value={isEditing ? draft.username : user.username}
            editable={isEditing}
            onChangeText={(t) => setDraft((p) => ({ ...p, username: t }))}
          />

          <EditableField
            label="Email"
            value={isEditing ? draft.email : user.email}
            editable={isEditing}
            keyboardType="email-address"
            onChangeText={(t) => setDraft((p) => ({ ...p, email: t }))}
          />

          {/* Password + eye */}
          <Text
            style={{
              marginTop: 14,
              marginBottom: 8,
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Password
          </Text>
          <View
            style={{
              backgroundColor: "#F1F1F1",
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              height: 48,
            }}
          >
            <TextInput
              style={{ flex: 1, color: isEditing ? "#111827" : "#6b7280" }}
              value={isEditing ? draft.password : "********"}
              editable={isEditing}
              secureTextEntry={!showPassword}
              onChangeText={(t) => setDraft((p) => ({ ...p, password: t }))}
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#6b7280"
              />
            </TouchableOpacity>
          </View>

          <EditableField
            label="Phone number"
            value={
              isEditing && draft.phone_number === "Enter your phone number"
                ? ""
                : isEditing
                  ? draft.phone_number
                  : user.phone_number
            }
            placeholder="Enter your phone number"
            editable={isEditing}
            keyboardType="phone-pad"
            onChangeText={(t) => setDraft((p) => ({ ...p, phone_number: t }))}
          />
        </View>
      </ScrollView>

      <Navbar />
    </View>
  );
}

function EditableField({
  label,
  value,
  editable,
  onChangeText,
  keyboardType = "default",
  placeholder,
}) {
  return (
    <View style={{ marginTop: 14 }}>
      <Text style={{ marginBottom: 8, fontWeight: "700", color: "#111827" }}>
        {label}
      </Text>
      <View
        style={{
          backgroundColor: "#F1F1F1",
          borderRadius: 12,
          paddingHorizontal: 14,
          height: 48,
          justifyContent: "center",
        }}
      >
        <TextInput
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          style={{ color: editable ? "#111827" : "#6b7280" }}
        />
      </View>
    </View>
  );
}
