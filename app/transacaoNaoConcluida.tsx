import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router"; // Certifique-se de importar corretamente

function formatBRL(v?: string) {
  const n = Number(v ?? "0");
  try {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch {
    return `R$ ${n.toFixed(2).replace(".", ",")}`;
  }
}

const successGreen = "#22C55E"; // Cor de sucesso (verde)

export default function ComprovanteScreen() {
  const { valor, nome, chave, banco, data, hora, txid } = useLocalSearchParams();
  const router = useRouter(); // Usando o hook useRouter para navegação

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="receipt-outline" size={18} color="#fff" />
          <Text style={styles.headerTitle}>Transferência Concluída</Text>
        </View>
      </View>

      {/* Check + Info */}
      <View style={styles.center}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={70} color="#fff" />
        </View>
        <Text style={styles.status}>Pix Efetuado</Text>
        <Text style={styles.amount}>{formatBRL(String(valor))}</Text>
      </View>

      {/* Seção Detalhes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalhes</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Data do pagamento</Text>
          <Text style={styles.value}>{String(data ?? "—")}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Horário</Text>
          <Text style={styles.value}>{String(hora ?? "—")}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ID da transação</Text>
          <Text style={styles.value}>{String(txid ?? "—")}</Text>
        </View>
      </View>

      <Text style={styles.divider}>-----------------------------------------------------</Text>

      {/* Seção Destinatário */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destinatário</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Destinatário</Text>
          <Text style={styles.value}>{String(nome ?? "—")}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Chave ou conta</Text>
          <Text
            style={[styles.value, { maxWidth: "65%" }]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {String(chave ?? "—")}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Destino</Text>
          <Text style={styles.value}>{String(banco ?? "NexasPay")}</Text>
        </View>
      </View>

      {/* Button to go home */}
      <Pressable style={styles.homeBtn} onPress={() => router.push('/home')}>
        <Text style={styles.homeBtnText}>Retornar à Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0E1114", // Fundo escuro
    paddingTop: 50,
    paddingHorizontal: 22,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  // Center
  center: { alignItems: "center", marginBottom: 22 },
  checkCircle: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: successGreen,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  status: { color: "#fff", fontSize: 18, fontWeight: "700" },
  amount: {
    color: "#00D1FF", // Cor azul clara
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },

  // Section
  section: {
    backgroundColor: "#1F2937", // Cor cinza escuro
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2D3748", // Cor mais escura
    marginBottom: 16,
  },
  sectionTitle: { color: "#fff", fontSize: 15, fontWeight: "700", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: { color: "#D1D5DB", fontSize: 13 },
  value: { color: "#fff", fontSize: 14, fontWeight: "700" },

  // Divider
  divider: {
    color: "#D1D5DB", // Cor suave para o divisor
    opacity: 0.5,
    textAlign: "center",
    marginVertical: 6,
    fontSize: 12,
    padding: 20,
  },

  // Button to return home
  homeBtn: {
    backgroundColor: "#00D1FF", // Cor do botão azul claro
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    padding: 12,
  },
  homeBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
