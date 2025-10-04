import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FooterMenu from "../components/FooterMenu"; // usa o seu footer padrão

export default function Extract() {
  const transactions = [
    {
      id: "1",
      type: "Pix Recebido",
      user: "Leonardo Kina",
      amount: "R$ 15,99",
      date: "30/09/25",
      icon: "logo-bitcoin",
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
      icon: "logo-bitcoin",
    },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        <Text style={styles.title}>Últimas Transações</Text>
        <Ionicons name="search-outline" size={18} color="#fff" style={styles.searchIcon} />

        <View style={styles.list}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.iconBox}>
                  <Ionicons name={tx.icon as any} size={22} color="#4DA6FF" />
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

      <FooterMenu active="carteiras" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B111A",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  searchIcon: {
    position: "absolute",
    top: 18,
    right: 28,
  },
  list: {
    marginTop: 8,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(77,166,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textBox: {
    flex: 1,
  },
  type: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  user: {
    color: "#A3B8CC",
    fontSize: 13,
    marginTop: 2,
  },
  amountBox: {
    alignItems: "flex-end",
  },
  amount: {
    color: "#4DA6FF",
    fontSize: 14,
    fontWeight: "700",
  },
  date: {
    color: "#A3B8CC",
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

