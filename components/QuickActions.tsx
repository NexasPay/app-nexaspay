import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from '../utils/colors';
type Action = { label: string; icon: keyof typeof Ionicons.glyphMap; onPress?: () => void };

const actions: Action[] = [
  { label: "Transações", icon: "card-outline" },
  { label: "Nexas Score", icon: "analytics-outline" },
  { label: "Pix", icon: "cash-outline" },
]

export default function QuickActions() {
  return (
    <View style={styles.row}>
      {actions.map((a, i) => (
        <Pressable
          key={a.label}
          style={({ pressed }) => [styles.item, pressed && { opacity: 0.85 }]}
          android_ripple={{ color: "rgba(255,255,255,0.06)" }}
          onPress={a.onPress}
        >
          <View style={styles.iconBox}>
            <Ionicons name={a.icon} size={22} color="#DDE6F3" />
          </View>
          <Text style={styles.text}>{a.label}</Text>
          {i < actions.length - 1 && <View style={styles.divider} />}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  item: {
    flex: 1,
    backgroundColor: colors.bgDark2,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    position: "relative",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  text: { color: "#E9EEF7", fontWeight: "700" },
  divider: {
    position: "absolute",
    right: -6,
    top: 10,
    bottom: 10,
    width: 1,
    backgroundColor: "#222C3D",
    borderRadius: 1,
  },
});
