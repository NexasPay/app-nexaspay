import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import homeicon from "../assets/icons/home-icon.png";
import walltericon from "../assets/icons/Crypto-Wallet.png";
import nexasia from "../assets/icons/nexas-ia.png";
import optionsicon from "../assets/icons/options-icon.png";
import search from "../assets/icons/search-icon.png";
import { colors } from "../utils/colors";

type FooterMenuProps = {
  active?: "home" | "wallet" | "nexasai" | "opcoes";
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
    image,
  }: {
    label?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    route: string;
    image?: any;
    isActive?: boolean;
  }) => {
    const isSearch = image === search; // identifica o botão central

    return (
      <TouchableOpacity style={styles.item} onPress={() => router.push(route)}>
        {image ? (
          isSearch ? (
            <View style={styles.searchCircle}>
              <Image
                source={image}
                style={{ width: 24, height: 24, tintColor: "#fff" }}
                resizeMode="contain"
              />
            </View>
          ) : (
            <Image
              source={image}
              style={{ width: 22, height: 22, tintColor: colors.iconsFooter }}
              resizeMode="contain"
            />
          )
        ) : (
          <Ionicons name={icon!} size={22} color={colors.iconsFooter} />
        )}
        {label && <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.wrap, { paddingBottom: bottomPad }]}>
      <View style={styles.container}>
        <Item label="Home" image={homeicon} route="/home" />
        <Item label="Carteiras" image={walltericon} route="/wallet" />
        {/* 👇 botão central atualizado */}
        <Item image={search} isActive={active === "wallet"} route="/scan" />
        <Item label="Nexas AI" image={nexasia} route="/nexasai" />
        <Item label="Opções" image={optionsicon} route="/opcoes" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.bgDark1,
    paddingTop: 8,
    zIndex: 50,
    elevation: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },
  item: { flex: 1, alignItems: "center", gap: 4 },
  label: { fontSize: 12, fontWeight: "600", color: colors.iconsFooter },
  activeLabel: { color: colors.iconsFooter, fontWeight: "600" },
  searchCircle: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
});
