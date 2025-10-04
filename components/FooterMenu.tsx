import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FooterMenuProps = {
  active?: "home" | "carteiras" | "nexasai" | "opcoes";
};

export default function FooterMenu({ active = "home" }: FooterMenuProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, Platform.OS === "android" ? 12 : 8);

  const Item = ({
    label,
    icon,
    route,
    isActive,
  }: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: string;
    isActive: boolean;
  }) => (
    <TouchableOpacity style={styles.item} onPress={() => router.push(route)}>
      <Ionicons name={icon} size={22} color={isActive ? "#4DA6FF" : "#BDBDBD"} />
      <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.wrap, { paddingBottom: bottomPad }]}>
      <View style={styles.container}>
        <Item label="Home" icon="home-outline" route="/home" isActive={active === "home"} />
        <Item label="Carteiras" icon="wallet-outline" route="/carteiras" isActive={active === "carteiras"} />
        <Item label="Nexas AI" icon="sparkles-outline" route="/nexasai" isActive={active === "nexasai"} />
        <Item label="Opções" icon="settings-outline" route="/opcoes" isActive={active === "opcoes"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#0E1218",
    borderTopWidth: 1,
    borderTopColor: "#1E2633",
    paddingTop: 8,
    // fica acima de overlays / nav bar
    zIndex: 50,
    elevation: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },
  item: { flex: 1, alignItems: "center", gap: 4 },
  label: { fontSize: 12, color: "#BBB" },
  activeLabel: { color: "#4DA6FF", fontWeight: "600" },
});
