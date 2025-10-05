import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { colors } from '../utils/colors';
import { Link, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@env';

const PlaceholderImage = require('../assets/logo/nexaspay_logo.png');
const GrowBar = require('../assets/growbar3.png');

export default function Register3() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');



const createUser = async () => {
  const userData = {
    address,
    phone,
  };

  try {
     const response = await axios.post(`${API_URL}/create`,userData);

  
    if (response.status === 200) {
      Alert.alert('Sucesso', 'Usuário criado com sucesso!', [{ text: 'OK' }]);
    }
  } catch (error) {

    Alert.alert('Erro', 'Houve um erro ao criar o usuário', [{ text: 'OK' }]);
  }
};

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bgDark4, paddingHorizontal: 20 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 40 }}>
          <Image source={PlaceholderImage} style={{ width: 150, height: 150 }} resizeMode="contain" />
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 40, padding: 30 }}>Criar Conta</Text>
          <Image source={GrowBar} style={{ marginBottom: 30 }} />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
          <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium', fontSize: 16 }}>Endereço</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Digite seu endereço"
            placeholderTextColor="#dbdbdb"
            style={{
              backgroundColor: colors.bgDark1,
              padding: 15,
              borderRadius: 10,
              color: '#fff',
              marginBottom: 15,
            }}
          />

          <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium', fontSize: 16 }}>Celular</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
             
            placeholder="Digite seu celular"
            placeholderTextColor="#dbdbdb"
            style={{
              backgroundColor: colors.bgDark1,
              padding: 15,
              borderRadius: 10,
              color: '#fff',
              marginBottom: 15,

            }}
             keyboardType="numeric"
          />

          <Text style={{ color: '#fff', marginBottom: 5, fontWeight: 'medium', fontSize: 16 }}>Sua foto de perfil</Text>
          
       
          <TouchableOpacity
          
            onPress={pickImageAsync}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.bgDark5,
              padding: 12,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <FontAwesome name="picture-o" size={28} color={colors.primary} />
            <Text style={{ color: colors.primary, fontWeight: 'bold', marginLeft: 10 }}>
              Acesse a galeria
            </Text>
          </TouchableOpacity>

    
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 50, height: 50, marginBottom: 20 }}
            />
          )}

        
<Link href="/home" asChild>
 <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={createUser} 
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Registre</Text>
          </TouchableOpacity>
</Link>

       
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
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
