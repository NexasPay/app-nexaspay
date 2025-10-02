import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView  } from 'react-native';
import { colors } from '../utils/colors';

const PlaceholderImage = require('../assets/logo/nexaspay.logo.png');

export default function LoginScreen() {
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
      </View>


      <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
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

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#dbdbdb"
          style={{
            backgroundColor: colors.bgDark1,
            padding: 15,
            borderRadius: 10,
            color: colors.textinput,
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
            <Text style={{ color: '#4399FF', fontWeight: 'bold' }}>Comece agora.</Text>
          </TouchableOpacity>
        </View>
      </View>
     </ScrollView>
    </KeyboardAvoidingView>
  );
}
