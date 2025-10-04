import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FooterMenu from "../components/FooterMenu";
import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import NewsCard from "../components/NewsCard";
import PromoGrid from "../components/PromoGrid";



import { useSafeAreaInsets } from "react-native-safe-area-context";
const PlaceholderImage = require('../assets/perfil-images/kina-image.png');


const getHours = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Bom dia!";
  if (currentHour < 18) return "Boa tarde!";
  return "Boa noite!";
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const greeting = getHours();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: 100 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userBox}>
            <Image
              source={ PlaceholderImage }
              style={styles.avatar}
            />
            <View>
              <Text
               
              style={styles.hello}>{greeting}</Text>
              <Text style={styles.username}>Usuário</Text>
            </View>
          </View>

          <View style={styles.bellWrap}>
            <Ionicons name="notifications-outline" size={22} color="#E6F0FF" />
            <View style={styles.badgeDot} />
          </View>
        </View>

        {/* Saldo */}
        <BalanceCard />

        {/* Quick actions */}
        <View style={{ height: 10 }} />
        <QuickActions />

        {/* News */}
        <View style={{ height: 18 }} />
        <NewsCard />

        {/* Promos */}
        <View style={{ height: 18 }} />
        <PromoGrid />

        <View style={{ height: 18 }} />
      </ScrollView>

      {/* Footer fixo */}
      <FooterMenu active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0B111A", paddingTop: 35 },
  scroll: { padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  userBox: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  hello: { color: "#AFC2DC", fontSize: 12, marginBottom: 2 },
  username: { color: "#4DA6FF", fontSize: 18, fontWeight: "800" },

  bellWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#141C27",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  badgeDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
  },
});
