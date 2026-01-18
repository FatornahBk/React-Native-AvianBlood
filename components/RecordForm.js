import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function RecordForm({
  selectedImages = [],
  form,
  setForm,
  onSave,
  onBack,
}) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.85}>
        <Text style={{ fontWeight: "900" }}></Text>
      </TouchableOpacity>

      <View style={styles.panel}>
        <Text style={styles.h}>Results of the Analysis</Text>

        <View style={styles.grid}>
          {selectedImages.slice(0, 9).map((img) => (
            <View key={img.id} style={styles.tile} />
          ))}
        </View>
      </View>

      <View style={styles.formBox}>
        <Text style={styles.lab}>Name/Chicken ID</Text>
        <TextInput
          value={form.chickenId}
          onChangeText={(t) => setForm((p) => ({ ...p, chickenId: t }))}
          placeholder="e.g., AC-HET01, Broiler Chicken"
          style={styles.input}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lab}>Age (days)</Text>
            <TextInput
              value={form.ageDays}
              onChangeText={(t) => setForm((p) => ({ ...p, ageDays: t }))}
              placeholder="17"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.lab}>Weight (g)</Text>
            <TextInput
              value={form.weightG}
              onChangeText={(t) => setForm((p) => ({ ...p, weightG: t }))}
              placeholder="34"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>
        </View>

        <Text style={styles.lab}>Note</Text>
        <TextInput
          value={form.note}
          onChangeText={(t) => setForm((p) => ({ ...p, note: t }))}
          placeholder=""
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          multiline
        />

        <TouchableOpacity onPress={onSave} style={styles.saveBtn} activeOpacity={0.9}>
          <Text style={styles.saveText}>Save & Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 110 },
  backBtn: { width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.8)", alignItems: "center", justifyContent: "center" },

  panel: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 22,
    padding: 14,
  },
  h: { textAlign: "center", fontWeight: "900", color: "#2A64A8", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-between" },
  tile: { width: "30%", height: 70, borderRadius: 12, backgroundColor: "#e5e7eb" },

  formBox: {
    marginTop: 14,
    backgroundColor: "#bfe3f7",
    borderRadius: 18,
    padding: 14,
  },
  lab: { fontWeight: "800", color: "#111827", marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  row: { flexDirection: "row", gap: 10 },

  saveBtn: {
    marginTop: 14,
    alignSelf: "center",
    width: 180,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#9ca3af",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { color: "#fff", fontWeight: "900" },
});
