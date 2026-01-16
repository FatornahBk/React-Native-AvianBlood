import React, { useState } from "react";
import { Text, View, Pressable, Alert, Platform, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import { Feather } from "@expo/vector-icons"; 
import * as ImagePicker from "expo-image-picker";

const Add = () => {
  const [pressed, setPressed] = useState(false);
  const [files, setFiles] = useState([]); 

  const formatSize = (bytes) => {
    if (!bytes) return "0 MB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const simulateUpload = (newFiles) => {
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.05; 
        setFiles((currentFiles) =>
          currentFiles.map((f) => {
            if (f.id === file.id) {
              if (progress >= 1) {
                clearInterval(interval);
                return { ...f, progress: 1, status: "completed" };
              }
              return { ...f, progress: progress };
            }
            return f;
          })
        );
      }, 100);
    });
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "ไม่มีสิทธิ์เข้าถึงรูปภาพ",
        "กรุณาเปิดสิทธิ์การเข้าถึงรูปภาพในหน้าตั้งค่า",
        [
          { text: "ยกเลิก", style: "cancel" },
          { text: "ไปที่ตั้งค่า", onPress: () => Linking.openSettings() }
        ]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsMultipleSelection: true,
        selectionLimit: Platform.OS === "ios" ? 100 : 0,
        quality: 1,
      });

      if (!result.canceled) {
        const validAssets = [];
        const duplicateNames = [];

        result.assets.forEach((asset) => {
          let assetName = asset.fileName;
          if (!assetName) {
             const uriParts = asset.uri.split('/');
             assetName = uriParts[uriParts.length - 1]; 
          }

          const isDuplicate = files.some(existingFile => existingFile.name === assetName);

          if (isDuplicate) {
            duplicateNames.push(assetName);
          } else {
            validAssets.push({
              originalAsset: asset,
              name: assetName 
            });
          }
        });

        if (duplicateNames.length > 0) {
            Alert.alert("พบไฟล์ซ้ำ!", `ไฟล์เหล่านี้มีชื่อซ้ำ:\n\n${duplicateNames.join('\n')}`);
        }

        if (validAssets.length === 0) return;

        const newFiles = validAssets.map((item) => ({
          id: Date.now().toString() + "_" + Math.random().toString(36).substr(2, 9),
          uri: item.originalAsset.uri,
          name: item.name, 
          size: item.originalAsset.fileSize || 2500000, 
          progress: 0,
          status: "uploading",
        }));

        setFiles((prev) => [...prev, ...newFiles]);
        simulateUpload(newFiles);
      }
    } catch (error) {
      console.log("Gallery Error:", error);
      Alert.alert("Error", "เกิดข้อผิดพลาด: " + error.message);
    }
  };

  return (
    <LinearGradient colors={["#E9E5E5", "#B8E1F8"]} style={{ flex: 1 }}>
      <TabBar text={"Upload files"} />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Pressable
          onPress={openGallery}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={{
            width: 350,
            height: 180,
            backgroundColor: pressed ? "#EEF4FF" : "#fff",
            borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
            alignSelf: "center",
            marginTop: 82,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="upload-to-cloud" size={75} color="#5686E1" />
          <Text style={{ fontSize: 14, marginBottom: 7 }}>Upload Image</Text>
          <Text style={{ fontSize: 14, color: "#898989" }}>
            Support: .jpg, .png (max 1 MB)
          </Text>
          <Text style={{ fontSize: 14, color: "#898989" }}>Max 100 images</Text>
        </Pressable>

        {files.map((file) => (
          <View
            key={file.id} 
            style={{
              width: 350,
              height: 75,
              backgroundColor: "#F3F3F3",
              borderRadius: 16,
              marginTop: 15,
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Image
              source={{ uri: file.uri }}
              style={{ width: 50, height: 50, borderRadius: 10, backgroundColor: '#ddd' }}
              resizeMode="cover"
            />

            <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }} numberOfLines={1}>
                {file.name}
              </Text>

              {file.status === "uploading" ? (
                <View>
                  <View style={{ height: 6, width: '100%', backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden' }}>
                    <LinearGradient
                      colors={['#5686E1', '#8AB4F8']}
                      start={{ x: 0, y: 0 }} 
                      end={{ x: 1, y: 0 }}
                      style={{ height: '100%', width: `${file.progress * 100}%` }}
                    />
                  </View>
                  <Text style={{ fontSize: 10, color: "#898989", marginTop: 4 }}>
                    {formatSize(file.size * file.progress)} of {formatSize(file.size)}
                  </Text>
                </View>
              ) : (
                <Text style={{ fontSize: 12, color: "#898989" }}>
                  {formatSize(file.size)}
                </Text>
              )}
            </View>

            <View style={{ marginLeft: 10 }}>
              {file.status === "uploading" ? (
                <TouchableOpacity onPress={() => removeFile(file.id)}>
                   <Feather name="x" size={20} color="#555" />
                </TouchableOpacity>
              ) : (
                <View style={{ backgroundColor: '#000', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                   <Feather name="check" size={14} color="#fff" />
                </View>
              )}
            </View>
          </View>
        ))}

        {files.length > 0 && (
          <TouchableOpacity
            style={{
              width: 345,
              height: 45,
              backgroundColor: "#989898",
              borderRadius: 16,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20, 
              marginBottom: 10
            }}
            onPress={() => Alert.alert("Upload", "กำลังเริ่มอัปโหลดไฟล์...")}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Upload {files.length} file
            </Text>
          </TouchableOpacity>
        )}

      </ScrollView>

      <Navbar />
    </LinearGradient>
  );
};

export default Add;