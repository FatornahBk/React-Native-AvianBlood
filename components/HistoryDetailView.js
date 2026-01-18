import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ResultTable from "./ResultTable";

export default function HistoryDetailView({ item, onBack, onDelete }) {
  const [currentImage, setCurrentImage] = useState(null);

  const imageList = useMemo(() => {
    if (item?.images && item.images.length > 0) {
      return item.images;
    }
    return item?.thumbnailUri ? [item.thumbnailUri] : [];
  }, [item]);

  useEffect(() => {
    if (imageList.length > 0) {
      setCurrentImage(imageList[0]);
    }
  }, [imageList]);

  const rows = useMemo(() => {
    return item?.results; 
  }, [item]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 110 }}>
      <View style={styles.detailBox}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={18} color="#0F2C42" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
            <Ionicons name="trash" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item?.title ?? ""}
        </Text>
        <Text style={styles.datetime}>{item?.datetime ?? ""}</Text>

        <View style={styles.previewBox}>
          {!!currentImage ? (
            <Image source={{ uri: currentImage }} style={styles.previewImg} />
          ) : (
            <View style={styles.previewImg} />
          )}

          <View style={styles.thumbStrip}>
            <Ionicons name="chevron-back" size={18} color="#111827" />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4 }}
            >
              <View style={styles.smallThumbRow}>
                {imageList.map((imgUri, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setCurrentImage(imgUri)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: imgUri }}
                      style={[
                        styles.smallThumb,
                        currentImage === imgUri && styles.smallThumbActive,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Ionicons name="chevron-forward" size={18} color="#111827" />
          </View>
        </View>

        {rows && rows.length > 0 && (
          <View style={{ marginTop: 14 }}>
            <ResultTable rows={rows} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailBox: {
    borderWidth: 1.5,
    borderColor: "#2A64A8",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
  },

  title: { marginTop: 10, fontSize: 14, fontWeight: "700", color: "#111827" },
  datetime: { marginTop: 6, fontSize: 11, color: "#6b7280" },

  previewBox: {
    marginTop: 10,
    borderWidth: 1.2,
    borderColor: "#111",
    height: 290,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
  },
  previewImg: { width: "100%", height: "100%", resizeMode: "cover" },

  thumbStrip: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 54,
    backgroundColor: "rgba(191, 191, 191, 0.85)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  smallThumbRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  smallThumb: {
    width: 26,
    height: 26,
    backgroundColor: "#d1d5db",
    borderRadius: 3,
  },
  smallThumbActive: {
    backgroundColor: "#e5e7eb",
    borderWidth: 1.5,
    borderColor: "#111827",
  },
});
