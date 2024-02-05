import React, { useState, useEffect, useRef } from 'react';
import { 
  Animated,
  Easing,
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitCard from './HabitCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../General/AppBar';


const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#252525',
    paddingTop: 20, 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Cambiado para justificar contenido correctamente
    paddingHorizontal: 15,
    paddingBottom: 20,
    flex: 1, // Asegura que el contenedor llene el espacio disponible
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: "flex-end"
    // Elimina position, right, top y transform si anteriormente los habías añadido
  },
  dayText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  monthText: {
    color: '#a565f2', // Lila
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 5, // Agrega un pequeño espacio entre el día y el mes
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  dayButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  dayButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedDayButton: {
    backgroundColor: 'grey',
  },
  scoreContainer: {
    backgroundColor: '#191919', // Un color más oscuro que el fondo de la pantalla
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    padding: 30,
    marginVertical: 20,
    borderRadius: 20,
    // Propiedades de sombreado para efecto de elevación
    shadowColor: '#a565f2', // Color lila para el sombreado
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento del sombreado
    shadowOpacity: 0.3, // Opacidad del sombreado
    shadowRadius: 5, // Radio del borde del sombreado
    elevation: 10, // Elevación para Android
  },
  
  scoreText: {
    fontSize: 72, // Un tamaño de fuente grande para el número
    color: 'white', // Un color que contraste con el fondo oscuro
    fontWeight: 'bold', // Hacer el número más prominente
  },
  habitsListContainer: {
    flex: 1, // Esto hace que tome todo el espacio vertical disponible
    backgroundColor: '#222', // Un poco más oscuro que el headerContainer
    borderTopLeftRadius: 20, // Bordes redondeados en la parte superior izquierda
    borderTopRightRadius: 20, // Bordes redondeados en la parte superior derecha
    padding: 10
  },
});

// Datos de ejemplo para los hábitos
const habitsData = [
  {
    id: '1',
    title: 'Leer 30 minutos',
    icon: 'book', // Asegúrate de que este nombre de icono exista en Ionicons
    duration: '30m',
    color: "#a565f2"
  },
  {
    id: '2',
    title: 'Meditación matutina',
    icon: 'leaf', // Asegúrate de que este nombre de icono exista en Ionicons
    duration: '15m',
    color: "green"
  },
  {
    id: '3',
    title: 'Ejercicio físico',
    icon: 'fitness', // Asegúrate de que este nombre de icono exista en Ionicons
    duration: '1h',
    color: "blue"
  },
  // Agrega más hábitos según sea necesario...
];

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const getMonthAndYear = () => {
  // Supongamos que esta función devuelve el día y la abreviatura del mes actuales
  const date = new Date();
  const formatterMonth = new Intl.DateTimeFormat('es', { month: 'long' }); // 'long' para el nombre completo
  const year = date.getFullYear(); // Obtiene el año
  let month = formatterMonth.format(date);

  month = capitalizeFirstLetter(month); // Capitaliza el primer letra
  
  return { month, year };

};


const MainScreen = ({navigation}) => {


  const daysOfWeek = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
  console.log(navigation, "<<---esto es navigation en mainscreen")
  const { month, year } = getMonthAndYear();
  const currentDayIndex = new Date().getDay();
  const adjustedIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

    const habits = habitsData
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#252525', paddingHorizontal: 10 }} edges={['top', 'left', 'right']}>

    
      <View style={styles.headerContainer}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        width: "90%", 
        justifyContent: "space-between", 
        paddingVertical: 10, 
        alignSelf: "center" 
        }}>
          <View style={{flexDirection: "row"}}>
            <Text style={styles.dayText}>{month}</Text>
            <Text style={styles.monthText}>{year}</Text>
          </View>
        <View style={styles.iconContainer}>
            <Ionicons name="menu" size={30} color="white" style={{ marginRight: 20 }} />
            <Ionicons name="settings" size={30} color="white" />
        </View>
        </View>
        <View style={styles.dayButtonContainer}>
        {daysOfWeek.map((day, index) => (
            <TouchableOpacity key={index} style={[
              styles.dayButton,
              index === adjustedIndex ? styles.selectedDayButton : null,
            ]}>
              <Text style={styles.dayButtonText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.scoreContainer}>
          <ScoreCounter finalScore={88}/>
        </View>

      </View>
      <View style={styles.habitsListContainer}>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <HabitCard title={item.title} icon={item.icon} duration={item.duration} color={item.color}/>
        )}
        keyExtractor={(item) => item.id}
      />
      </View>
      <AppBar navigation={navigation} position={"home"}/>
    </SafeAreaView>
  );
};

const ScoreCounter = ({ finalScore }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [score, setScore] = useState('0'); // Estado para almacenar el valor del score como texto

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: finalScore,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false, // Cambiado a false porque interpolamos a un string
    }).start();

    animatedValue.addListener((animation) => {
      const value = Math.floor(animation.value).toString(); // Redondear hacia abajo y convertir a string
      setScore(value); // Actualizar el estado con el valor animado actual
    });

    return () => animatedValue.removeAllListeners(); // Limpiar el listener cuando el componente se desmonte
  }, [finalScore]);

  return (
    <Animated.Text style={styles.scoreText}>
      {score}
    </Animated.Text>
  );
};





export default MainScreen;


