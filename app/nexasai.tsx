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
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";

import { navigationItems } from "../utils/navigationItems";
import { colors } from "../utils/colors";
import { sendMessageToAgent, ChatMessage } from "../utils/api";

const BrandLogo = require("../assets/logo/logon.png");

type SheetKey = "conheca" | "sobre" | "pro" | null;
type AgentAction = { type: "NONE" | "NAVIGATE" | "SHOW_SHEET"; route?: string; params?: any };

export default function NexasAI() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheet, setSheet] = useState<SheetKey>(null);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // refs p/ scroll e input
  const scrollRef = useRef<ScrollView>(null);

  // rola pro fim sempre que tiver novas mensagens
  useEffect(() => {
    const t = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 70);
    return () => clearTimeout(t);
  }, [messages, loading]);

  const scrollToEnd = () => scrollRef.current?.scrollToEnd({ animated: true });

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setLoading(true);

    try {
      const res: { reply?: string; action?: AgentAction } = await sendMessageToAgent({
        text,
        history: [...messages, { from: "user", text }],
        user: { id: "local", name: "Usuário" },
      });

      if (res?.reply) {
        setMessages((prev) => [...prev, { from: "ai", text: res.reply! }]);
      }
      if (res?.action?.type === "NAVIGATE" && res.action.route) {
        router.push(res.action.route as any);
      }
    } catch (e) {
      setMessages((prev) => [...prev, { from: "ai", text: "❌ Erro ao falar com a Nexas AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="always"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: insets.top + 10,
            // padding extra para não ficar atrás do ChatBar
            paddingBottom: 120 + insets.bottom,
          }}
        >
          {/* Top bar */}
          <View style={styles.topBar}>
            <ProPill onPress={() => setSheet("pro")} />
            <Pressable
              onPress={() => setMenuOpen((v) => !v)}
              android_ripple={{ color: "rgba(255,255,255,0.08)", radius: 26 }}
              style={({ pressed }) => [
                styles.hambtn,
                pressed && { opacity: 0.9, transform: [{ scale: 0.97 }] },
              ]}
            >
              <Ionicons name="menu-outline" size={26} color={colors.lightBg1} />
            </Pressable>
          </View>

          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.logoWrap}>
              <Image source={BrandLogo} style={styles.logoImage} resizeMode="contain" />
            </View>
            <Text style={styles.heroWelcome}>Bem-vindo ao</Text>
            <Text style={styles.heroTitle}>Nexas AI</Text>
          </View>

          {/* Conversa */}
          {messages.length > 0 && (
            <View style={{ gap: 8, marginBottom: 14 }}>
              {messages.map((m, i) => (
                <View
                  key={`${m.from}-${i}`}
                  style={[
                    styles.msgBubble,
                    m.from === "user" ? styles.msgUser : styles.msgAI,
                  ]}
                >
                  <Text style={{ color: m.from === "user" ? "#fff" : colors.lightBg1 }}>{m.text}</Text>
                </View>
              ))}

              {loading && (
                <View style={[styles.msgBubble, styles.msgAI]}>
                  <ActivityIndicator color={colors.primary} size="small" />
                </View>
              )}
            </View>
          )}

          {/* Grid – 2 cards */}
          <View style={styles.gridRow}>
            <InfoCard title="Conheça o app" subtitle="Saiba de tudo" onPress={() => setSheet("conheca")} />
            <InfoCard title="Sobre o Nexas AI" subtitle="Descubra como opero" onPress={() => setSheet("sobre")} />
          </View>
        </ScrollView>

        {/* Chat input fixo */}
        <ChatBar
          input={input}
          setInput={setInput}
          loading={loading}
          onSend={handleSend}
          insetsBottom={insets.bottom}
          onFocus={scrollToEnd}
        />
      </KeyboardAvoidingView>

      {/* Menu sanduíche */}
      <SideMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)}>
        <SideMenuContent />
      </SideMenuOverlay>

      {/* Sheets */}
      <BottomSheet visible={sheet === "conheca"} title="Conheça o app" onClose={() => setSheet(null)}>
        <SheetSection title="Visão geral">
          <Feature text="Dashboard com saldo, notícias e atalhos" icon="home-outline" />
          <Feature text="Transações e Pix em poucos toques" icon="card-outline" />
          <Feature text="Score financeiro e dicas inteligentes" icon="analytics-outline" />
        </SheetSection>

        <SheetSection title="Atalhos úteis">
          <Feature text="Carteiras para organizar metas" icon="wallet-outline" />
          <Feature text="Favoritos e widgets de ações" icon="star-outline" />
        </SheetSection>

        <SheetCTA
          primary={{ label: "Abrir Carteiras", onPress: (r) => r.push("/carteiras") }}
          secondary={{ label: "Ver opções", onPress: (r) => r.push("/opcoes") }}
        />
      </BottomSheet>

      <BottomSheet visible={sheet === "sobre"} title="Sobre o Nexas AI" onClose={() => setSheet(null)}>
        <SheetSection title="Quem sou eu">
          <Feature text="Sou a IA da NexasPay, criada para simplificar sua vida financeira." icon="sparkles-outline" />
          <Feature text="Aprendo com o seu uso para oferecer experiências personalizadas." icon="bulb-outline" />
        </SheetSection>

        <SheetSection title="Como funciono">
          <Feature text="Analiso suas atividades e transformo dados em insights claros." icon="analytics-outline" />
          <Feature text="Envio alertas úteis no momento certo — sem spam." icon="notifications-outline" />
        </SheetSection>
      </BottomSheet>

      <BottomSheet visible={sheet === "pro"} title="Nexas AI Pro" onClose={() => setSheet(null)}>
        <SheetSection title="Benefícios exclusivos">
          <Feature text="Insights avançados e previsões" icon="rocket-outline" />
          <Feature text="Alertas ilimitados e personalizados" icon="flash-outline" />
          <Feature text="Relatórios PDF mensais" icon="document-text-outline" />
          <Feature text="Suporte prioritário" icon="headset-outline" />
        </SheetSection>

        <SheetCTA
          primary={{ label: "Quero o Pro", onPress: (r) => r.push("/pro/checkout") }}
          secondary={{ label: "Ver depois", onPress: (_r) => setSheet(null) }}
        />
      </BottomSheet>
    </View>
  );
}

