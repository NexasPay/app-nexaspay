// app/pro/comprovante.tsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { colors } from "../../utils/colors";
import { navigationItems } from "../../utils/navigationItems";

const successGreen = "#22C55E";

function formatBRL(v?: string) {
  const n = Number(v ?? "0");
  try {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch {
    return `R$ ${n.toFixed(2).replace(".", ",")}`;
  }
}

export default function ComprovanteScreen() {
  const { valor, nome, chave, banco, data, hora, txid } = useLocalSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="receipt-outline" size={18} color="#fff" />
          <Text style={styles.headerTitle}>Concluído</Text>
        </View>

        <Pressable onPress={() => setMenuOpen(!menuOpen)} hitSlop={10}>
          <Ionicons name="menu-outline" size={28} color="#fff" />
        </Pressable>
      </View>

      {/* Menu Overlay */}
      <SideMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)}>
        <SideMenuContent />
      </SideMenuOverlay>

      {/* Check + Info */}
      <View style={styles.center}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={42} color="#fff" />
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

      <Text style={styles.divider}>----------------------------------------------------------</Text>

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
    </View>
  );
}

/* ===================== SideMenu Overlay ===================== */
function SideMenuOverlay({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.spring(slide, { toValue: 0, useNativeDriver: true, bounciness: 6 }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 0,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(slide, { toValue: 20, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [open]);

  if (!open) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { zIndex: 30 }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.35)", opacity: fade },
          ]}
        />
      </Pressable>

      <Animated.View
        style={{
          position: "absolute",
          top: 86,
          right: 16,
          transform: [{ translateY: slide }],
          opacity: fade,
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}

/* ===================== SideMenuContent ===================== */
function SideMenuContent() {
  const router = useRouter();
  const pathname = usePathname();
  const active = useMemo(
    () => navigationItems.find((n) => pathname?.startsWith(n.route))?.key ?? "carteiras",
    [pathname]
  );

  return (
    <View style={smStyles.container}>
      {navigationItems.map((item) => {
        const isActive = item.key === active;
        return (
          <Pressable
            key={item.key}
            onPress={() => router.push(item.route)}
            style={[smStyles.item, isActive && smStyles.itemActive]}
            android_ripple={{ color: "rgba(255,255,255,0.08)", radius: 42 }}
          >
            <Ionicons
              name={item.icon as keyof typeof Ionicons.glyphMap}
              size={22}
              color={isActive ? "#fff" : colors.lightBg1}
              style={{ marginBottom: 6 }}
            />
            <Text
              style={[smStyles.label, { color: isActive ? "#fff" : colors.lightBg1 }]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ===================== Estilos ===================== */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgDark4,
    paddingTop: 50,
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

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
    color: colors.highlight1,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },

  section: {
    backgroundColor: colors.bgDark5,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.bgDark2,
    marginBottom: 16,
  },
  sectionTitle: { color: "#fff", fontSize: 15, fontWeight: "700", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: { color: colors.lightBg1, fontSize: 13 },
  value: { color: "#fff", fontSize: 14, fontWeight: "700" },

  divider: {
    color: colors.lightBg1,
    opacity: 0.5,
    textAlign: "center",
    marginVertical: 6,
    fontSize: 12,
  },
});

const smStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgDark2,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: colors.bgDark3,
    alignItems: "center",
  },
  item: {
    width: 80,
    height: 76,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  itemActive: { backgroundColor: colors.primary },
  label: { fontSize: 11, fontWeight: "700" },
});
