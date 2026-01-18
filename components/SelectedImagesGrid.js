import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SelectedImagesGrid({
  images = [],
  selectedIds = [],
  onToggleSelect,
  onDeleteSelected,
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <Text style={styles.small}>
          Select Images ({selectedIds.length} selected)
        </Text>

        <TouchableOpacity style={styles.deleteRow} onPress={onDeleteSelected} activeOpacity={0.85}>
          <Ionicons name="trash" size={16} color="#ef4444" />
          <Text style={styles.deleteText}>Delete selected</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {images.map((img) => {
          const picked = selectedIds.includes(img.id);
          return (
            <TouchableOpacity
              key={img.id}
              style={[styles.tile, picked && styles.tilePicked]}
              onPress={() => onToggleSelect(img.id)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: img.uri }} style={styles.img} />
              <View style={[styles.check, picked && styles.checkPicked]}>
                <Ionicons name={picked ? "checkmark" : "ellipse-outline"} size={14} color={picked ? "#fff" : "#111827"} />
              </View>
              <Text style={styles.caption} numberOfLines={1}>
                {img.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, marginTop: 10 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  small: { fontSize: 12, color: "#374151", fontWeight: "700" },
  deleteRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  deleteText: { color: "#ef4444", fontWeight: "800", fontSize: 12 },

  grid: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  tile: {
    width: "30%",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  tilePicked: { borderColor: "#2A64A8", borderWidth: 2 },
  img: { width: "100%", height: 70, backgroundColor: "#f3f4f6" },
  caption: { padding: 6, fontSize: 10, color: "#6b7280" },
  check: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkPicked: { backgroundColor: "#2A64A8" },
});
