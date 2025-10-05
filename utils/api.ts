import axios from "axios";
import { Platform } from "react-native";

const LOCAL_IP = "192.168.17.57";   

// Base da API conforme plataforma
export const API_BASE =
  Platform.OS === "android"
    ? `http://${LOCAL_IP}:4000` // emulador Android ou dispositivo físico
    : `http://${LOCAL_IP}:4000`; // iOS / Expo Go

export interface ChatMessage {
  from: "user" | "ai";
  text: string;
}

// Função principal de envio ao agente (proxy local)
export async function sendMessageToAgent({
  text,
  history,
  user,
}: {
  text: string;
  history: ChatMessage[];
  user: { id: string; name: string };
}) {
  try {
    const res = await axios.post(`${API_BASE}/chat`, { text, history, user });
    return res.data;
  } catch (e) {
    console.error("❌ Erro ao conversar com o agente:", e);
    return {
      reply: "⚠️ Erro de conexão com o agente. Verifique sua rede.",
      action: { type: "NONE" },
    };
  }
}