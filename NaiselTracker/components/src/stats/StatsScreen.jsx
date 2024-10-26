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
import COLORS from '../General/colors';

const StatsScreen = () => {
    
  const [userProfile, setUserProfile] = useState(null);
  const [selectedSection, setSelectedSection] = useState('streaks');
  const daysOfWeek = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];

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
          <Ionicons name="star" size={60} color="gray" style={{marginVertical: 10}} />
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
        <Text style={styles.headerTitle}>Estadisticas</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="settings" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedSection('streaks')}
          style={[styles.button, selectedSection === 'streaks' ? styles.buttonSelected : null]}
        >
          <Text style={styles.buttonText}>Racha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedSection('productivity')}
          style={[styles.button, selectedSection === 'productivity' ? styles.buttonSelected : null]}
        >
          <Text style={styles.buttonText}>Productividad</Text>
        </TouchableOpacity>
      </View>
      {selectedSection === 'streaks' ? (
      <View style={styles.streaksSection}>
        <Text style={styles.streaksTitle}>Racha</Text>

        <View style={styles.currentStreakContainer}>
          <Ionicons name="flame" size={200} color="gray" style={styles.trophyIconBehind} />
          <Text style={styles.currentStreak}>{userProfile.currentStreak.count}</Text>
        </View>
        <Text style={styles.currentStreakLabel}>Días</Text>
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
          Completa todos los habitos de el dia para continuar con tu racha.
        </Text>
        
        <Text style={styles.nextStreak}>1 dia para la siguiente 🔥</Text>
        <View style={{alignItems: "center", justifyContent: "center", padding: 10, marginVertical: 20, backgroundColor: "#353535", borderRadius: 12}}>
        {renderAchievements()}
        </View>
      </View>
      ):(
<View style={styles.productivityCard}>
  <Text style={styles.cardTitle}>Productividad</Text>
  <View style={styles.circularProgressContainer}>
    <AnimatedCircularProgress
      size={220}
      width={30}
      fill={userProfile.productivity.current}
      tintColor={COLORS.APP_PRIMARY_COLOR}
      backgroundColor="#414952"
    >
      {fill => <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>}
    </AnimatedCircularProgress>
  </View>

  <View style={styles.adviceCard}>
  <Ionicons
    name={userProfile.productivity.current === 100 ? "happy" : "information-circle-outline"}
    size={44}
    color="gray"
    style={styles.adviceIcon}
  />
  <Text style={styles.adviceText}>
    {userProfile.productivity.current === 100
      ? "¡Felicidades! Has alcanzado el 100% de productividad. ¡Sigue así!"
      : "Estás haciendo un gran esfuerzo. Sigue trabajando para alcanzar el 100% de productividad."}
  </Text>
</View>


  <View style={styles.chartContainer}>
    <LineChart
      data={{
        labels: userProfile.productivity.history.map((h) => h.date),
        datasets: [{ data: userProfile.productivity.history.map((h) => h.productivity) }]
      }}
      width={Dimensions.get('window').width - 32} // Ajuste para el padding
      height={200}
      yAxisLabel="%"
      chartConfig={{
        backgroundColor: COLORS.APP_PRIMARY_COLOR,
        backgroundGradientFrom: '#353535',
        backgroundGradientTo: '#353535',
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(164, 101, 242, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: '6',
          strokeWidth: '3',
          stroke: COLORS.APP_PRIMARY_COLOR
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        alignSelf: "center",
      }}
    />
  </View>
</View>

      )}

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
        backgroundColor: '#252525',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 20,
      },
      streaksTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontStyle: "italic"
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
        backgroundColor: COLORS.APP_PRIMARY_COLOR, // Color de fondo para el día actual
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
        position: "absolute",
        opacity: 0.5, // Haz que el trofeo sea más sutil y no distraiga del número

      },
      currentStreak: {
        fontSize: 84, // Tamaño de fuente grande para el número de la racha
        fontWeight: 'bold',
        color: 'white', // Color que resalta para la cantidad de días
        zIndex: 1, // Asegúrate de que el texto se muestre por encima del icono
        alignSelf: "center"
    },
      currentStreakLabel: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: '600', // Ajusta según sea necesario para alinear con el diseño
        alignSelf: "center",
        marginBottom: 30
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        marginVertical: 5,
        backgroundColor: "#353535", 
        borderRadius: 20, 
        padding: 2, 
        alignSelf: "center", 
        width: "70%"
      },

      button: {
        width: "50%",
        padding: 3,
        borderRadius: 20
      },
      buttonText: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "500",
        padding: 5
      },
      buttonSelected: {
        backgroundColor: COLORS.APP_PRIMARY_COLOR,
      },
      productivityCard: {
        backgroundColor: '#252525', // Fondo blanco para la tarjeta
        borderRadius: 20, // Bordes redondeados
        shadowColor: '#000', // Sombra para dar profundidad
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Elevación para Android
        padding: 16, // Padding interno
        marginHorizontal: 16, // Margen horizontal para no pegar al borde de la pantalla
        marginTop: 16, // Margen superior para separar de otros elementos
      },
      cardTitle: {
        fontSize: 24, // Tamaño de fuente para el título
        fontWeight: 'bold', // Fuente en negrita
        marginBottom: 16, // Margen inferior para separar del contenido
        textAlign: 'center', // Centrar el título
        color: "white",
        fontStyle: "italic",
        alignSelf: "flex-start"
      },
      circularProgressContainer: {
        alignItems: 'center', // Centrar el círculo de progreso
        marginVertical: 20, // Margen inferior para separar de la gráfica
      },
      progressText: {
        position: 'absolute', // Posicionar sobre el círculo de progreso
        fontSize: 25, // Tamaño de la fuente para el porcentaje
        fontWeight: 'bold', // Fuente en negrita
        color: "white"
      },
      chartContainer: {
        // Contenedor para la gráfica (opcionalmente para ajustes adicionales)
      },
      adviceCard: {
        flexDirection: 'row', // Alinea ícono y texto horizontalmente
        backgroundColor: '#555', // Fondo gris para la tarjeta
        padding: 15, // Padding general para el contenido interno
        borderRadius: 10, // Bordes redondeados
        alignItems: 'center', // Alinea los elementos verticalmente
        margin: 10, // Margen externo para separación
      },
      adviceIcon: {
        marginRight: 10, // Espacio entre el ícono y el texto
      },
      adviceText: {
        flex: 1, // Asegura que el texto ocupe el espacio restante
        fontSize: 16, // Tamaño de fuente para el mensaje
        color: "white",
        fontWeight:"700"
      },
      noAchievementsContainer: {
        alignItems: "center"
      },
      noAchievementsText: {
        color: "gray",
        fontSize: 17,
        fontWeight: "700"
      }
    // Más estilos para otros componentes, siguiendo la misma paleta de colores y dimensiones
  });
  

export default StatsScreen;

