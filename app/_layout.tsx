// ⚠️ CRUCIAL: Importe o NativeWind AQUI!
import '../global.css'; 

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Minha Tela Inicial' }} />
    </Stack>
  );
}