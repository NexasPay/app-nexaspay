import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  ScrollView,
  Pressable,
  Animated,
  Easing,
  StyleSheet
} from 'react-native';
import { colors } from '../utils/colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from "expo-router";
import { navigationItems } from "../utils/navigationItems";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PlaceholderImage = require('../assets/logo/nexaspay_logo.png');
const GrowBar = require('../assets/growbarted1.png');

export default function Transferted1() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.bgDark4,
        paddingHorizontal: 20,
        paddingTop: insets.top + 10,
      }}
    >
      {/* Top bar com botão hambúrguer */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
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

      <View style={{ alignItems: 'center' }}>
        <Ionicons name="wallet" size={40} color='#fff' />
      </View>

      <ScrollView contentContainerStyle={{}}>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 40, padding: 30 }}>Transferência TED</Text>
          <Image source={GrowBar} style={{ marginBottom: 30 }} />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
          <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'bold', fontSize: 18 }}>Detalhes do remetente</Text>
          <TextInput
            placeholder="Digite o CPF"
            placeholderTextColor="#dbdbdb"
            style={{
              backgroundColor: colors.bgDark1,
              padding: 15,
              borderRadius: 10,
              color: '#fff',
              marginBottom: 15,
            }}
          />
          <TextInput
            placeholder="Digite a ID da conta"
            placeholderTextColor="#dbdbdb"
            keyboardType="numeric"
            style={{
              backgroundColor: colors.bgDark1,
              padding: 15,
              borderRadius: 10,
              color: '#fff',
              marginBottom: 15,
            }}
          />
          <TextInput
            placeholder="Digite a agência"
            placeholderTextColor="#dbdbdb"
            keyboardType="numeric"
            style={{
              backgroundColor: colors.bgDark1,
              padding: 15,
              borderRadius: 10,
              color: '#fff',
              marginBottom: 20,
            }}
          />

          <Link href="/register2" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Continuar</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/register2" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                borderColor: colors.primary,
                borderWidth: 2,
                marginTop: 10,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Voltar a Transferências</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      {/* Menu sanduíche */}
      <SideMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)}>
        <SideMenuContent />
      </SideMenuOverlay>
    </KeyboardAvoidingView>
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

/* ===================== Estilos ===================== */
const styles = StyleSheet.create({
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
