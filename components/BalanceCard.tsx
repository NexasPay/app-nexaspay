import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function BalanceCard() {
  return (
    <LinearGradient
      colors={["#22B7F4", "#49C6F2", "#34A1E2"]}
      start={{ x: 0.05, y: 0.2 }}
      end={{ x: 1, y: 0.9 }}
      style={styles.card}
    >
      <View style={styles.rowTop}>
        <Text style={styles.badge}>Ver saldo</Text>
        <Ionicons name="chevron-forward" size={14} color="#EAF6FF" />
      </View>

      <View style={{ height: 8 }} />
      <Text style={styles.amount}>R$ 0 . 000 , 00</Text>

      <Ionicons name="eye-off-outline" size={22} color="#F5FBFF" style={styles.eye} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    minHeight: 120,
    justifyContent: "center",
    shadowColor: "#2BA9FF",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  rowTop: { flexDirection: "row", alignItems: "center", gap: 6 },
  badge: { color: "#EAF6FF", fontSize: 13, fontWeight: "600" },
  amount: { color: "#FFFFFF", fontSize: 28, fontWeight: "800", letterSpacing: 1.5 },
  eye: { position: "absolute", right: 16, bottom: 16 },
});
