import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { navigationItems } from "../utils/navigationItems";

const COLORS = {
  bg: "#141C27",
  border: "#1E293B",
  active: "#4DA6FF",
  text: "#E9EEF7",
  textDim: "#9AA5B5",
};

export default function SideMenu({ active }: { active?: string }) {
  return (
    <View style={styles.container}>
      {navigationItems.map((item) => {
        const isActive = active === item.key;
        return (
          <Link key={item.key} href={item.route} asChild>
            <Pressable style={[styles.item, isActive && styles.itemActive]}>
              <Ionicons
                name={item.icon as any}
                size={24}
                color={isActive ? "#fff" : COLORS.textDim}
              />
              <Text
                style={[
                  styles.label,
                  { color: isActive ? "#fff" : COLORS.textDim },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
    right: 16,
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    zIndex: 100,
    elevation: 20,
  },
  item: {
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  itemActive: { backgroundColor: COLORS.active },
  label: { fontSize: 11, marginTop: 4, fontWeight: "600" },
});
