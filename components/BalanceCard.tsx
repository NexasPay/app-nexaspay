import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import {
  useFonts,
  ChivoMono_700Bold,
} from "@expo-google-fonts/chivo-mono";
import {
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function BalanceCard() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false); // Estado para visibilidade do saldo
  const [fontsLoaded] = useFonts({
    ChivoMono_700Bold,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;

  // Função para alternar a visibilidade do saldo
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <LinearGradient
      colors={["#05EFF5", "#79ACEA", "#0673F6"]}
      start={{ x: 0.05, y: 0.2 }}
      style={styles.card}
    >
      <View style={styles.rowTop}>
        <Text style={styles.badge}>Ver saldo</Text>
        <Ionicons name="caret-forward" size={14} color="#fff" />
      </View>

      <View style={{ height: 8 }} />
      
      {/* Exibição do saldo ou máscara */}
      <Text style={styles.amount}>
        {isBalanceVisible ? "R$ 0.000,00" : "************"}
      </Text>

      {/* Ícone de olho para alternar visibilidade */}
      <Pressable onPress={toggleBalanceVisibility} style={styles.eye}>
        <Ionicons
          name={isBalanceVisible ? "eye-off-outline" : "eye-outline"} // Ícone de olho alternando
          size={22}
          color="#F5FBFF"
        />
      </Pressable>
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
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badge: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Roboto_700Bold", // ✅ Aplicado corretamente
  },
  amount: {
    color: "#FFFFFF",
    fontSize: 34,
    fontFamily: "ChivoMono_700Bold", // ✅ Valor com monoespaçada
  },
  eye: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
