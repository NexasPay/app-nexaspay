// app/nexasai.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Easing,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";
import { navigationItems } from "../utils/navigationItems";
import { colors } from "../utils/colors";

const BrandLogo = require("../assets/logo/logon.png");

type SheetKey = "conheca" | "sobre" | "pro" | null;

export default function NexasAI() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheet, setSheet] = useState<SheetKey>(null);
  const CHAT_H = 56;

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: insets.top + 8,
          paddingBottom: CHAT_H + 28 + insets.bottom,
        }}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <ProPill onPress={() => setSheet("pro")} />
          <Pressable
            onPress={() => setMenuOpen(v => !v)}
            style={({ pressed }) => [styles.hambtn, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          >
            <Ionicons name="menu-outline" size={26} color={colors.lightBg1} />
          </Pressable>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <LogoBox />
          <Text style={styles.heroWelcome}>Bem vindo ao</Text>
          <Text style={styles.heroTitle}>Nexas AI</Text>
        </View>

        {/* Grid – 2 cards do figma */}
        <View style={styles.gridRow}>
          <InfoCard
            title="Conheça o app"
            subtitle="Saiba de tudo"
            onPress={() => setSheet("conheca")}
          />
          <InfoCard
            title="Sobre o Nexas AI"
            subtitle="Descubra como opero"
            onPress={() => setSheet("sobre")}
          />
        </View>
      </ScrollView>

      {/* Chat input fixo (sem o botão +) */}
      <ChatBar insetsBottom={insets.bottom} />

      {/* Side menu (hamburger) */}
      <SideMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)}>
        <SideMenuContent />
      </SideMenuOverlay>

      {/* Sheets enriquecidos */}
      <BottomSheet
        visible={sheet === "conheca"}
        title="Conheça o app"
        onClose={() => setSheet(null)}
      >
        <SheetSection title="Visão geral">
          <Feature text="Dashboard com saldo, notícias e atalhos" icon="home-outline" />
          <Feature text="Transações e Pix em poucos toques" icon="card-outline" />
          <Feature text="Score financeiro e dicas inteligentes" icon="analytics-outline" />
        </SheetSection>

        <SheetSection title="Atalhos úteis">
          <Feature text="Carteiras para organizar metas" icon="wallet-outline" />
          <Feature text="Favoritos e widgets de ações" icon="star-outline" />
        </SheetSection>

        <SheetSection title="Privacidade">
          <Feature text="Seus dados cifrados em repouso e trânsito" icon="shield-checkmark-outline" />
          <Feature text="Controle de permissões por recurso" icon="lock-closed-outline" />
        </SheetSection>

        <SheetCTA
            primary={{ label: "Quero o Pro", onPress: (router) => router.push("app/pro/checkout") }}
            secondary={{ label: "Ver depois", onPress: () => setSheet(null) }}
        />

      </BottomSheet>

      <BottomSheet
        visible={sheet === "sobre"}
        title="Sobre o Nexas AI"
        onClose={() => setSheet(null)}
      >
        <SheetSection title="Como funciona">
          <Feature text="Analisa gastos e renda em tempo real" icon="pulse-outline" />
          <Feature text="Detecta padrões e envia alertas" icon="notifications-outline" />
          <Feature text="Gera insights e recomendações" icon="sparkles-outline" />
        </SheetSection>

        <SheetSection title="O que eu analiso">
          <Feature text="Categorias de despesas e recorrências" icon="pie-chart-outline" />
          <Feature text="Fluxo de caixa e metas" icon="trending-up-outline" />
        </SheetSection>

        <SheetSection title="Limites & privacidade">
          <Feature text="Não realizo operações sem sua ação" icon="hand-left-outline" />
          <Feature text="Você decide o que compartilhar" icon="toggle-outline" />
        </SheetSection>

        <SheetCTA
          primary={{ label: "Ver exemplos", onPress: () => {} }}
          secondary={{ label: "Configurar IA", onPress: (router) => router.push("/opcoes") }}
        />
      </BottomSheet>

      <BottomSheet
        visible={sheet === "pro"}
        title="Nexas AI Pro"
        onClose={() => setSheet(null)}
      >
        <SheetSection title="O que você ganha">
          <Feature text="Insights avançados e previsões" icon="rocket-outline" />
          <Feature text="Alertas inteligentes ilimitados" icon="flash-outline" />
          <Feature text="Relatórios PDF mensais" icon="document-text-outline" />
          <Feature text="Prioridade no suporte" icon="headset-outline" />
        </SheetSection>

        <SheetSection title="Planos">
          <Feature text="Mensal – cancele quando quiser" icon="calendar-outline" />
          <Feature text="Desconto anual exclusivo" icon="pricetag-outline" />
        </SheetSection>

        <SheetCTA
          primary={{ label: "Quero o Pro", onPress: () => {} }}
          secondary={{ label: "Ver depois", onPress: () => {} }}
        />
      </BottomSheet>
    </View>
  );
}

