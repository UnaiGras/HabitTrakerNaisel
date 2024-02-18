import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Card, ProgressBar } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const StatsScreen = () => {
    
  const [userProfile, setUserProfile] = useState(null);
  const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  useEffect(() => {
    const fetchUserProfileAndTrackHabits = async () => {
      try {
        const storedUserProfile = await AsyncStorage.getItem('userProfile');
        if (storedUserProfile !== null) {
          const profile = JSON.parse(storedUserProfile);
          setUserProfile(profile);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserProfileAndTrackHabits();
  }, []);

  if (!userProfile) return null;

  const renderActiveHabits = () => {
    return userProfile.activeHabits.map((habit) => (
      <Card key={habit.id} style={styles.card}>
        <Card.Title
          title={habit.name}
          subtitle={habit.desc}
          left={(props) => <Ionicons name="ios-fitness" size={24} color={habit.color} {...props} />}
        />
        <Card.Content>
          <ProgressBar progress={0.5} color={habit.color} />
          <Text style={styles.habitText}>{`${habit.duration} min`}</Text>
        </Card.Content>
      </Card>
    ));
  };

  const renderAchievements = () => {
    if (!userProfile.achievements || userProfile.achievements.length === 0) {
      return (
        <View style={styles.noAchievementsContainer}>
          <Ionicons name="trophy" size={50} color="#white" />
          <Text style={styles.noAchievementsText}>Aún no tienes logros</Text>
        </View>
      );
    }
    return userProfile.achievements.map((achievement) => (
      <View key={achievement.name} style={styles.achievement}>
        <Ionicons name={achievement.icon} size={24} color={achievement.color} />
        <Text style={styles.text}>{achievement.name}</Text>
      </View>
    ));
  };

  const hasProductivityHistory = userProfile.productivity && Array.isArray(userProfile.productivity.history);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="settings" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.streaksSection}>
        <Text style={styles.streaksTitle}>Streaks</Text>

        <View style={styles.currentStreakContainer}>
          <Ionicons name="trophy" size={170} color="gray" style={styles.trophyIconBehind} />
          <Text style={styles.currentStreak}>{userProfile.currentStreak.count}</Text>
          <Text style={styles.currentStreakLabel}>Días</Text>
        </View>
        
        <View style={styles.weekContainer}>
          {daysOfWeek.map((day, index) => (
            <View key={day} style={[
              styles.dayCircle,
              index === new Date().getDay() ? styles.currentDay : null,
              // Agrega lógica para determinar si se ha completado el hábito
            ]}>
              <Text style={styles.dayLabel}>{day}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.streaksSubtitle}>
          Complete all your habits for today to start a streak.
        </Text>
        
        <Text style={styles.nextStreak}>1 day until next 🔥</Text>
      </View>

      <AnimatedCircularProgress
          size={120}
          width={15}
          fill={userProfile.productivity.current}
          tintColor="#9b59b6"
          backgroundColor="#3d5875"
        >
          {fill => <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>}
        </AnimatedCircularProgress>

        <LineChart
            data={{
              labels: userProfile.productivity.history.map((h) => h.date),
              datasets: [{ data: userProfile.productivity.history.map((h) => h.productivity) }]
            }}
            width={Dimensions.get('window').width - 16}
            height={200}
            yAxisLabel="%"
            chartConfig={{
              backgroundColor: '#202020',
              backgroundGradientFrom: '#202020',
              backgroundGradientTo: '#202020',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            />

    </ScrollView>
  );
};







const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202020', // Fondo oscuro para toda la pantalla
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      marginTop: 80
    },
    headerTitle: {
      color: '#ffffff',
      fontSize: 28,
      fontWeight: 'bold',
    },
    headerIcon: {
      // Estilos para el icono del encabezado (ajustes)
    },
    streaksSection: {
        backgroundColor: '#1A1A1A',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 20,
      },
      streaksTitle: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      dayCircle: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#333', // Color de fondo para los días no completados
        justifyContent: 'center',
        alignItems: 'center',
      },
      currentDay: {
        backgroundColor: '#4CD964', // Color de fondo para el día actual
      },
      dayLabel: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
      },
      streaksSubtitle: {
        color: '#ffffff',
        fontSize: 16,
        marginBottom: 5,
      },
      nextStreak: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      currentStreakContainer: {
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 30
      },
      trophyIconBehind: {
        position: 'absolute',
        opacity: 0.5, // Haz que el trofeo sea más sutil y no distraiga del número
      },
      currentStreak: {
        fontSize: 104, // Tamaño de fuente grande para el número de la racha
        fontWeight: 'bold',
        color: 'white', // Color que resalta para la cantidad de días
        zIndex: 1, // Asegúrate de que el texto se muestre por encima del icono
        alignSelf: "center"
    },
      currentStreakLabel: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: '600', // Ajusta según sea necesario para alinear con el diseño
      },
    // Más estilos para otros componentes, siguiendo la misma paleta de colores y dimensiones
  });
  

export default StatsScreen;

