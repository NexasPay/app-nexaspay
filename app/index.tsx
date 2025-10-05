import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert  } from 'react-native';
import { colors } from '../utils/colors';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import { API_URL } from '@env'; 
import { useState } from 'react';
const PlaceholderImage = require('../assets/logo/nexaspay_logo.png');

export default function LoginScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const handleChange = (): void => {
  router.push("/home");
}
const createUser = async () => {
  const userData = {
    email,
    password,
  };



  try {
     const response = await axios.post(`${API_URL}/create`, userData);
    
    if (response.status === 200) {
      Alert.alert('Sucesso', 'Usuário criado com sucesso!', [{ text: 'OK' }]);
      handleChange();
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Houve um erro ao criar o usuário', [{ text: 'OK' }]);
  }
};

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.bgDark4,
        paddingHorizontal: 20,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
        
        {/* Logo */}
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 40 }}>
          <Image
            source={PlaceholderImage}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        </View>

        {/* Formulário */}
        <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
          <Text style={{ color: '#fff', marginBottom: 5, fontSize: 16 }}>Email</Text>
          <TextInput
          value={email}
          onChangeText={setEmail}
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

          <Text style={{ color: '#fff', marginBottom: 5, fontSize: 16 }}>Senha</Text>
          <TextInput
          value={password}
          onChangeText={setPassword}
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

          {/* Botão de Login → vai para /home */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={createUser} // 👈 Navega para a Home
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>

          {/* Link para registro */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
            <Text style={{ color: '#fff', marginRight: 5 }}>Não possui login?</Text>
            <TouchableOpacity>
              <Link href="/register1">
                <Text style={{ color: '#4399FF', fontWeight: 'bold' }}>Comece agora.</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
