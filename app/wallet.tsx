import { Text, View, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { colors } from '../utils/colors';
import { useState } from 'react';
import FooterMenu from 'components/FooterMenu';
import { Ionicons } from '@expo/vector-icons';

const wallet1 = require('../assets/wallet/wallet1.png');
const wallet2 = require('../assets/wallet/wallet2.png');

export default function Wallet() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: colors.bgDark4,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: 'center', paddingTop: 50 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 70 }}>
            <Ionicons
                name="wallet-outline" 
                size={28}
                color="#fff"
                style={{ marginRight: 8 }}
              />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, }}>
              Carteiras
            </Text>
            </View>

            <Image
              source={wallet1}
              style={{
                marginBottom: 30,
                width: 320,
                height: 180,
                resizeMode: 'contain',
              }}
            />

            <Image
              source={wallet2}
              style={{
                marginBottom: 30,
                width: 320,
                height: 180,
                resizeMode: 'contain',
              }}
            />
          </View>
        </ScrollView>


        <FooterMenu />
      </View>
    </KeyboardAvoidingView>
  );
}
