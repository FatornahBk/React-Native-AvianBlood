import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PredictionResultsCard({
  stain,
  result,
  onPrev,
  onNext,
  onSaveAll,
  totalCount = 0,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.hTitle}>Prediction Results</Text>

        <TouchableOpacity onPress={onSaveAll} style={styles.saveBtn} activeOpacity={0.85}>
          <Text style={styles.saveText}>save</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.saveHint}>Save all predicted: {totalCount}</Text>

      <View style={styles.subRow}>
        <Text style={styles.subText}>Image Name : </Text>
        <Text style={[styles.subText, { fontWeight: "800" }]}>{result.imageName}</Text>
      </View>

      <View style={styles.viewer}>
        <TouchableOpacity onPress={onPrev} style={[styles.arrow, { left: 0 }]} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>

        <Image source={{ uri: result.previewUri }} style={styles.preview} />

        <TouchableOpacity onPress={onNext} style={[styles.arrow, { right: 0 }]} activeOpacity={0.8}>
          <Ionicons name="chevron-forward" size={22} color="#111827" />
        </TouchableOpacity>

        <View style={styles.pager}>
          <Text style={styles.pagerText}>{result.pageText}</Text>
        </View>
      </View>

      <View style={styles.mini}>
        <Text style={styles.miniLeft}>Stain Type</Text>
        <Text style={styles.miniRight}>{stain}</Text>
      </View>

      {result.summary.map((row, idx) => (
        <View key={idx} style={styles.mini}>
          <Text style={styles.miniLeft}>{row.label}</Text>
          <Text style={styles.miniRight}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  hTitle: { fontWeight: "900", color: "#111827" },
  saveBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  saveText: { fontWeight: "900", color: "#111827" },
  saveHint: { marginTop: 8, fontSize: 11, color: "#6b7280", fontWeight: "700" },

  subRow: { flexDirection: "row", marginTop: 8, marginBottom: 10 },
  subText: { fontSize: 11, color: "#6b7280" },

  viewer: {
    height: 170,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: { width: 150, height: 150, borderRadius: 12, backgroundColor: "#ddd" },

  arrow: { position: "absolute", top: 0, bottom: 0, justifyContent: "center", paddingHorizontal: 10 },
  pager: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pagerText: { fontSize: 10, fontWeight: "900", color: "#111827" },

  mini: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  miniLeft: { color: "#6b7280", fontSize: 12 },
  miniRight: { color: "#111827", fontWeight: "800", fontSize: 12 },
});
