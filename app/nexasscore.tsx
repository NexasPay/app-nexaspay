import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  RefreshControl,
  Animated,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";

export default function NexasScoreScreen() {
  const [userScore, setUserScore] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserScore();
    animateScore();
  }, []);

  const animateScore = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const loadUserScore = () => {
    setTimeout(() => {
      setUserScore({
        score: 742,
        level: "Ouro",
        trend: "up",
        creditPurchasePercentage: 68,
        totalTransactions: 156,
        creditTransactions: 106,
        monthlyAverage: 24500,
        nextLevelRequirement: 800,
        benefits: [
          "Cashback de 2% em compras",
          "Limite de crédito aumentado",
          "Taxa preferencial em empréstimos",
          "Acesso a produtos exclusivos",
          "Suporte prioritário",
        ],
      });
    }, 600);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    loadUserScore();
    setRefreshing(false);
  };

  const getColor = (score: number): [string, string] => {
    if (score >= 800) return ["#FFD700", "#FFA500"];
    if (score >= 700) return ["#32CD32", "#228B22"];
    if (score >= 600) return ["#4A90E2", "#357ABD"];
    if (score >= 500) return ["#FF8C00", "#FF6B35"];
    return ["#DC2626", "#B91C1C"];
  };

  const CircularProgress = ({ score }: { score: number }) => {
    const radius = 80;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 1000) * circumference;

    const strokeDashoffset = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, circumference - progress],
    });

    const [startColor, endColor] = getColor(score);

    return (
      <View style={styles.circleWrap}>
        <Svg width={200} height={200}>
          <Defs>
            <SvgGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={startColor} />
              <Stop offset="1" stopColor={endColor} />
            </SvgGradient>
          </Defs>
          <Circle
            cx={100}
            cy={100}
            r={radius}
            stroke="#2E3748"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={100}
            cy={100}
            r={radius}
            stroke="url(#grad)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 100 100)"
          />
        </Svg>

        <View style={styles.scoreCenter}>
          <Animated.Text style={styles.scoreNumber}>{score}</Animated.Text>
          <Text style={styles.scoreSub}>de 1000</Text>
        </View>
      </View>
    );
  };

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  if (!userScore) {
    return (
      <View style={styles.loading}>
        <Ionicons name="analytics-outline" size={48} color="#4A90E2" />
        <Text style={styles.loadingText}>Calculando seu Nexas Score...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B111A" />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={getColor(userScore.score)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Nexas Score</Text>
          <Text style={styles.headerSub}>Sua avaliação financeira</Text>

          <View style={styles.progressWrap}>
            <CircularProgress score={userScore.score} />
            <Text style={styles.level}>{userScore.level}</Text>
            <View style={styles.trendRow}>
              <Ionicons
                name={
                  userScore.trend === "up"
                    ? "trending-up"
                    : userScore.trend === "down"
                    ? "trending-down"
                    : "remove"
                }
                size={16}
                color={
                  userScore.trend === "up"
                    ? "#22C55E"
                    : userScore.trend === "down"
                    ? "#EF4444"
                    : "#9CA3AF"
                }
              />
              <Text style={styles.trendText}>
                {userScore.trend === "up"
                  ? "Em alta"
                  : userScore.trend === "down"
                  ? "Em baixa"
                  : "Estável"}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Estatísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.row}>
            <View style={styles.statBox}>
              <Text style={styles.label}>Compras no Crédito</Text>
              <Text style={styles.value}>{userScore.creditPurchasePercentage}%</Text>
              <Text style={styles.sub}>
                {userScore.creditTransactions} de {userScore.totalTransactions}
              </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.statBox}>
              <Text style={styles.label}>Média Mensal</Text>
              <Text style={styles.value}>
                {userScore.monthlyAverage.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 0,
                })}
              </Text>
              <Text style={styles.sub}>últimos 3 meses</Text>
            </View>
          </View>
        </View>

        {/* Benefícios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seus Benefícios</Text>
          {userScore.benefits.map((b: string, i: number) => (
            <View key={i} style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
              <Text style={styles.benefitText}>{b}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B111A" },
  loading: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0B111A" },
  loadingText: { color: "#FFF", marginTop: 10, fontSize: 15 },
  header: { paddingTop: 60, paddingBottom: 30, paddingHorizontal: 20 },
  headerTitle: { color: "#FFF", fontSize: 24, fontWeight: "800" },
  headerSub: { color: "#FFF", opacity: 0.8, marginBottom: 20 },
  progressWrap: { alignItems: "center" },
  circleWrap: { justifyContent: "center", alignItems: "center" },
  scoreCenter: { position: "absolute", alignItems: "center" },
  scoreNumber: { color: "#FFF", fontSize: 36, fontWeight: "800" },
  scoreSub: { color: "#9CA3AF", fontSize: 13 },
  level: { color: "#FFF", fontSize: 22, fontWeight: "700", marginTop: 8 },
  trendRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  trendText: { color: "#FFF", marginLeft: 6 },
  section: { backgroundColor: "#1F2937", borderRadius: 14, padding: 16, margin: 16 },
  sectionTitle: { color: "#FFF", fontSize: 16, fontWeight: "700", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statBox: { flex: 1, alignItems: "center" },
  label: { color: "#9CA3AF", fontSize: 13 },
  value: { color: "#FFF", fontSize: 20, fontWeight: "700", marginVertical: 4 },
  sub: { color: "#9CA3AF", fontSize: 12 },
  separator: { width: 1, backgroundColor: "#374151", height: "100%" },
  benefit: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  benefitText: { color: "#FFF", marginLeft: 10, fontSize: 14 },
});
