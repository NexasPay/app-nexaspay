import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const cards = [
  {
    uri: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop",
    title: "Indique NexasPay para amigos",
    subtitle: "Leve a NexasPay para todos!",
  },
  {
    uri: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
    title: "Sua vida financeira, mais fácil.",
    subtitle: "Pagamentos digitais rápidos, seguros e práticos.",
  },
];

export default function PromoGrid() {
  return (
    <View style={styles.row}>
      {cards.map((c) => (
        <Pressable key={c.title} style={styles.card}>
          <Image source={{ uri: c.uri }} style={styles.img} />
          <LinearGradient
            colors={["rgba(0,0,0,0.55)", "transparent"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.textBox}>
            <Text style={styles.title}>{c.title}</Text>
            <Text style={styles.subtitle}>{c.subtitle}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  card: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1B2330",
  },
  img: { width: "100%", height: "100%" },
  textBox: { position: "absolute", left: 10, bottom: 10, right: 10 },
  title: { color: "#FFFFFF", fontWeight: "800", fontSize: 13, marginBottom: 2 },
  subtitle: { color: "#D9E2F2", fontSize: 11 },
});
