import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StainSelector({ stain, onChange }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Select Stain Type</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, stain === "Wright" && styles.btnActive]}
          onPress={() => onChange("Wright")}
          activeOpacity={0.85}
        >
          <Ionicons name="water" size={18} color={stain === "Wright" ? "#fff" : "#111827"} />
          <Text style={[styles.btnText, stain === "Wright" && styles.btnTextActive]}>WrightStain</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, stain === "Giemsa" && styles.btnActive]}
          onPress={() => onChange("Giemsa")}
          activeOpacity={0.85}
        >
          <Ionicons name="water" size={18} color={stain === "Giemsa" ? "#fff" : "#111827"} />
          <Text style={[styles.btnText, stain === "Giemsa" && styles.btnTextActive]}>Giemsa Stain</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 12 },
  label: { fontSize: 14, fontWeight: "700", color: "#111827", marginBottom: 10 },
  row: { flexDirection: "row", gap: 12 },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  btnActive: { backgroundColor: "#2A64A8", borderColor: "#2A64A8" },
  btnText: { fontWeight: "800", color: "#111827" },
  btnTextActive: { color: "#fff" },
});
