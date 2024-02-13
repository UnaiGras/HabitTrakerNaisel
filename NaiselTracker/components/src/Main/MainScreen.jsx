import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Animated,
  Easing,
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Button,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitCard from './HabitCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../General/AppBar';
import milestones from '../../../milestones';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MilestoneCard from './MileStoneCard';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#202020',
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
    backgroundColor: '#282828', // Un poco más oscuro que el headerContainer
    borderTopLeftRadius: 20, // Bordes redondeados en la parte superior izquierda
    borderTopRightRadius: 20, // Bordes redondeados en la parte superior derecha
    padding: 10
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  habitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

    modalContent: {
      backgroundColor: "#202020",
      borderRadius: 30,
      overflow: 'hidden', // Esto es para asegurar que el contenido no se desborde de los bordes redondeados
    },
    modalHeader: {
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#404040',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalCloseButton: {
      position: 'absolute',
      top: 10,
      right: 15,
      zIndex: 1,
    },
    habitIconContainer: {
      alignSelf: "center",
      padding: 15,
      borderRadius: 15,
      backgroundColor: "#191919",
      marginBottom: 10,
    },
    habitTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
      marginTop: 8,
    },
    habitDescription: {
      fontSize: 16,
      color: '#aaaaaa',
      marginBottom: 20,
    },
    modalBody: {
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    habitFrequency: {
      fontSize: 18,
      color: '#ffffff',
      marginBottom: 5,
    },
    habitDuration: {
      fontSize: 18,
      color: '#ffffff',
      marginBottom: 5,
    },
    habitTiming: {
      fontSize: 18,
      color: '#ffffff',
      marginBottom: 15,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 15,
    },
    tab: {
      borderRadius: 20,
      padding: 10,
      backgroundColor: '#333333',
    },
    tabText: {
      fontSize: 18,
      color: '#ffffff',
    },
    inspirationalQuote: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#777777',
      borderTopWidth: 1,
      borderTopColor: '#404040',
      paddingTop: 15,
    },
    subtaskList: {
      marginTop: 20,
    },
    subtaskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    subtaskBox: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#ffffff',
      marginRight: 10,
    },
    subtaskBoxCompleted: {
      backgroundColor: "blue", // El color del hábito o cualquier otro color que prefieras
    },
    subtaskText: {
      color: '#ffffff',
      fontSize: 16,
    },
    subtaskTextCompleted: {
      textDecorationLine: 'line-through',
      color: '#777777', // Un color más tenue para el texto completado
    },
    // Continuar con los estilos para modalBody, addButton, tabContainer, etc.
  
});



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

    const bottomSheetModalRef = useRef(null);

    const isFocused = useIsFocused();

    const [userProfile, setUserProfile] = useState({ points: 0, milestones: { currentMilestone: 0, nextMilestone: 0 } });
    const [milestoneModalVisible, setMilestoneModalVisible] = useState(false);
    const [currentMilestone, setCurrentMilestone] = useState(null);
    const [habits, setHabits] = useState([]);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const [completedHabits, setCompletedHabits] = useState(new Set());
    const [daysCompletedAllHabits, setDaysCompletedAllHabits] = useState([false, false, false, false, false, false, false]);



    const snapPoints = useMemo(() => ['33%', '80%'], []);

    const daysOfWeek = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
    const { month, year } = getMonthAndYear();
    const currentDayIndex = new Date().getDay();
    const adjustedIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

    const handlePresentModalPress = useCallback((habit) => {
      setSelectedHabit(habit);
      bottomSheetModalRef.current?.present();
    }, []);

    const updatePointsAndCheckMilestones = async (pointsToAdd) => {
      try {
        console.log("por", pointsToAdd)
        const userProfileString = await AsyncStorage.getItem('userProfile');
        if (!userProfileString) return;
        
        let userProfile = JSON.parse(userProfileString);
        userProfile.points += pointsToAdd;
        console.log(userProfile)
        
        
        let milestoneReached = null;
        const currentMilestoneIndex = userProfile.milestones.nextMilestone;
        const nextMilestone = milestones[currentMilestoneIndex] || milestones[milestones.length - 1];
        
        
        if (userProfile.points >= nextMilestone.points) {
          milestoneReached = nextMilestone;
          userProfile.milestones.currentMilestone = currentMilestoneIndex;
          userProfile.milestones.nextMilestone = currentMilestoneIndex + 1 < milestones.length ? currentMilestoneIndex + 1 : null;
          console.log("Se a alcancado un nuevo nivel de Milestone")
          // Guarda el userProfile actualizado
          setCurrentMilestone(milestoneReached);
          setMilestoneModalVisible(true); // Muestra el MilestoneCard
        }
        
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
        setUserProfile(userProfile)
        return userProfile
      } catch (error) {
        console.error('Error al actualizar puntos y hitos', error);
      }
    };

    const handleCompleteHabit = async (habitId, pointsToAdd) => {
      const today = new Date().toISOString().split('T')[0];
    
      if (completedHabits.has(habitId)) {
        console.log('Este hábito ya ha sido completado hoy.');
        return;
      }
    
      try {
        // Actualiza puntos y verifica hitos, obteniendo el userProfile actualizado
        const updatedUserProfile = await updatePointsAndCheckMilestones(pointsToAdd);
        if (!updatedUserProfile) return;
    
        // Encuentra el hábito y actualiza su última fecha de completado usando el userProfile actualizado
        const habitIndex = updatedUserProfile.activeHabits.findIndex(habit => habit.id === habitId);
        if (habitIndex !== -1) {
          updatedUserProfile.activeHabits[habitIndex].lastCompletedDate = today;

          if (!updatedUserProfile.dailyHabitTracking) {
            updatedUserProfile.dailyHabitTracking = {};
          }
          if (!updatedUserProfile.dailyHabitTracking[today]) {
            updatedUserProfile.dailyHabitTracking[today] = [];
          }
          updatedUserProfile.dailyHabitTracking[today].push(habitId); // Añade el ID del hábito completado

          
          await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserProfile)); // Guarda el userProfile actualizado en AsyncStorage
          setCompletedHabits(prev => new Set(prev).add(habitId)); // Actualiza el estado de los hábitos completados
        }
      } catch (error) {
        console.error('Error al completar el hábito', error);
      }
    };
    
    

    const handleDeleteHabit = async () => {

      try {

        const userProfileString = await AsyncStorage.getItem('userProfile');
        if (!userProfileString) return;
        
        let userProfile = JSON.parse(userProfileString);
        
        const updatedHabits = userProfile.activeHabits.filter(habit => 
          habit.id !== selectedHabit.id
          )
          
    
        userProfile.activeHabits = updatedHabits;
    
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
    
        setHabits(updatedHabits);
    
        bottomSheetModalRef.current?.close();
    
        setSelectedHabit(null);
      } catch (error) {
        console.error('Error al borrar el hábito', error);
      }
    };
    
    
    useEffect(() => {
      const fetchUserProfileAndTrackHabits = async () => {
        try {
          const storedUserProfile = await AsyncStorage.getItem('userProfile');
          if (storedUserProfile !== null) {
            const profile = JSON.parse(storedUserProfile);
            console.log("Estos son los puntos del usuario", profile.points);
            setUserProfile(profile); // Actualiza el perfil del usuario en el estado
            setHabits(profile.activeHabits); // Actualiza los hábitos activos en el estado
    
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalizar la hora del día a medianoche
            // Antes: Establecer los hábitos completados para el día actual usando lastCompletedDate
            // (Este bloque se debe modificar o eliminar si decides basarte completamente en dailyHabitTracking)
                      
            // Después: Usa dailyHabitTracking para establecer los hábitos completados
            const todayStr = new Date().toISOString().split('T')[0]; // Formato: 'YYYY-MM-DD'
            const completedIds = new Set(profile.dailyHabitTracking[todayStr] || []);
            setCompletedHabits(completedIds); // Actualiza los hábitos completados hoy en el estado

    
            // Lógica para determinar los días de la semana en los que se completaron todos los hábitos
            const dayOfWeek = today.getDay(); // Día de la semana como número, 0 es Domingo
            const mondayThisWeek = new Date(today);
            mondayThisWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Ajustar al lunes de esta semana
    
            let daysCompletedAllHabits = new Array(7).fill(false); // Para cada día de la semana, empezando por lunes
    
            for (let i = 0; i <= dayOfWeek; i++) { // Solo hasta el día actual
              const checkDate = new Date(mondayThisWeek);
              checkDate.setDate(mondayThisWeek.getDate() + i);
              const checkDateString = checkDate.toISOString().split('T')[0];
    
              const completedHabitsThatDay = profile.dailyHabitTracking?.[checkDateString]?.length || 0;
              // Marcar el día en lila si se completaron todos los hábitos
              daysCompletedAllHabits[i] = completedHabitsThatDay === profile.activeHabits.length;
            }
    
            setDaysCompletedAllHabits(daysCompletedAllHabits); // Asume que tienes un estado para esto
          }
        } catch (error) {
          console.error('Error al recuperar el perfil del usuario', error);
        }
      };
    
      fetchUserProfileAndTrackHabits();
    }, [isFocused]);
    


    return (
      <BottomSheetModalProvider>
      <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: '#202020',
        paddingHorizontal: 10
      }} 
      edges={['top', 'left', 'right']}
      >
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
          <TouchableOpacity>
            <Ionicons name="menu" size={30} color="white" style={{ marginRight: 20 }} />
          </TouchableOpacity>  
            <Ionicons name="settings" size={30} color="white" />
          
        </View>
        </View>
        <View style={styles.dayButtonContainer}>
        {daysOfWeek.map((day, index) => {
          const isToday = new Date().getDay() === index + 1 || (new Date().getDay() === 0 && index === 6);
          const completedAllHabits = daysCompletedAllHabits[index]; // Asume que este estado está definido y actualizado correctamente
          return (
            <TouchableOpacity key={index} style={[
              styles.dayButton,
              isToday ? styles.selectedDayButton : null,
              completedAllHabits ? styles.completedAllHabitsStyle : null, // Añade este estilo si se completaron todos los hábitos
            ]}>
              <Text style={styles.dayButtonText}>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
        <View style={styles.scoreContainer}>
          <ScoreCounter finalScore={userProfile.points}/>
        </View>
      </View>
      <View >
<View>
      <FlatList
          data={habits}
          renderItem={({ item }) => (
              <HabitCard
                title={item.name}
                icon={item.icon}
                duration={item.duration}
                color={item.color}
                onComplete={() => handleCompleteHabit(item.id,item.points)}
                isCompleted={completedHabits.has(item.id)}
                openInfo={() => handlePresentModalPress(item)}
              />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{paddingBottom: 50 }}
        />
</View>
        </View>

      <AppBar navigation={navigation} position={"home"}/>
      {milestoneModalVisible && currentMilestone && (
        <MilestoneCard
          visible={milestoneModalVisible}
          milestone={currentMilestone}
          onHide={() => setMilestoneModalVisible(false)} // Oculta el modal cuando la animación termine o el usuario cierra el modal
        />
      )}

  {selectedHabit &&
      <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      style={{ backgroundColor: "#202020" }}
      backgroundStyle={{ backgroundColor: "#202020" }}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.modalCloseButton} onPress={handleDeleteHabit}>
          <Ionicons name='trash' size={24} color="white"/>
        </TouchableOpacity>
          <View style={styles.habitIconContainer}>
            <Ionicons name={selectedHabit.icon} size={60} color={selectedHabit.color}/>
          </View>
          <Text style={styles.habitTitle}>{selectedHabit.name}</Text>
          <Text style={styles.habitDescription}>{selectedHabit.desc || "Add description..."}</Text>
        </View>
        <View style={styles.modalBody}>
          <Text style={styles.habitDuration}>{selectedHabit.duration || "60m"} minutes</Text>
          <FlatList
            data={selectedHabit.subTasks}
            renderItem={({ item, index }) => (
              <SubtaskItem subtask={item} />
            )}
            keyExtractor={(item) => `subtask-${item.id}`}
            style={styles.subtaskList}
          />
        </View>
      </View>
    </BottomSheetModal>
  }
    </SafeAreaView>
    </BottomSheetModalProvider>
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

const SubtaskItem = ({ subtask }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggleSubtask = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <TouchableOpacity style={styles.subtaskItem} onPress={handleToggleSubtask}>
      <View style={[styles.subtaskBox, isCompleted && styles.subtaskBoxCompleted]} />
      <Text style={[styles.subtaskText, isCompleted && styles.subtaskTextCompleted]}>{subtask.name}</Text>
    </TouchableOpacity>
  );
};






export default MainScreen;


