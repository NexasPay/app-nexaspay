import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../utils/colors";

const contacts = [
  { id: 1, name: "João Silva", img: require("../assets/perfil-images/kina-image.png") },
  { id: 2, name: "Maria Oliveira", img: require("../assets/perfil-images/kina-image.png") },
  { id: 3, name: "Carlos Souza", img: require("../assets/perfil-images/kina-image.png") },
];

export default function Contacts() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Escolha um Contato</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => router.push(`/transaction?to=${item.name}`)}>
            <Image source={item.img} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        )}
      />

      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0B111A", padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 20 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141C27",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  name: { color: "#E9EEF7", fontSize: 16, fontWeight: "600" },
  backBtn: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backText: { color: "#fff", fontWeight: "700" },
});
