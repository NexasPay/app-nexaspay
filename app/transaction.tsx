import React from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import FooterMenu from "../components/FooterMenu"; // se você usa footer fixo
import transactionsicon from "../assets/icons/transaction-icon.png"
const contacts = [
  require("../assets/perfil-images/kina-image.png"),
  require("../assets/perfil-images/kina-image.png"),
  require("../assets/perfil-images/kina-image.png"),
  require("../assets/perfil-images/kina-image.png"),
  require("../assets/perfil-images/kina-image.png"),

];

export default function Transacoes() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
 
        <View style={styles.header}>
          <Image source={transactionsicon} style={{ width: 22, height: 22, tintColor: '#fff'}} />
          <Text style={styles.headerTitle}>Transações</Text>
        </View>

        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>Realizar Pagamento</Text>
          <Ionicons name="chevron-forward" size={18} color="#4DA6FF" />
        </Pressable>

        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>Escolher Contatos</Text>
          <Ionicons name="chevron-forward" size={18} color="#4DA6FF" />
        </Pressable>


        <Text style={styles.subTitle}>Contatos Recentes</Text>
        <View style={styles.contactRow}>
          {contacts.map((c, i) => (
            <Image key={i} source={c} style={styles.avatar} />
          ))}
        </View>

        <Pressable style={styles.chooseBtn}>
          <Text style={styles.chooseText}>Escolher</Text>
        </Pressable>
      </ScrollView>


      <FooterMenu/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B111A",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  actionBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0673F6",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  actionText: {
    color: "#E9EEF7",
    fontSize: 15,
    fontWeight: "700",
  },
  subTitle: {
    color: "#E9EEF7",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 14,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  chooseBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#0A1B31",
    paddingHorizontal: 18,
    paddingVertical: 2,
    borderRadius: 20,
  },
  chooseText: {
    color: "#0673F6",
    fontWeight: "700",
    fontSize: 14,
  },
});

