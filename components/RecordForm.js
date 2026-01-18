import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";

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
        <Text style={{ fontWeight: "900", color: "#0F2C42" }}>{"< Back"}</Text>
      </TouchableOpacity>

      <View style={styles.panel}>
        <Text style={styles.h}>Results of the Analysis</Text>

        <View style={styles.grid}>
          {selectedImages.slice(0, 9).map((img) => (
            <View key={img.id} style={styles.gridItem}>
              {/* กล่องใส่รูปภาพ */}
              <View style={styles.thumbBox}>
                <Image 
                  source={{ uri: img.uri }} 
                  style={styles.img} 
                  resizeMode="cover"
                />
              </View>
              {/* ชื่อไฟล์ใต้รูป */}
              <Text style={styles.imgName} numberOfLines={1}>
                {img.name}
              </Text>
            </View>
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
  backBtn: { marginBottom: 10 },

  panel: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 22,
    padding: 14,
  },
  h: { textAlign: "center", fontWeight: "900", color: "#0F2C42", marginBottom: 12 },
  
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridItem: { width: "30%", marginBottom: 12 },
  
  thumbBox: {
    width: "100%",
    height: 80, // กำหนดความสูงให้ชัดเจน
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    overflow: "hidden", // เพื่อให้รูปไม่ล้นขอบโค้ง
  },
  img: {
    width: "100%",
    height: "100%",
  },
  imgName: {
    marginTop: 4,
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },

  formBox: {
    marginTop: 14,
    backgroundColor: "#bfe3f7",
    borderRadius: 18,
    padding: 14,
  },
  lab: { fontWeight: "800", color: "#0091ff", marginBottom: 6, marginTop: 10 },
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
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    height: 44,
    borderRadius: 999,
    backgroundColor: "#9ca3af",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { color: "#fff", fontWeight: "900" },
});