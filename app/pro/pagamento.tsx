// app/pro/pagamento.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

function formatBRL(v?: string) {
  const n = Number(v ?? "0");
  try { return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
  catch { return `R$ ${n.toFixed(2).replace(".", ",")}`; }
}

export default function PagamentoScreen() {
  const { chave, nome, cidade, valor, txid, banco } = useLocalSearchParams();
  const router = useRouter();

  const handleConfirm = () => {
    const now = new Date();
    const dataPagamento = now.toLocaleDateString("pt-BR", {
      weekday: "long", day: "2-digit", month: "2-digit", year: "numeric",
    });
    const horario = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const idTransacao = String(txid ?? `TRN${now.getTime().toString().slice(-9)}`);

    router.push({
      pathname: "/pro/comprovante",
      params: {
        valor: String(valor ?? "0.00"),
        nome: String(nome ?? "—"),
        cidade: String(cidade ?? "—"),
        chave: String(chave ?? "—"),
        banco: String(banco ?? "NexasPay"),
        data: dataPagamento,
        hora: horario,
        txid: idTransacao,
      },
    });
  };

  return (
    <View style={styles.screen}>
      {/* Header simples */}
      <View style={styles.header}>
        <Ionicons name="cash-outline" size={22} color="#fff" />
        <Text style={styles.headerTitle}>Pagamento Pix</Text>
      </View>

      {/* Card de resumo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Você está pagando</Text>
        <Text style={styles.amount}>{formatBRL(String(valor))}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Para</Text>
          <Text style={styles.value}>{String(nome ?? "—")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Chave Pix</Text>
          <Text style={styles.value}>{String(chave ?? "—")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Cidade</Text>
          <Text style={styles.value}>{String(cidade ?? "—")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Banco</Text>
          <Text style={styles.value}>{String(banco ?? "NexasPay")}</Text>
        </View>
      </View>

      {/* Ações */}
      <View style={styles.actions}>
        <Pressable style={[styles.btn, styles.cancel]} onPress={() => router.back()}>
          <Text style={styles.btnText}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.confirm]} onPress={handleConfirm}>
          <Text style={styles.btnText}>Confirmar Pagamento</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDark4, padding: 18, paddingTop: 40 },
  header: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  card: {
    backgroundColor: colors.bgDark1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.bgDark2,
  },
  cardTitle: { color: colors.lightBg1, fontSize: 13, marginBottom: 6 },
  amount: {
    color: colors.highlight1,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.bgDark2,
  },
  label: { color: colors.lightBg1, fontSize: 13 },
  value: { color: "#E9EEF7", fontSize: 15, fontWeight: "600", maxWidth: "65%", textAlign: "right" },

  actions: { flexDirection: "row", marginTop: 18, gap: 10 },
  btn: { flex: 1, alignItems: "center", paddingVertical: 14, borderRadius: 12 },
  cancel: { backgroundColor: colors.bgDark2 },
  confirm: { backgroundColor: colors.primary },
  btnText: { color: "#fff", fontWeight: "700" },
});