/* ===================== Side menu overlay ===================== */
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
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.35)", opacity: fade }]} />
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
  const active = useMemo(
    () => navigationItems.find((n) => pathname?.startsWith(n.route))?.key ?? "nexasai",
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

/* ===================== BottomSheet ===================== */
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
  const y = useRef(new Animated.Value(80)).current;

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
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.35)", opacity: 1 }]} />
      </Pressable>

      <Animated.View style={[bsStyles.sheet, { transform: [{ translateY: y }] }]}>
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
    top: "12%",
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

/* ===================== Reutilizáveis ===================== */
function SheetSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: colors.lightBg1, fontWeight: "800", marginBottom: 8 }}>{title}</Text>
      {children}
    </View>
  );
}

function Feature({
  text,
  icon,
}: {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={{ color: colors.lightBg1, fontSize: 13, lineHeight: 20, flex: 1 }}>{text}</Text>
    </View>
  );
}

type RouterCb = (router: ReturnType<typeof useRouter>) => void;

function SheetCTA({
  primary,
  secondary,
}: {
  primary: { label: string; onPress: RouterCb };
  secondary?: { label: string; onPress: RouterCb };
}) {
  const router = useRouter();
  return (
    <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
      <Pressable
        style={({ pressed }) => [ctaStyles.primary, pressed && { opacity: 0.9, transform: [{ translateY: 1 }] }]}
        onPress={() => primary.onPress(router)}
      >
        <Text style={ctaStyles.primaryText}>{primary.label}</Text>
      </Pressable>

      {secondary && (
        <Pressable
          style={({ pressed }) => [ctaStyles.secondary, pressed && { opacity: 0.92, transform: [{ translateY: 1 }] }]}
          onPress={() => secondary.onPress(router)}
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

/* ===================== Blocos UI ===================== */
function ProPill({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.08)", radius: 26 }}
      style={({ pressed }) => [styles.pill, pressed && { opacity: 0.9 }]}
    >
      <Ionicons name="sparkles-outline" size={14} color={colors.primary} />
      <Text style={styles.pillText}>Obter Nexas AI Pro</Text>
    </Pressable>
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
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.05)" }}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.96 }]}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.lightBg2} style={styles.cardChevron} />
    </Pressable>
  );
}

/* ===================== Estilos ===================== */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDark4 },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
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

  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pillText: { color: colors.primary, fontWeight: "800", fontSize: 13 },

  hero: { alignItems: "center", marginTop: 2, marginBottom: 20 },
  logoWrap: { width: 80, height: 80, alignItems: "center", justifyContent: "center" },
  logoImage: { width: "80%", height: "80%" },
  heroWelcome: { color: "#fff", fontSize: 24, fontWeight: "700", marginTop: 14 },
  heroTitle: { color: colors.primary, fontSize: 34, fontWeight: "900" },

  gridRow: { flexDirection: "row", gap: 14 },

  card: {
    flex: 1,
    backgroundColor: colors.bgDark2,
    borderWidth: 1,
    borderColor: colors.bgDark3,
    borderRadius: 14,
    padding: 16,
  },
  cardTitle: { color: "#fff", fontSize: 15, fontWeight: "800" },
  cardSub: { color: colors.lightBg2, fontSize: 12 },
  cardChevron: { position: "absolute", right: 10, top: 10 },

  msgBubble: { padding: 12, borderRadius: 12, maxWidth: "85%" },
  msgUser: { backgroundColor: colors.primary, alignSelf: "flex-end" },
  msgAI: { backgroundColor: colors.bgDark2, alignSelf: "flex-start" },
});

const chat = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
  },
  inputWrap: {
    flex: 1,
    height: 54,
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

/* ===================== ChatBar (fora do styles p/ usar chat styles) ===================== */
function ChatBar({
  input,
  setInput,
  loading,
  onSend,
  insetsBottom,
  onFocus,
}: {
  input: string;
  setInput: (s: string) => void;
  loading: boolean;
  onSend: () => void;
  insetsBottom: number;
  onFocus?: () => void;
}) {
  return (
    <View style={[chat.container, { paddingBottom: 8 + insetsBottom }]}>
      <View style={chat.inputWrap}>
        <TextInput
          placeholder="Pergunte algo"
          placeholderTextColor={colors.lightBg2}
          style={chat.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={onSend}
          editable={!loading}
          onFocus={onFocus}
          blurOnSubmit={false}
          returnKeyType="send"
        />
        <Pressable style={chat.send} onPress={onSend} disabled={loading}>
          <Ionicons name={loading ? "hourglass-outline" : "send-outline"} size={18} color={colors.lightBg2} />
        </Pressable>
      </View>
    </View>
  );
}
