import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import FooterMenu from "../components/FooterMenu";
import { colors } from 'utils/colors';
import { useRouter } from "expo-router";

const PlaceholderImage = require('../assets/logo/nexaspay_logo.png'); 

const TransactionHub = () => { 
  const router = useRouter();
  return (
    <View style={styles.screen}>

      <Image 
        source={PlaceholderImage} 
      />

      {/* Texto de instrução */}
      <Text style={styles.chooseText}>Escolha o tipo de transferência</Text>

      {/* Grid de Botões de escolha */}
      <View style={styles.buttonGrid}>
        <Pressable style={styles.chooseBtn}>
          <Ionicons name="logo-usd" size={30} color="#0673F6" /> 
          <Text style={styles.chooseBtnText}>Pix</Text>
        </Pressable>
        <Pressable style={styles.chooseBtn} onPress={()=> router.push("/transfererted1")}>
          <Ionicons name="cash" size={30} color="#0673F6" /> 
          <Text style={styles.chooseBtnText}>TED</Text>
        </Pressable>
        <Pressable style={styles.chooseBtn}>
          <Ionicons name="logo-bitcoin" size={30} color="#0673F6" /> 
          <Text style={styles.chooseBtnText}>Crypto</Text>
        </Pressable>
        <Pressable style={styles.chooseBtn}>
          <Ionicons name="document-text" size={30} color="#0673F6" /> 
          <Text style={styles.chooseBtnText}>Boleto</Text>
        </Pressable>
      </View>

      {/* Footer de navegação */}
      <View style={styles.footerContainer}>
        <FooterMenu active="home" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bgDark4,
    paddingTop: 40,
    justifyContent: "space-between", 
    alignItems: "center", 
  },

  
  chooseText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10, 
  },

  
  buttonGrid: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    width: "100%",
  },

  chooseBtn: {
    flexDirection: "row",
    backgroundColor: "#0A1B31", 
    paddingVertical: 12, 
    borderRadius: 20, 
    marginBottom: 25,
    width: "45%", 
    justifyContent: "flex-start",
    gap: 15,
    paddingLeft: 15 
  },


  chooseBtnText: {
    color: "#0673F6", 
    fontWeight: "700", 
    fontSize: 20,

  },


  footerContainer: {
    width: "100%", 
  },

});

export default TransactionHub;
