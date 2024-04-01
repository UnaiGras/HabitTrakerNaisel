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
  Image,
  Alert,
  Modal
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
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import { achivements as definedAchievements} from '../../../achivements';
import { COMPLETE_DUEL_HABIT, DUEL_DETAILS  } from '../Duels/duelQuerys';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { ME } from './mainQuerys';
import TermsAndConditions from '../General/TermsAndConditions';



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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Añade un fondo oscuro para resaltar el modal
  },
  modalView: {
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#a565f2',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '75%', // Ajusta esto según lo grande que quieras que sea el modal
    height: '75%', // Ajusta esto según lo grande que quieras que sea el modal
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
    padding: 20,
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
      borderRadius: 15,
      overflow: 'hidden', // Esto es para asegurar que el contenido no se desborde de los bordes redondeados
      width: "90%",
      alignSelf: "center"
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
    subtaskText: {
      color: '#ffffff',
      fontSize: 16,
    },
    subtaskTextCompleted: {
      textDecorationLine: 'line-through',
      color: '#777777', // Un color más tenue para el texto completado
    },
    selectedButton: {
      // Estilo para el botón seleccionado
      backgroundColor: "#191919",
      borderRadius: 20,
    },
    unselectedButton: {
      // Estilo para el botón no seleccionado
      backgroundColor: "transparent",
    },
    toggleButtonText: {
      // Estilos base para el texto de tus botones
      color: 'white',
      textAlign: 'center',
      fontWeight: "600"
    },
    selectedButtonText: {
      fontWeight: "600"
    },
    unselectedButtonText: {
      // Opcional: Estilo adicional para el texto del botón no seleccionado si es necesario
    },
    toggleButton: {
      justifyContent: "center",
      padding: 10,
      paddingHorizontal: 20,
      width: "33%"
    },
    completedAllHabitsStyle: {
      
    }
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
    const [milestoneModalVisible, setMilestoneModalVisible] = useState(false)
    const [currentMilestone, setCurrentMilestone] = useState(null)
    const [habits, setHabits] = useState([])
    const [selectedHabit, setSelectedHabit] = useState(null)
    const [viewMode, setViewMode] = useState('userHabits')
    const [sounds, setSounds] = useState({});
    const [duelHabits, setDuelHabits] = useState([])
    const [me, setMe] = useState({})
    const [completedDuelHabits, setCompletedDuelHabits] = useState(new Set)
    const [termsAccepted, seTermsAccepted] = useState(true)
    const [duelId, setDuelId] = useState("")
    const [duelData, setDuelData] = useState(null)

    const [challengeHabits, setChallengeHabits] = useState([]);
    const [completedChallengeHabits, setCompletedChallengeHabits] = useState(new Set());
    
    const [completedHabits, setCompletedHabits] = useState(new Set());
    const [daysCompletedAllHabits, setDaysCompletedAllHabits] = useState([false, false, false, false, false, false, false]);

    const [getDuelData, {data: habitDuels}] = useLazyQuery(DUEL_DETAILS)
    const [completeDuelHabit, result] = useMutation(COMPLETE_DUEL_HABIT)


    useQuery(ME, {
      onCompleted: (data) => {
        console.log("esto es la data de el user de la nube", data.me)
        setMe(data.me)
      }
    })


    const snapPoints = useMemo(() => ['33%', '80%'], []);

    const daysOfWeek = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
    const { month, year } = getMonthAndYear();
    const currentDayIndex = new Date().getDay();
    const adjustedIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;


    const handlePresentModalPress = useCallback((habit) => {
      setSelectedHabit(habit);
      bottomSheetModalRef.current?.present();
    }, []);

    async function loadSounds() {
      const soundFiles = {
        habitCompleted: require("../../../assets/audios/completedHabit.wav"),
        increasePoints: require("../../../assets/audios/3sPointsCount.wav"),
        challengeHabitCompleted: require("../../../assets/audios/bonus.wav")

      };
  
      const soundObjects = {};
      for (const key in soundFiles) {
        const { sound } = await Audio.Sound.createAsync(soundFiles[key]);
        soundObjects[key] = sound;
      }
  
      setSounds(soundObjects);
    }

    const addPointsToUser = async () => {
      const pointsToAdd = 100; // Definir los puntos a añadir
    
      try {
        // Llama a la función para actualizar puntos y verificar hitos
        let updatedUserProfile = await updatePointsAndCheckMilestones(pointsToAdd);
        if (!updatedUserProfile) return;
    
        // Suponiendo que `updatePointsAndCheckMilestones` maneja la lógica para
        // actualizar el perfil del usuario, verificar si se alcanzó un nuevo hito,
        // y actualizar el estado adecuadamente.
        console.log('Puntos añadidos correctamente.');
      } catch (error) {
        console.error('Error al añadir puntos al usuario:', error);
      }
    };
    
    

    const updatePointsAndCheckMilestones = async (pointsToAdd) => {
      try {
        console.log("por", pointsToAdd)
        const userProfileString = await AsyncStorage.getItem('userProfile');
        if (!userProfileString) return;
        
        let userProfile = JSON.parse(userProfileString);
        userProfile.points += pointsToAdd;
        
        
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
        let updatedUserProfile = await updatePointsAndCheckMilestones(pointsToAdd);
        if (!updatedUserProfile) return;
    
        // Encuentra el hábito y actualiza su última fecha de completado usando el userProfile actualizado
        const habitIndex = updatedUserProfile.activeHabits.findIndex(habit => habit.id === habitId);
        if (habitIndex !== -1) {
          updatedUserProfile.activeHabits[habitIndex].lastCompletedDate = today;

          console.log("Se a actualizado el esatdo de el habito en localstorage")
    
          if (!updatedUserProfile.dailyHabitTracking) {
            updatedUserProfile.dailyHabitTracking = {};
          }
          if (!updatedUserProfile.dailyHabitTracking[today]) {
            updatedUserProfile.dailyHabitTracking[today] = [];
          }
          updatedUserProfile.dailyHabitTracking[today].push(habitId); // Añade el ID del hábito completado
    
          // Verifica si se han completado todos los hábitos para hoy y actualiza la racha y la productividad
          updatedUserProfile = checkAndUpdateStreak(updatedUserProfile, today);
          updatedUserProfile = updateProductivity(updatedUserProfile, today);
    
          // Guarda el userProfile actualizado en AsyncStorage
          await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));
          setCompletedHabits(prev => new Set(prev).add(habitId)); // Actualiza el estado de los hábitos completados

          if (sounds && sounds.habitCompleted) {
            await sounds.habitCompleted.stopAsync();
            await sounds.habitCompleted.setPositionAsync(0);
            await sounds.habitCompleted.playAsync();
          }
          
          

        }
      } catch (error) {
        console.error('Error al completar el hábito', error);
      }
    };
    

    const handleCompleteChallengeHabit = async (habitId) => {
      const todayStr = new Date().toISOString().split('T')[0];
    
      if (completedChallengeHabits.has(habitId)) {
        console.log('Este hábito ya ha sido completado hoy.');
        return;
      }
    
      try {
        // Recuperar el perfil del usuario de AsyncStorage
        const userProfileString = await AsyncStorage.getItem('userProfile');
        if (!userProfileString) return;
    
        let userProfile = JSON.parse(userProfileString);
    
        // Actualiza el campo lastCompletedDate del hábito específico dentro del reto activo
        const activeChallengeIndex = userProfile.activeChallenges.findIndex(challenge => challenge.habits.some(habit => habit.id === habitId));
        if (activeChallengeIndex !== -1) {
          const habitIndex = userProfile.activeChallenges[activeChallengeIndex].habits.findIndex(habit => habit.id === habitId);
          if (habitIndex !== -1) {
            userProfile.activeChallenges[activeChallengeIndex].habits[habitIndex].lastCompletedDate = todayStr;
          }
        }
    
        // Guardar el userProfile actualizado en AsyncStorage
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
    
        // Actualizar los estados
        setCompletedChallengeHabits(prev => new Set(prev).add(habitId)); // Añade el ID del hábito completado

        if (sounds && sounds.challengeHabitCompleted) {
          await sounds.challengeHabitCompleted.stopAsync();
          await sounds.challengeHabitCompleted.setPositionAsync(0);
          await sounds.challengeHabitCompleted.playAsync();
        }
    
        console.log('Hábito del reto completado con éxito.');


      
      } catch (error) {
        console.error('Error al completar el hábito del reto', error);
      }
    };
    
    
    

    const handleDeleteHabit = async (habitId) => {

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

    const updateSubtaskCompletionDate = async (habitId, subtaskId) => {
      try {
        const userProfileString = await AsyncStorage.getItem('userProfile');
        if (userProfileString !== null) {
          // Convertir el string de userProfile a objeto
          const userProfile = JSON.parse(userProfileString);
    
          // Encontrar el hábito específico
          const habitIndex = userProfile.activeHabits.findIndex(habit => habit.id === habitId);
          if (habitIndex !== -1) {
            // Encontrar la subtask específica
            const subtaskIndex = userProfile.activeHabits[habitIndex].subTasks.findIndex(subtask => subtask.id === subtaskId);
            if (subtaskIndex !== -1) {
              // Verificar si la subtask tiene el campo lastCompletedDate
              if (!userProfile.activeHabits[habitIndex].subTasks[subtaskIndex].hasOwnProperty('lastCompletedDate')) {
                userProfile.activeHabits[habitIndex].subTasks[subtaskIndex].lastCompletedDate = null; // Añadir con valor null si no existe
              }
    
              // Actualizar con la fecha actual
              userProfile.activeHabits[habitIndex].subTasks[subtaskIndex].lastCompletedDate = new Date().toISOString().split('T')[0];
    
              // Guardar el objeto userProfile actualizado en AsyncStorage
              await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
            }
          }
        }
      } catch (error) {
        console.error('Error al actualizar la fecha de completado de la subtask:', error);
      }
    };

    const handleCompleteDuelHabit = async (habitId) => {
      try {

        console.log("----Has entrado en la mutacion de completar el habito----")
        const { data } = await completeDuelHabit({
          variables: {
            duelId: duelId, // Suponiendo acceso a la ID del duelo activo
            habitId: habitId,
          },
        });
        console.log("---Mutacion completada con exito")
    
        if (data && data.completeHabit) {
          console.log("Data de la mutación recibida", data.completeHabit);
    
          // Encuentra los puntos del hábito específico
          const habit = duelData.habits.find(habit => habit.id === habitId);
          console.log("Hábito encontrado", habit);
    
          if (!habit) {
            console.error("El hábito con el ID proporcionado no se encuentra en duelData");
            return;
          }
    
          const habitPoints = habit.points;
          console.log("Puntos del hábito", habitPoints);
    
          // Verificar si el usuario actual es el challenger o el challenged usando las ID
          const isChallenger = duelData.challenger.id === me.id;
          const isChallenged = duelData.challenged.id === me.id;
          console.log("Es Challenger?", isChallenger, "Es Challenged?", isChallenged);
    
          if (isChallenger) {
            // Crea una copia actualizada de duelData con los nuevos puntos del challenger
            const updatedDuelData = {
              ...duelData,
              challengerPoints: duelData.challengerPoints + habitPoints,
            };
          
            console.log("Nuevos puntos del Challenger", updatedDuelData.challengerPoints);
          
            // Actualiza el estado de duelData con esta nueva copia
            setDuelData(updatedDuelData);
          } else if (isChallenged) {
            // Crea una copia actualizada de duelData con los nuevos puntos del challenged
            const updatedDuelData = {
              ...duelData,
              challengedPoints: duelData.challengedPoints + habitPoints,
            };
          
            console.log("Nuevos puntos del Challenged", updatedDuelData.challengedPoints);
          
            // Actualiza el estado de duelData con esta nueva copia
            setDuelData(updatedDuelData);
          } else {
            console.error("El usuario no es ni Challenger ni Challenged");
            return;
          }
          
          console.log("duelData actualizado con éxito");
    
          // Actualiza el estado de completedDuelHabits para incluir el hábito recién completado
          setCompletedDuelHabits(prevCompleted => new Set(prevCompleted).add(habitId));
          console.log("completedDuelHabits actualizado con éxito");
        }
      } catch (error) {
        console.error("Error al completar el hábito: ", error);
      }
    };
    

    const handleGoDuels = async () => {
      const isLoggedIn = await checkUserLoggedAndToken(true); // Utiliza la función para verificar si el usuario está logueado
      if (isLoggedIn) {
          // Si el usuario está logueado, navega a DuelScreen
          navigation.navigate("DuelScreen");
      }
      // Si el usuario no está logueado, checkUserLoggedAndToken ya habrá mostrado un alerta, así que no necesitas hacer nada más aquí.
  };

  const acceptTermsAndConditions = async() => {
    try {
      const userProfileJson = await AsyncStorage.getItem('userProfile');
      const userProfile = userProfileJson ? JSON.parse(userProfileJson) : {};

      // Actualizar sólo el campo termsAccepted a true
      userProfile.termsAccepted = true;

      // Guardar el objeto modificado de vuelta en AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      seTermsAccepted(true)
      console.log('Términos aceptados y perfil actualizado.');
    } catch (error) {
      console.log('Error al actualizar el perfil:', error);
    }
  }
    
    

    useEffect(() => {
      // Lógica para cargar sonidos
      loadSounds();
    
      // Función de limpieza para descargar los sonidos
      return () => {
        Object.values(sounds).forEach(sound => {
          if (sound) {
            sound.unloadAsync();
          }
        });
      };
    }, []);
    
    
    useEffect(() => {
      const fetchUserProfileAndTrackHabits = async () => {
        try {
          const storedUserProfile = await AsyncStorage.getItem('userProfile');
          if (storedUserProfile !== null) {
            const profile = JSON.parse(storedUserProfile);
            setUserProfile(profile); 
            setHabits(profile.activeHabits); // Actualiza los hábitos activos en el estado
            seTermsAccepted(profile.termsAccepted)
            console.log(" active duel guardado en el perfil",profile.activeDuel)
            
            if (profile.activeDuel) {
              const { data } = await getDuelData({
                variables: {
                  duelId: profile.activeDuel
                }
              });
              // Actualiza el estado de duelHabits con los hábitos del duelo
              console.log("*********** Data de los habitos en la nube ************")
            

            if (data && data.duelDetails) {
              setDuelHabits(data.duelDetails.habits);
              setDuelId(profile.activeDuel)
              setDuelData(data.duelDetails)
              console.log("Habitos de el duelo",data.duelDetails.habits)
              // Comprobación de hábitos completados en el duelo por el usuario
              const meId = me.id; // Suponiendo que me.id es el id del usuario actual
             console.log("ME----",me)
              const challengerId = data.duelDetails.challenger.id;
              const challengedId = data.duelDetails.challenged.id;
  
              console.log({
                challengerId:data.duelDetails.challenger.id,
                challengedId:data.duelDetails.challenged.id
              })
              const todayStr = new Date().toISOString().split('T')[0];
              const completedHabitIds = new Set();
  
              data.duelDetails.habits.forEach(habit => {

                const challengerLastCompletedDate = new Date(habit.challengerLastCompletedDate);
                const challengedLastCompletedDate = new Date(habit.challengedLastCompletedDate);


                if ((challengerLastCompletedDate.toISOString().split('T')[0] === todayStr && challengerId === meId) ||
                    (challengedLastCompletedDate.toISOString().split('T')[0] === todayStr && challengedId === meId)) {
                  completedHabitIds.add(habit.id);
                }
                
              });
  
              setCompletedDuelHabits(completedHabitIds);
              console.log("Completed Habits: ", completedHabitIds)
              console.log("***************************************")
            }
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
    
            const todayStr = new Date().toISOString().split('T')[0]

            if (profile.activeChallenges && profile.activeChallenges.length > 0) {
              const activeChallengeHabits = profile.activeChallenges[0].habits;
              setChallengeHabits(activeChallengeHabits);
               // Configura los hábitos del reto activo

              const completedChallengeHabitsToday = new Set(
                activeChallengeHabits.filter(habit => habit.lastCompletedDate === todayStr).map(habit => habit.id)
              );
              setCompletedChallengeHabits(completedChallengeHabitsToday);
            }
                      
            // Después: Usa dailyHabitTracking para establecer los hábitos completados
            ; // Formato: 'YYYY-MM-DD'
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

            await ensureNotificationPermissions()
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
      {!termsAccepted && 
        <Modal
        animationType="slide"
        transparent={true}
        visible={!termsAccepted}
        onRequestClose={() => {
          alert("Los términos y condiciones deben ser aceptados para continuar.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TermsAndConditions onAcceptTerms={acceptTermsAndConditions} />
          </View>
        </View>
      </Modal>
      }
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
        <TouchableOpacity onPress={handleGoDuels}>
            <Ionicons name="people-circle" size={30} color="white" style={{ marginRight: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("StatsScreen")}>
            <Ionicons name="stats-chart" size={30} color="white" style={{ marginRight: 20 }} />
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Ionicons name="settings" size={30} color="white" />
            </TouchableOpacity> 
          
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
        {
           viewMode === 'userHabits' ? (
          <ScoreCounter finalScore={userProfile.points} increasePointsSound={sounds.increasePoints}/>
        ): viewMode === 'challengeHabits' ? (
          <ChallengeScoreCounter 
          finalScore={completedChallengeHabits.size} 
          totalHabits={challengeHabits.length}
          />
        ) : (
          <DuelScoreCounter duelData={duelData}/>
        )
        }
        </View>


      </View>
      <View >
        <TouchableOpacity onPress={addPointsToUser} style={{backgroundColor: "white", padding:20}}>
          <Text>Dale ahi miloko</Text>
        </TouchableOpacity>
  <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 5, backgroundColor: "#353535", borderRadius: 20, padding: 2, alignSelf: "center", width: "80%" }}>
      <TouchableOpacity onPress={() => setViewMode('userHabits')} style={[styles.toggleButton, viewMode === 'userHabits' ? styles.selectedButton : styles.unselectedButton]}>
        <Text style={[styles.toggleButtonText, viewMode === 'userHabits' ? styles.selectedButtonText : styles.unselectedButtonText]}>Diarios</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setViewMode('challengeHabits')} style={[styles.toggleButton, viewMode === 'challengeHabits' ? styles.selectedButton : styles.unselectedButton]}>
        <Text style={[styles.toggleButtonText, viewMode === 'challengeHabits' ? styles.selectedButtonText : styles.unselectedButtonText]}>Reto</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setViewMode('duelHabits')} style={[styles.toggleButton, viewMode === 'duelHabits' ? styles.selectedButton : styles.unselectedButton]}>
        <Text style={[styles.toggleButtonText, viewMode === 'challengeHabits' ? styles.selectedButtonText : styles.unselectedButtonText]}>Duelo</Text>
      </TouchableOpacity>
    </View>

  {
    viewMode === 'userHabits' ? (
      <FlatList
          data={habits}
          renderItem={({ item }) => (
              <HabitCard
                title={item.name}
                icon={item.icon}
                duration={item.duration}
                color={item.color}
                id={item.id}
                onComplete={() => handleCompleteHabit(item.id,item.points)}
                isCompleted={completedHabits.has(item.id)}
                openInfo={() => handlePresentModalPress(item)}
              />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{paddingBottom: 50 }}
          ListFooterComponent={<View style={{ height: 600 }} />}
        />
  ): viewMode === 'challengeHabits' ? (
    challengeHabits && challengeHabits.length > 0 ? (
      <FlatList
        data={challengeHabits}
        renderItem={({ item }) => (
            <HabitCard
              title={item.name}
              icon={item.icon}
              duration={item.duration}
              color={item.color}
              id={item.id}
              onComplete={() => handleCompleteChallengeHabit(item.id)}
              isCompleted={completedChallengeHabits.has(item.id)}
              openInfo={() => handlePresentModalPress(item)}
            />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{paddingBottom: 50 }}
        ListFooterComponent={<View style={{ height: 600 }} />}
      />
    ) : (
      // Mensaje cuando no hay challengeHabits
      <View style={{ justifyContent: "center"}}>
      <Text style={{ textAlign: 'center', marginTop: 20, color: "gray", fontSize: 30, fontWeight: "700", maxWidth: "80%", alignSelf: "center"}}>
        Aún no has aceptado ningún reto.
      </Text>
    </View>
    )
  ): (
    <FlatList
      data={duelHabits}
      renderItem={({ item }) => (
        <HabitCard
          title={item.name}
          icon={item.icon}
          duration={item.duration}
          color={item.color}
          id={item.id}
          onComplete={() => handleCompleteDuelHabit(item.id)}
          isCompleted={completedDuelHabits.has(item.id)}
          openInfo={() => handlePresentModalPress(item)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{paddingBottom: 50 }}
      ListFooterComponent={<View style={{ height: 600 }} />}
    />
  )
  }
</View>
        </View>

      <AppBar navigation={navigation} position={"home"}/>
      
        <MilestoneCard
          visible={milestoneModalVisible}
          milestone={currentMilestone}
          onHide={() => setMilestoneModalVisible(false)} // Oculta el modal cuando la animación termine o el usuario cierra el modal
        />
      

  {selectedHabit &&
      <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      style={{ backgroundColor: "#202020" }}
      backgroundStyle={{ backgroundColor: "#252525" }}
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
              <SubtaskItem 
              subtask={item} 
              onUpdate={updateSubtaskCompletionDate}
              habitId={selectedHabit.id}
              color={selectedHabit.color}
              />
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

const ScoreCounter = ({ finalScore, increasePointsSound }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [score, setScore] = useState('0'); // Estado para almacenar el valor del score como texto

  useEffect(() => {

    const playIncreasePointsSound = async () => {
      if (increasePointsSound) {
        await increasePointsSound.playAsync();
        // Asegurarse de que el sonido empieza desde el principio si se va a reproducir múltiples veces
        increasePointsSound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.didJustFinish) {
            await increasePointsSound.setPositionAsync(0);
            await increasePointsSound.stopAsync();
          }
        });
      }
    };

    playIncreasePointsSound();


    Animated.timing(animatedValue, {
      toValue: finalScore,
      duration: 3000,
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

const SubtaskItem = ({ subtask, onUpdate, habitId, color }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  // Función para comparar si la fecha pasada es igual a la fecha actual
  const isToday = (dateString) => {
    const todayString = new Date().toISOString().split('T')[0];
    return dateString === todayString;
  };
  
  useEffect(() => {
    // Establecer isCompleted a true si lastCompletedDate es hoy
    console.log("Estas en las subtareas", subtask);
    if (subtask.lastCompletedDate && isToday(subtask.lastCompletedDate)) {
      setIsCompleted(true);
    }
  }, [subtask])

  const handleToggleSubtask = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    if (newCompletedState) {
      onUpdate(habitId, subtask.id); // Actualiza la fecha de última completación
    }
  };

  return (
    <TouchableOpacity style={styles.subtaskItem} onPress={handleToggleSubtask}>
      <View style={[styles.subtaskBox, isCompleted && {backgroundColor: color}]} />
      <Text style={[styles.subtaskText, isCompleted && styles.subtaskTextCompleted]}>{subtask.name}</Text>
    </TouchableOpacity>
  );
};




const ChallengeScoreCounter = ({ finalScore, totalHabits }) => {
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
      {score}/{totalHabits}
    </Animated.Text>
  );
};

const DuelScoreCounter = ({ duelData }) => {
  const challengerAnimatedValue = useRef(new Animated.Value(0)).current;
  const challengedAnimatedValue = useRef(new Animated.Value(0)).current;
  
  // Estados para almacenar los valores de los puntos como texto
  const [challengerScore, setChallengerScore] = useState('0');
  const [challengedScore, setChallengedScore] = useState('0');

  useEffect(() => {
    // Asegurar que los puntos son números válidos
    const challengerPoints = Number(duelData.challengerPoints) || 0;
    const challengedPoints = Number(duelData.challengedPoints) || 0;
  
    // Animar puntos del challenger
    Animated.timing(challengerAnimatedValue, {
      toValue: challengerPoints,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  
    // Animar puntos del challenged
    Animated.timing(challengedAnimatedValue, {
      toValue: challengedPoints,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  
    // Listener para challenger
    challengerAnimatedValue.addListener((animation) => {
      const value = Math.floor(animation.value).toString();
      setChallengerScore(value);
    });
  
    // Listener para challenged
    challengedAnimatedValue.addListener((animation) => {
      const value = Math.floor(animation.value).toString();
      setChallengedScore(value);
    });
  
    // Limpiar listeners cuando el componente se desmonte
    return () => {
      challengerAnimatedValue.removeAllListeners();
      challengedAnimatedValue.removeAllListeners();
    };
  }, [duelData.challengerPoints, duelData.challengedPoints]);

  return (
    <View>
      <Text style={{color: 'white', fontSize: 18, marginBottom: 10}}>
        {duelData.challenger.username}: <Animated.Text>{challengerScore}</Animated.Text>
      </Text>
      <Text style={{color: 'white', fontSize: 18}}>
        {duelData.challenged.username}: <Animated.Text>{challengedScore}</Animated.Text>
      </Text>
    </View>
  );
};


const checkAndUpdateStreak = (userProfile, today) => {
  // Crea una copia profunda del userProfile para evitar mutaciones directas
  let updatedProfile = JSON.parse(JSON.stringify(userProfile));

  // Asegúrate de que updatedProfile.achievements esté definido
  if (!updatedProfile.achievements) {
    updatedProfile.achievements = [];
  }

  // Comprueba si todos los hábitos han sido completados hoy
  const allHabitsCompletedToday = updatedProfile.activeHabits.every(habit => 
    habit.lastCompletedDate === today
  );

  if (!updatedProfile.currentStreak) {
     updatedProfile.currentStreak = {
      count: 0,
      startDate: null, 
    }
  }

  if (allHabitsCompletedToday) {
    if (!updatedProfile.currentStreak.startDate) {
      updatedProfile.currentStreak.startDate = today;
      updatedProfile.currentStreak.count = 1;
    } else {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];

      if (updatedProfile.currentStreak.startDate === yesterdayString ||
          updatedProfile.currentStreak.count === 1) {
        updatedProfile.currentStreak.count++;
      } else {
        updatedProfile.currentStreak.startDate = today;
        updatedProfile.currentStreak.count = 1;
      }
    }

    definedAchievements.streak.forEach(achievement => {
      const alreadyEarned = updatedProfile.achievements.some(a => a.name === achievement.name);
      if (!alreadyEarned && updatedProfile.currentStreak.count >= achievement.milestone) {
        updatedProfile.achievements.push({
          name: achievement.name,
          description: achievement.description,
          streak: achievement.milestone,
          icon: achievement.image, // Asumiendo que 'image' puede usarse como 'icon' aquí
          color: '#FFD700', // O cualquier lógica para asignar colores
        });
      }
    });
  }

  console.log(allHabitsCompletedToday ? "Se ha actualizado la racha": "No se ha actualizado la racha")

  return updatedProfile;
};


const updateProductivity = (userProfile, today) => {
  // Crea una copia profunda del userProfile para evitar mutaciones directas

  console.log("Actualizando productividad...")
  let updatedProfile = JSON.parse(JSON.stringify(userProfile));

  if (!updatedProfile.productivity) {
    updatedProfile.productivity = { current: 0, history: [] };
  }

  const totalPointsEarnedToday = updatedProfile.activeHabits.reduce((total, habit) => {
    return total + (habit.lastCompletedDate === today ? habit.points : 0);
  }, 0);
  const totalPointsPossibleToday = updatedProfile.activeHabits.reduce((total, habit) => total + habit.points, 0);
  const productivityPercentage = (totalPointsEarnedToday / totalPointsPossibleToday) * 100;

  // Actualiza el registro histórico de productividad
  const lastProductivityRecord = updatedProfile.productivity.history[updatedProfile.productivity.history.length - 1];
  if (lastProductivityRecord && lastProductivityRecord.date === today) {
    lastProductivityRecord.productivity = productivityPercentage;
  } else {
    updatedProfile.productivity.history.push({
      date: today,
      productivity: productivityPercentage
    });
  }

  // Actualiza la productividad actual
  updatedProfile.productivity.current = productivityPercentage;

  console.log("Se a actualizado la productividad a", productivityPercentage)

  return updatedProfile;
};

async function ensureNotificationPermissions() {

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let granted = false; 


  if (existingStatus === 'granted') {
    console.log('Notification permissions already granted.');
    granted = true;
  } else {

    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      console.log('Notification permissions granted.');
      granted = true;
    } else {
      console.log('Notification permissions denied.');
      granted = false;
    }
  }


  try {
    const userProfileStr = await AsyncStorage.getItem('userProfile');
    if (userProfileStr) {
      const userProfile = JSON.parse(userProfileStr);


      userProfile.activatedNotifications = granted;


      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      console.log('userProfile updated with notification permission status.');
    }
  } catch (error) {
    console.error('Error updating userProfile with notification permission status:', error);
  }
}


export const checkUserLoggedAndToken = async (showAlert) => {
    try {
        const token = await AsyncStorage.getItem('token'); // Intentar recuperar el token de AsyncStorage
        if (token) {
            // Si hay un token, asumimos que el usuario está logueado
            console.log('Usuario logueado con token:', token);
            return true; // Puedes retornar true o el token, según necesites
        } else {
            // Si no hay token, el usuario no está logueado
            // Mostrar un mensaje indicando que se requiere iniciar sesión
            if(showAlert){
            Alert.alert(
                "Inicio de sesión requerido",
                "Debes iniciar sesión para continuar. Ve a Ajustes > Login.",
                [
                    { text: "OK" } // Puedes agregar un botón para redirigir al usuario a la pantalla de login si lo deseas
                ]
            );}
            return false;
        }
    } catch (error) {
        // En caso de un error al recuperar el token, también podrías manejarlo aquí
        console.error('Error al verificar el estado de inicio de sesión:', error);
        return false;
    }
};




export default MainScreen;


