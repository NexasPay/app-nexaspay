import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import FooterMenu from "../components/FooterMenu";
import transactionsicon from "../assets/icons/transaction-icon.png";
import axios from "axios";
import { API_URL } from "@env";

const contacts = [
  { id: 1, name: "João Silva", img: require("../assets/perfil-images/kina-image.png") },
  { id: 2, name: "Maria Oliveira", img: require("../assets/perfil-images/kina-image.png") },
  { id: 3, name: "Lucas Pereira", img: require("../assets/perfil-images/kina-image.png") },
  { id: 4, name: "Ana Costa", img: require("../assets/perfil-images/kina-image.png") },
  { id: 5, name: "Bruno Lima", img: require("../assets/perfil-images/kina-image.png") },
];

export default function Transacoes() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const [fullname, setFullname] = useState('');
  const [message, setMessage] = useState('');

  const pick = (name: string) => {
    setSelectedContact(name);
    setSheetOpen(false);
  };
const findContact = async () => {

   if (!fullname) {
      setMessage("Digite um nome para buscar!");
      return;
    }
     try {
     
      const response = await axios.get(`${API_URL}/find?fullname=${fullname}`);

      if (response.status === 200) {

        setMessage("Usuário encontrado com sucesso!");
      }
    } catch (error) {;
      setMessage("Nenhum usuário encontrado.");
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={transactionsicon} style={{ width: 22, height: 22, tintColor: "#fff" }} />
          <Text style={styles.headerTitle}>Transações</Text>
        </View>

        {/* Ações */}
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>Realizar Pagamento</Text>
          <Ionicons name="chevron-forward" size={18} color="#4DA6FF" />
        </Pressable>

        <Pressable style={styles.actionBtn} onPress={() => setSheetOpen(true)}>
          <Text style={styles.actionText}>Escolher Contatos</Text>
          <Ionicons name="chevron-forward" size={18} color="#4DA6FF" />
        </Pressable>

        {/* Recentes */}
        <Text style={styles.subTitle}>Contatos Recentes</Text>
        <View style={styles.contactRow}>
          {contacts.map((c) => (
            <Pressable key={c.id} onPress={() => pick(c.name)}>
              <Image source={c.img} style={styles.avatar} />
            </Pressable>
          ))}
        </View>

        {/* Selecionado */}
        {selectedContact && (
          <View style={styles.selectedBox}>
            <Text style={styles.selectedText}>Contato selecionado: {selectedContact}</Text>
          </View>
        )}

        <Pressable style={styles.chooseBtn} onPress={() => setSheetOpen(true)}>
          <Text style={styles.chooseText}>Escolher</Text>
        </Pressable>
      </ScrollView>

      {/* ===== Overlay / Sheet (sem Modal) ===== */}
      {sheetOpen && (
        <View style={styles.overlay} pointerEvents="auto">
          {/* fecha ao tocar fora */}
          <TouchableWithoutFeedback onPress={() => setSheetOpen(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Selecione um contato</Text>
              <Pressable onPress={() => setSheetOpen(false)}>
                <Ionicons name="close" size={22} color="#E9EEF7" />
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={{ paddingVertical: 6 }}
              showsVerticalScrollIndicator={false}
            >
              {contacts.map((c) => (
                <Pressable key={c.id} style={styles.contactItem} onPress={() => pick(c.name)}>
                  <Image source={c.img} style={styles.avatarModal} />
                  <Text style={styles.contactName}>{c.name}</Text>
                  {selectedContact === c.name && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      <FooterMenu />
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
  avatar: { width: 44, height: 44, borderRadius: 22 },
  chooseBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#0A1B31",
    paddingHorizontal: 18,
    paddingVertical: 2,
    borderRadius: 20,
  },
  chooseText: { color: "#0673F6", fontWeight: "700", fontSize: 14 },
  selectedBox: {
    backgroundColor: "#0A1B31",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  selectedText: { color: "#E9EEF7", fontWeight: "600" },

  /* ===== Overlay Sheet ===== */
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    zIndex: 1000, // acima do Footer
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sheet: {
    backgroundColor: "#141C27",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "60%",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sheetTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#1E293B",
  },
  avatarModal: { width: 40, height: 40, borderRadius: 20 },
  contactName: { flex: 1, color: "#E9EEF7", fontSize: 16, fontWeight: "600" },
});
