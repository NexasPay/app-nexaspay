import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

const PlaceholderImage = require('../assets/logo/nexaspay_logo.png');
const GrowBar = require('../assets/growbarted1.png');

export default function Transferted1() {
  return (
    
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.bgDark4,
        paddingHorizontal: 20,
        paddingTop: 40,
      }}
    >

            <View style={{ alignItems: 'center',  }}>
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
    </KeyboardAvoidingView>
  );
}
