import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FooterMenu from "../components/FooterMenu";

const TransactionHub = () => { 
  return (
    <View style={styles.screen}>
      {/* Título da tela */}
      <Text style={styles.headerTitle}>Nexas Pay</Text>

      {/* Texto de instrução */}
      <Text style={styles.chooseText}>Escolha o tipo de transferência</Text>

      {/* Grid de Botões de escolha */}
      <View style={styles.buttonGrid}>
        <Pressable style={styles.chooseBtn}>
          <Text style={styles.chooseBtnText}>Pix</Text>
        </Pressable>
        <Pressable style={styles.chooseBtn}>
          <Text style={styles.chooseBtnText}>TED</Text>
        </Pressable>
        <Pressable style={styles.chooseBtn}>
          <Text style={styles.chooseBtnText}>Crypto</Text>
        </Pressable>
        <Pressable style={styles.chooseBtn}>
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
    backgroundColor: "#0B111A",
    paddingTop: 40,
    justifyContent: "space-between", // Garante que o footer fique fixo na parte inferior
    alignItems: "center", // Centraliza o conteúdo horizontalmente
  },

  // Título da tela
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20, // Distância entre o título e o texto
  },

  // Texto "Escolha o tipo de transferência"
  chooseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20, // Espaço entre o texto e os botões
  },

  // Grid de Botões (2 colunas)
  buttonGrid: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    width: "100%",
  },

  // Estilo para os botões de "Escolher"
  chooseBtn: {
    backgroundColor: "#0A1B31", // Cor de fundo dos botões
    paddingVertical: 14, // Tamanho ajustado do botão (mais alto)
    paddingHorizontal: 25, // Mais largo
    borderRadius: 20, // Bordas arredondadas
    marginBottom: 15, // Espaço entre os botões
    width: "45%", // Cada botão ocupa 45% da largura, assim fica 2 por linha
    justifyContent: "center", // Alinhando o texto no centro
    alignItems: "center", // Centralizando o texto do botão
  },

  // Cor e estilo do texto dentro dos botões
  chooseBtnText: {
    color: "#0673F6", 
    fontWeight: "700", 
    fontSize: 16,
  },

  // Estilo para garantir que o Footer tenha altura adequada
  footerContainer: {
    width: "100%", 
   
  },
});

export default TransactionHub;
