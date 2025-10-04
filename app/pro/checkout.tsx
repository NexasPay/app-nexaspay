// app/checkout.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from '../../utils/colors';

export default function CheckoutPro() {
  const router = useRouter();

  const handlePurchase = () => {
    Alert.alert("Compra simulada", "Assinatura Nexas AI Pro ativada (teste).", [
      { text: "OK", onPress: () => router.push("/nexasai") },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.lightBg1} />
          </Pressable>
          <Text style={styles.headerTitle}>Nexas AI Pro</Text>
        </View>

        <View style={styles.hero}>
          <Ionicons name="sparkles-outline" size={60} color={colors.primary} />
          <Text style={styles.title}>Desbloqueie o poder total da Nexas AI</Text>
          <Text style={styles.subtitle}>Insights avançados, alertas ilimitados e suporte prioritário.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefícios exclusivos</Text>
          <View style={styles.list}>
            <Feature icon="trending-up-outline" text="Previsões financeiras avançadas" />
            <Feature icon="flash-outline" text="Alertas em tempo real" />
            <Feature icon="document-text-outline" text="Relatórios mensais em PDF" />
            <Feature icon="headset-outline" text="Atendimento prioritário 24/7" />
            <Feature icon="shield-checkmark-outline" text="Segurança extra e backup" />
          </View>
        </View>

        <View style={styles.priceBox}>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text style={styles.priceValue}>$10</Text>
            <Text style={styles.pricePer}>/mês</Text>
          </View>
          <Text style={styles.priceDesc}>Cancelamento fácil a qualquer momento.</Text>
        </View>

        <Pressable style={styles.buyBtn} onPress={handlePurchase}>
          <Text style={styles.buyText}>Assinar agora (teste)</Text>
        </Pressable>

        <Pressable style={styles.backToApp} onPress={() => router.push("/nexasai")}>
          <Text style={styles.backToAppText}>Voltar ao Nexas AI</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Feature({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.feature}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDark4 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backBtn: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: colors.bgDark3, backgroundColor: "rgba(255,255,255,0.06)",
  },
  headerTitle: { color: "#fff", fontWeight: "900", fontSize: 22, marginLeft: 12 },

  hero: { alignItems: "center", marginTop: 20, marginBottom: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800", textAlign: "center", marginTop: 14, lineHeight: 26 },
  subtitle: { color: colors.lightBg2, textAlign: "center", fontSize: 14, marginTop: 6, lineHeight: 20 },

  section: { marginTop: 26 },
  sectionTitle: { color: colors.lightBg1, fontWeight: "800", fontSize: 15, marginBottom: 10 },
  list: { gap: 10 },
  feature: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { color: colors.lightBg1, fontSize: 13, flex: 1, lineHeight: 20 },

  priceBox: { marginTop: 32, alignItems: "center", justifyContent: "center" },
  priceValue: { color: colors.primary, fontSize: 36, fontWeight: "900", lineHeight: 36 },
  pricePer: { color: colors.primary, fontSize: 16, fontWeight: "900", marginLeft: 6, marginBottom: 4 },
  priceDesc: { color: colors.lightBg2, fontSize: 13, marginTop: 6 },

  buyBtn: { marginTop: 30, backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  buyText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  backToApp: { marginTop: 18, borderWidth: 1, borderColor: colors.bgDark3, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  backToAppText: { color: colors.lightBg1, fontWeight: "700" },
});
