import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NewsCard() {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <View style={styles.brandBox}>
          <Text style={styles.brandN}>N</Text>
        </View>
        <Text style={styles.brandText}>Nexas Notícias</Text>
      </View>

      <Text style={styles.title}>
        Conheça a Inteligência Artificial da NexasPay:{" "}
        <Text style={{ fontWeight: "800" }}>seu assistente financeiro pessoal!</Text>{" "}
        <Ionicons name="sparkles-outline" size={16} color="#E9F3FF" />
      </Text>

      <Text style={styles.desc}>
        Com nossa IA, você recebe dicas inteligentes de economia, controle de gastos em tempo real e
        insights para decisões financeiras mais seguras. Simplifique sua vida financeira com
        tecnologia de ponta!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16202E",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#223049",
  },
  head: { flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 8 },
  brandBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: "#1E8BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  brandN: { color: "#FFF", fontWeight: "900", fontSize: 12, lineHeight: 12 },
  brandText: { color: "#A9C7FF", fontWeight: "700" },
  title: { color: "#F2F7FF", fontSize: 15, fontWeight: "700", marginBottom: 6 },
  desc: { color: "#C5D2E6", fontSize: 12, lineHeight: 18 },
});
