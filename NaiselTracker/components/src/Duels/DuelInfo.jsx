import React, {useEffect, useRef, useMemo, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { DUEL_DETAILS } from './duelQuerys';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'; // Para manejar fechas más fácilmente
import { ME } from '../Main/mainQuerys';

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const DuelInfo = ({ route, navigation }) => {
  const { duelId } = route.params;
  console.log("Este es el duelId: ", duelId)

  const [selectedHabit, setSelectedHabit] = useState(null);
  const [duelInfo, setDuelInfo] = useState(null)
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // Suponiendo que 'ME_QUERY' es la query para obtener el usuario en pantalla
  const { data: userData, loading: userLoading, error: userError } = useQuery(ME, {
    onCompleted: (d) => {
      console.log(d)
    },
    onError: (e) => {
      console.log(e)
    }
  });

  const { data, loading, error } = useQuery(DUEL_DETAILS, {
    variables: { duelId },
    onCompleted: (d) => {
      setDuelInfo(d.duelDetails)
    }
  });

  useEffect(() => {
    if (selectedHabit) {
      bottomSheetModalRef.current?.present();
    }
  }, [selectedHabit]);

  if (loading || userLoading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error || userError) return <Text style={styles.errorText}>Error al cargar los datos</Text>;
  if (!duelInfo) return <Text style={styles.errorText}>Información del duelo no disponible</Text>;


  const now = moment(); // Captura el momento actual
  const finishTime = moment(parseInt(duelInfo.finishTime, 10)); // Asegúrate de que finishTime es un número
  const startTime = moment(parseInt(duelInfo.startTime, 10)); // Convertir startTime a Moment si es necesario
  const timeLeft = moment.duration(finishTime.diff(now));

  // Aquí podrías calcular los puntos y determinar quién es el líder

  const challengerPoints = duelInfo.challengerPoints || 0;
  const challengedPoints = duelInfo.challengedPoints || 0;
  const isChallengerLeader = challengerPoints >= challengedPoints;
  const leaderUsername = isChallengerLeader ? duelInfo.challenger.username : duelInfo.challenged.username;
  const followerUsername = isChallengerLeader ? duelInfo.challenged.username : duelInfo.challenger.username;

  const renderHabitDetails = () => (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={styles.modalBackground}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSelectedHabit(null)}>
          <Ionicons name='close' size={24} color="white"/>
        </TouchableOpacity>
        <View style={styles.habitIconContainer}>
          <Ionicons name={selectedHabit?.icon} size={60} color={selectedHabit?.color}/>
        </View>
        <Text style={styles.habitTitle}>{selectedHabit?.name}</Text>
        <Text style={styles.habitDescription}>{selectedHabit?.desc}</Text>
        <Text style={styles.habitDuration}>{selectedHabit?.duration} minutes</Text>
        <FlatList
          data={selectedHabit?.subTasks}
          renderItem={({ item }) => <Text style={styles.subtaskText}>{item.name}</Text>}
          keyExtractor={(item) => `subtask-${item.id}`}
        />
      </View>
    </BottomSheetModal>
  );

  return (
    <BottomSheetModalProvider>
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
      <Text style={styles.title}>Duelo contra <Text style={{color: "#a565f2"}}>{duelInfo.challenged.username === userData.me.username ? duelInfo.challenger.username : duelInfo.challenged.username}</Text></Text>
      
      <View style={styles.rankingSection}>
        <View style={[styles.rankingCard, isChallengerLeader ? {borderColor: '#a565f2'} : null]}>
          {isChallengerLeader && <Ionicons name="diamond" size={24} color="gold" />}
          <Text style={styles.rankingText}>{leaderUsername} - {isChallengerLeader ? challengerPoints : challengedPoints} pts</Text>
        </View>
        
        <View style={[styles.rankingCard, !isChallengerLeader ? {borderColor: '#a565f2'} : null]}>
          {!isChallengerLeader && <Ionicons name="diamond" size={24} color="gold" />}
          <Text style={styles.rankingText}>{followerUsername} - {!isChallengerLeader ? challengerPoints : challengedPoints} pts</Text>
        </View>
      </View>

      
      {/* Espacio para hábitos */}
      <View style={styles.habitsSection}>
      <Text style={styles.habitsTitle}>Hábitos completados hoy por tu contrincante</Text>
      <FlatList
          data={duelInfo.habits}
          renderItem={({ item }) => (
            <HabitCard
              habit={item}
              onPress={() => setSelectedHabit(item)}
            />
          )}
          keyExtractor={(item) => `habit-${item.id}`}
        />
      </View>
      <View>

      <View style={styles.timeCard}>
        {isValidTimeLeft ? (
          <Text style={styles.timeText}>
            Tiempo Restante: {timeLeft.days()} días, {timeLeft.hours()} horas
          </Text>
        ) : (
          <Text style={styles.timeText}>El reto ha finalizado</Text>
        )}
      </View>

      {/* View para la duración total del reto */}
      <View style={styles.timeCard}>
        <Text style={styles.timeText}>
          Duración Total: {duelInfo.durationDays} días
        </Text>
      </View>
    </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ir a mis hábitos</Text>
      </TouchableOpacity>
      {selectedHabit && renderHabitDetails()}
    </ScrollView>
    </BottomSheetModalProvider>
  );
};


