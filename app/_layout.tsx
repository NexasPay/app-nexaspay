import { Stack } from "expo-router";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";



export default function Layout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* Status bar clara sobre fundo escuro */}
      <StatusBar style="light" backgroundColor="#0B111A" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0B111A" }, // fundo global dark
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="register1" />
        <Stack.Screen name="register2" />
        <Stack.Screen name="register3" />
        <Stack.Screen name="home" />
        <Stack.Screen name="carteiras" />
        <Stack.Screen name="nexasai" />
        <Stack.Screen name="opcoes" />
        <Stack.Screen name="transaction" />
        <Stack.Screen name="extract" />
        <Stack.Screen name="scan" />
        <Stack.Screen name="transactionhub.tsx" />
        <Stack.Screen name="pro/pagamento" />
        <Stack.Screen name="assinatura.tsx" />
        <Stack.Screen name="pro/comprovante" />
        <Stack.Screen name="transfererted1" />
      </Stack>
    </SafeAreaProvider>
  );
}
