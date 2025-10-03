import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView  } from 'react-native';
import { colors } from '../utils/colors';
import { Link } from 'expo-router';

const PlaceholderImage = require('../assets/logo/nexaspay.logo.png');
const GrowBar = require('../assets/growbar2.png')
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
        <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',  fontSize: 16 }}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#dbdbdb"
          style={{
            backgroundColor: colors.bgDark1,
            padding: 15,
            borderRadius: 10,
            color: '#fff',
            marginBottom: 15,
          }}
        /><Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',  fontSize: 16 }}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#dbdbdb"
          style={{
            backgroundColor: colors.bgDark1,
            padding: 15,
            borderRadius: 10,
            color: '#fff',
            marginBottom: 15,
            
          }}
              secureTextEntry
        />
  <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',fontSize: 16  }}>Confirmar sua senha</Text>
        <TextInput
          placeholder="Confirmar sua senha"
          placeholderTextColor="#dbdbdb"
          style={{
            backgroundColor: colors.bgDark1,
            padding: 15,
            borderRadius: 10,
            color: '#fff',
            marginBottom: 20,
          }}
          secureTextEntry
        />

<Link href="/register3" asChild>
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
          <TouchableOpacity>
         <Link href="/" asChild>
  <TouchableOpacity>
    <Text style={{ color: '#4399FF', fontWeight: 'bold' }}>Faça login</Text>
  </TouchableOpacity>
</Link>
               
            
          </TouchableOpacity>
          
        </View>
        
      </View>
     </ScrollView>
    </KeyboardAvoidingView>
  );
}
