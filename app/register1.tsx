import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView  } from 'react-native';
import { colors } from '../utils/colors';
import { Link } from 'expo-router';

const PlaceholderImage = require('../assets/logo/nexaspay_logo.png');
const GrowBar = require('../assets/growbar1.png')
export default function Register1() {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.bgDark4,
        paddingHorizontal: 20,
      }}
    >
     <ScrollView contentContainerStyle={{   }}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 40 }}>
        <Image
          source={PlaceholderImage}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
        <Text style={{ color: '#fff', fontWeight: 'bold',  fontSize: 40 , padding:30}}>Criar Conta</Text>
      <Image source={GrowBar} style={{marginBottom:30}}/>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
        <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',  fontSize: 16 }}>Nome Completo</Text>
        <TextInput
          placeholder="Digite seu nome completo"
          placeholderTextColor="#dbdbdb"
          style={{
            backgroundColor: colors.bgDark1,
            padding: 15,
            borderRadius: 10,
            color: '#fff',
            marginBottom: 15,
          }}
        /><Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',  fontSize: 16 }}>CPF</Text>
        <TextInput
          placeholder="Digite seu CPF"
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
  <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',fontSize: 16  }}>Data de nascimento</Text>
        <TextInput
          placeholder="DD/MM/AAAA"
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
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#fff", fontWeight: "bold" }}>Continuar</Text>
  </TouchableOpacity>
</Link>

<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}>
  <Text style={{ color: '#fff', marginRight: 5 }}>Já possui conta?</Text>
         <Link href="/" asChild>
  <TouchableOpacity>
    <Text style={{ color: '#4399FF', fontWeight: 'bold' }}>Faça login</Text>
  </TouchableOpacity>
</Link>
               
</View>

        
      </View>
     </ScrollView>
    </KeyboardAvoidingView>
  );
}
