import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FooterMenu from "../components/FooterMenu";
import { colors } from "utils/colors";
import pixicons from "../assets/icons/pix-icons.png"; // ✅ sua imagem

export default function Extract() {
  const transactions = [
    {
      id: "1",
      type: "Pix Recebido",
      user: "Leonardo Kina",
      amount: "R$ 15,99",
      date: "30/09/25",
      icon: "pix", // marcador pro Pix
    },
    {
      id: "2",
      type: "Pagamento Efetuado",
      user: "Diogo Pelinson",
      amount: "R$ 15,99",
      date: "29/09/25",
      icon: "card-outline",
    },
    {
      id: "3",
      type: "Pagamento Recebido",
      user: "Pedro Santos",
      amount: "R$ 29,99",
      date: "29/09/25",
      icon: "card-outline",
    },
    {
      id: "4",
      type: "Pix Efetuado",
      user: "Luís Felipe Scacchetti",
      amount: "R$ 10,00",
      date: "28/09/25",
      icon: "pix",
    },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingTop: 50 }}
      >
        {/* 🔍 Título com ícone de lupa */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Últimas Transações</Text>
          <Ionicons
            name="search-outline"
            size={22}
            color="#fff"
            style={styles.searchIcon}
          />
        </View>

        <View style={styles.list}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.iconBox}>
                  {tx.icon === "pix" ? (
                    <Image
                      source={pixicons}
                      style={styles.pixIcon}
                      resizeMode="contain"
                    />
                  ) : (
                    <Ionicons
                      name={tx.icon as any}
                      size={22}
                      color="#4DA6FF"
                    />
                  )}
                </View>

                <View style={styles.textBox}>
                  <Text style={styles.type}>{tx.type}</Text>
                  <Text style={styles.user}>{tx.user}</Text>
                </View>

                <View style={styles.amountBox}>
                  <Text style={styles.amount}>{tx.amount}</Text>
                  <Text style={styles.date}>{tx.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mostrar Extrato Completo</Text>
        </TouchableOpacity>
      </ScrollView>

      <FooterMenu active="wallet" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B111A",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  searchIcon: {
    marginLeft: 8,
  },
  list: {
    marginTop: 8,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.bgDark5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  pixIcon: {
    width: 28, // tamanho ideal pra caber no box
    height: 28,
  },
  textBox: {
    flex: 1,
  },
  type: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  user: {
    color: "#A3B8CC",
    fontSize: 12,
    marginTop: 2,
  },
  amountBox: {
    alignItems: "flex-end",
  },
  amount: {
    color: colors.highlight1,
    fontSize: 14,
    fontWeight: "700",
  },
  date: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
