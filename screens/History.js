import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";

import Navbar from "../components/Navbar";
import HeaderBar from "../components/HeaderBar";
import HistoryItemCard from "../components/HistoryItemCard";
import HistoryDetailView from "../components/HistoryDetailView";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function History() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("currentUser");
        if (jsonValue) {
          const userData = JSON.parse(jsonValue);
          const userId = userData.id;

          if (userId) {
            const q = query(
              collection(db, "uploaded_images"), 
              where("user_id", "==", userId)
            );
            
            const querySnapshot = await getDocs(q);
            
            const groups = {};

            querySnapshot.forEach((doc) => {
              const data = doc.data();
              
              const groupKey = data.batch_id || doc.id;

              if (!groups[groupKey]) {
                let formattedDate = "";
                if (data.uploaded_at && data.uploaded_at.seconds) {
                   const date = new Date(data.uploaded_at.seconds * 1000);
                   const day = date.getDate().toString().padStart(2, '0');
                   const month = (date.getMonth() + 1).toString().padStart(2, '0');
                   const year = date.getFullYear();
                   const hours = date.getHours().toString().padStart(2, '0');
                   const minutes = date.getMinutes().toString().padStart(2, '0');
                   formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;
                }

                const hasStain = data.stain && typeof data.stain === 'string' && data.stain.trim().length > 0;

                groups[groupKey] = {
                  id: groupKey, 
                  docIds: [],   
                  title: "ตรวจหาเม็ดเลือดขาวของไก่",
                  datetime: formattedDate,
                  status: data.status || "Pending",
                  thumbnailUri: data.image_path,
                  images: [],
                  ...(hasStain && { stain: data.stain })
                };
              }

              groups[groupKey].docIds.push(doc.id);
              
              if (data.image_path) {
                groups[groupKey].images.push(data.image_path);
              }
            });

            const groupedData = Object.values(groups);
            
            groupedData.sort((a, b) => {
                const parseDate = (str) => {
                    const [d, t] = str.split(', ');
                    const [day, month, year] = d.split('/');
                    const [hour, minute] = t.split(':');
                    return new Date(year, month - 1, day, hour, minute);
                };
                return parseDate(b.datetime) - parseDate(a.datetime);
            });

            setItems(groupedData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, []);

  const openDetail = (item) => setSelectedItem(item);
  const backToList = () => setSelectedItem(null);

  const deleteSelected = () => {
    if (!selectedItem) return;

    Alert.alert("Delete", "ต้องการลบรายการนี้ใช่ไหม?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const deletePromises = selectedItem.docIds.map(docId => 
                deleteDoc(doc(db, "uploaded_images", docId))
            );
            
            await Promise.all(deletePromises);

            setItems((prev) => prev.filter((x) => x.id !== selectedItem.id));
            setSelectedItem(null);
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "ลบข้อมูลไม่สำเร็จ");
          }
        },
      },
    ]);
  };

  if (selectedItem) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <HeaderBar title={"History Detail"} />
        <HistoryDetailView item={selectedItem} onBack={backToList} onDelete={deleteSelected} />
        <Navbar />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}>
      <HeaderBar title={"History"} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 18,
          paddingBottom: 110,
        }}
        renderItem={({ item }) => (
          <HistoryItemCard item={item} onPress={() => openDetail(item)} />
        )}
      />

      <Navbar />
    </View>
  );
}