const HabitCard = ({ habit, onPress }) => {
  const { name, icon, color, duration } = habit;
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Ionicons name={icon} size={38} color={color} style={styles.icon} />
      <Text style={styles.habitTitle}>{name}</Text>
      <Text style={styles.duration}>{duration}</Text>
    </TouchableOpacity>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      padding: 20,
      paddingVertical: 60
    },
    title: {
      color: "white",
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center', // Centrar el título
    },
    timeCard: {
      backgroundColor: '#232323', // Un poco más claro para diferenciar
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      width: '90%', // Hacer que las tarjetas sean un poco más anchas
    },
    timeText: {
      color: '#a565f2', // Lila para texto importante
      fontSize: 16,
      textAlign: 'center', // Texto centrado
    },
    rankingSection: {
      marginBottom: 20,
      width: '100%', // Usar todo el ancho disponible
    },
    rankingCard: {
      flexDirection: "row",
      backgroundColor: '#232323',
      padding: 15,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'transparent', // Cambiar dinámicamente si es líder
      width: '90%', // Ajustar el ancho para adaptarse al nuevo diseño
      alignSelf: "center",
      marginVertical: 5
    },
    rankingText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center', // Texto centrado
    },
    habitsTitle: {
      color: 'gray', // Lila para títulos de sección
      fontSize: 14,
      marginBottom: 10,
      textAlign: 'center', // Título centrado
    },
    button: {
      backgroundColor: '#333',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      width: '60%', // Botón más ancho
    },
    buttonText: {
      color: '#a565f2', // Lila para texto del botón
      fontSize: 16,
    },
    loadingText: {
      color: 'white',
      textAlign: 'center',
      marginTop: 20,
      fontSize: 30
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
      fontSize: 30
    },
    habitsSection: {
      backgroundColor: "#252525",
      width: "90%",
      padding: 20,
      borderRadius: 10
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      marginVertical: 8,
      borderRadius: 20,
      backgroundColor: '#252525',
      borderRightWidth: 4,
      borderRightColor: 'transparent',
      width: "90%"
    },

    icon: {
      marginRight: 10,
    },
    duration: {
      color: 'white',
      fontSize: 14,
      fontWeight: "700"
    },
    modalBackground: {
      backgroundColor: "#202020"
    },
    modalContent: {
      padding: 20,
    },
    modalCloseButton: {
      alignSelf: 'flex-end',
    },
    habitIconContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    habitTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    habitDescription: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginVertical: 10,
    },
    habitDuration: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
      marginBottom: 20,
    },
    subtaskText: {
      color: 'white',
      fontSize: 14,
      paddingVertical: 4,
    },
  });

export default DuelInfo
