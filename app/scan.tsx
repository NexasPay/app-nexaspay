import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { parsePix } from "../utils/parsePix";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Verificando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Permissão da câmera negada.</Text>
        <TouchableOpacity style={styles.fakeBtn} onPress={() => requestPermission()}>
          <Text style={{ color: "#fff" }}>Permitir Câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const pix = parsePix(data);

      // Validação mínima
      if (!pix.gui || !pix.gui.includes("BR.GOV.BCB.PIX")) {
        throw new Error("QR não é Pix");
      }

      router.push({
        pathname: "/pro/pagamento",
        params: {
          chave: pix.chave || "—",
          nome: pix.nome || "—",
          cidade: pix.cidade || "—",
          valor: pix.valor || "0.00",
          txid: pix.txid || "—",
        },
      });
    } catch (e) {
      setScanned(false);
      Alert.alert("QR inválido", "Não foi possível ler este QR Code Pix.");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Aponte a câmera para o QR Code</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0B111A" },
  text: { color: "#fff", fontSize: 16, textAlign: "center", paddingHorizontal: 20 },
  overlay: { position: "absolute", bottom: 80, left: 0, right: 0, alignItems: "center" },
  title: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 20 },
  fakeBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  closeBtn: { backgroundColor: colors.primary, padding: 12, borderRadius: 30 },
});