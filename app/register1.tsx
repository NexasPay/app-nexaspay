import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView  } from 'react-native';
import { colors } from '../utils/colors';
import { Link } from 'expo-router';

const PlaceholderImage = require('../assets/logo/nexaspay.logo.png');

export default function Register1() {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.bgDark4,
        paddingHorizontal: 20,
      }}
    >
     <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 40 }}>
        <Image
          source={PlaceholderImage}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
        <Text style={{ color: '#fff', fontWeight: 'bold',  fontSize: 40 , padding:50}}>Criar Conta</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
        <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',  fontSize: 16 }}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#dbdbdb"
          style={{
            backgroundColor: colors.bgDark1,
            padding: 15,
            borderRadius: 10,
            color: '#fff',
            marginBottom: 15,
          }}
        /><Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',  fontSize: 16 }}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#dbdbdb"
          style={{
            backgroundColor: colors.bgDark1,
            padding: 15,
            borderRadius: 10,
            color: '#fff',
            marginBottom: 15,
          }}
        />
  <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium',fontSize: 16  }}>Senha</Text>
        <TextInput
          placeholder="Senha"
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

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: '#fff', marginRight: 5 }}>Não possui login?</Text>
          <TouchableOpacity>
               <Link href="/register1" >
                   <Text style={{ color: '#4399FF', fontWeight: 'bold' }}>Comece agora.</Text>
                 </Link>
            
          </TouchableOpacity>
        </View>
      </View>
     </ScrollView>
    </KeyboardAvoidingView>
  );
}