/* ============ Side menu ============ */
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
        Animated.timing(fade, { toValue: 0, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(slide, { toValue: 20, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [open]);

  if (!open) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { zIndex: 30 }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.35)", opacity: fade }]}
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

function SideMenuContent() {
  const router = useRouter();
  const pathname = usePathname();
  const active = useMemo(() => navigationItems.find(n => pathname?.startsWith(n.route))?.key ?? "nexasai", [pathname]);

  return (
    <View style={smStyles.container}>
      {navigationItems.map(item => {
        const isActive = item.key === active;
        return (
          <Pressable
            key={item.key}
            onPress={() => router.push(item.route)}
            style={[smStyles.item, isActive && smStyles.itemActive]}
          >
            <Ionicons
              name={item.icon as any}
              size={22}
              color={isActive ? "#fff" : colors.lightBg1}
              style={{ marginBottom: 6 }}
            />
            <Text style={[smStyles.label, { color: isActive ? "#fff" : colors.lightBg1 }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

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

/* ============ BottomSheet base ============ */
function BottomSheet({
  visible,
  title,
  onClose,
  children,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const fade = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(80)).current; // animação maior
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    } else {
      fade.setValue(0);
      y.setValue(80);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { zIndex: 40 }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.35)", opacity: fade }]} />
      </Pressable>

      {/* Sobe mais: ocupa ~80% da altura (top: '12%') */}
      <Animated.View
        style={[
          bsStyles.sheet,
          {
            transform: [{ translateY: y }],
          },
        ]}
      >
        <View style={bsStyles.header}>
          <Text style={bsStyles.title}>{title}</Text>
          <Pressable onPress={onClose} style={bsStyles.close}>
            <Ionicons name="close" size={22} color={colors.lightBg1} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {children}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
}

const bsStyles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 8,
    right: 8,
    top: "12%",          // 👈 puxa mais para cima
    bottom: 8,
    borderRadius: 18,
    backgroundColor: colors.bgDark2,
    borderWidth: 1,
    borderColor: colors.bgDark3,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "800", flex: 1 },
  close: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.bgDark3,
  },
});

/* ============ Elementos do conteúdo dos sheets ============ */
function SheetSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: colors.lightBg1, fontWeight: "800", marginBottom: 8 }}>{title}</Text>
      {children}
    </View>
  );
}

function Feature({ text, icon }: { text: string; icon: any }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={{ color: colors.lightBg1, fontSize: 13, lineHeight: 20, flex: 1 }}>{text}</Text>
    </View>
  );
}

function SheetCTA({
  primary,
  secondary,
}: {
  primary: { label: string; onPress: (router: ReturnType<typeof useRouter>) => void | (() => void) };
  secondary?: { label: string; onPress: (router: ReturnType<typeof useRouter>) => void | (() => void) };
}) {
  const router = useRouter();
  return (
    <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
      <Pressable
        style={({ pressed }) => [
          ctaStyles.primary,
          pressed && { opacity: 0.9, transform: [{ translateY: 1 }] },
        ]}
        onPress={() => primary.onPress(router as any)}
      >
        <Text style={ctaStyles.primaryText}>{primary.label}</Text>
      </Pressable>
      {secondary && (
        <Pressable
          style={({ pressed }) => [
            ctaStyles.secondary,
            pressed && { opacity: 0.92, transform: [{ translateY: 1 }] },
          ]}
          onPress={() => secondary.onPress(router as any)}
        >
          <Text style={ctaStyles.secondaryText}>{secondary.label}</Text>
        </Pressable>
      )}
    </View>
  );
}

const ctaStyles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "800" },
  secondary: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.bgDark3,
  },
  secondaryText: { color: colors.lightBg1, fontWeight: "800" },
});

/* ============ UI blocks ============ */
function ProPill({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pill, pressed && { opacity: 0.9 }]}>
      <Ionicons name="sparkles-outline" size={14} color={colors.primary} />
      <Text style={styles.pillText}>Obter Nexas AI Pro</Text>
    </Pressable>
  );
}

function LogoBox() {
  return (
    <View style={styles.logoWrap}>
      <Image source={BrandLogo} style={styles.logoImage} resizeMode="contain" />
    </View>
  );
}

function InfoCard({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.96 }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.lightBg2} style={styles.cardChevron} />
    </Pressable>
  );
}

function ChatBar({ insetsBottom }: { insetsBottom: number }) {
  return (
    <View style={[chat.container, { paddingBottom: 8 + insetsBottom }]}>
      <View style={chat.inputWrap}>
        <TextInput
          placeholder="Pergunte algo"
          placeholderTextColor={colors.lightBg2}
          style={chat.input}
          returnKeyType="send"
        />
        <Pressable style={chat.send}>
          <Ionicons name="send-outline" size={18} color={colors.lightBg2} />
        </Pressable>
      </View>
    </View>
  );
}

/* ============ Styles ============ */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDark4 },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  pillText: { color: colors.primary, fontWeight: "800", fontSize: 13 },

  hambtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: colors.bgDark3,
  },

  hero: { alignItems: "center", marginTop: 4, marginBottom: 28 },
  heroWelcome: { color: "#fff", fontSize: 28, lineHeight: 32, fontWeight: "700", marginTop: 18 },
  heroTitle: { color: colors.primary, fontSize: 36, lineHeight: 40, fontWeight: "900", marginTop: 2 },

  logoWrap: { width: 90, height: 90, alignItems: "center", justifyContent: "center" },
  logoImage: { width: "86%", height: "86%" },

  gridRow: { flexDirection: "row", gap: 14 },
  card: {
    flex: 1,
    backgroundColor: colors.bgDark2,
    borderWidth: 1,
    borderColor: colors.bgDark3,
    borderRadius: 16,
    padding: 16,
    minHeight: 88,
  },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "800", marginBottom: 6 },
  cardSub: { color: colors.lightBg2, fontSize: 12 },
  cardChevron: { position: "absolute", right: 12, top: 12 },
});

const chat = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrap: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.bgDark2,
    borderWidth: 1,
    borderColor: colors.bgDark3,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  input: { color: "#fff", fontSize: 15, paddingRight: 36 },
  send: {
    position: "absolute",
    right: 10,
    top: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
