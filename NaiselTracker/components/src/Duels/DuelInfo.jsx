import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { DUEL_DETAILS } from './queries';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'; // Para manejar fechas más fácilmente

const DuelInfo = ({ route, navigation }) => {
  const { duelId } = route.params;
  const { data, loading, error } = useQuery(DUEL_DETAILS, {
    variables: { duelId },
  });

  if (loading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error) return <Text style={styles.errorText}>Error al cargar los datos</Text>;

  const duel = data.duelDetails;
  const now = moment();
  const finishTime = moment(duel.finishTime);
  const timeLeft = moment.duration(finishTime.diff(now));

  // Aquí podrías calcular los puntos y determinar quién es el líder

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Duelo contra {duel.challenged.username}</Text>
      
      {/* Tarjeta de Tiempo Restante */}
      <View style={styles.timeCard}>
        <Text style={styles.timeText}>{`Tiempo Restante: ${timeLeft.days()} días, ${timeLeft.hours()} horas`}</Text>
      </View>
      
      {/* Sección de Ranking */}
      {/* Asume que ya has calculado quién es el líder y los puntos, este es solo un placeholder */}
      <View style={styles.rankingSection}>
        {/* Tarjeta para el retador */}
        <View style={[styles.rankingCard, /* Condición ? {borderColor: 'yellow'} : null */]}>
          {/* Condición y muestra la corona si es líder */}
          <Text style={styles.rankingText}>{duel.challenger.username}</Text>
        </View>
        
        {/* Tarjeta para el retado */}
        <View style={[styles.rankingCard, /* Condición ? {borderColor: 'yellow'} : null */]}>
          {/* Condición y muestra la corona si es líder */}
          <Text style={styles.rankingText}>{duel.challenged.username}</Text>
        </View>
      </View>
      
      {/* Hábitos completados hoy */}
      <Text style={styles.habitsTitle}>Hábitos completados hoy por tu contrincante</Text>
      {/* Iterar sobre los hábitos y mostrarlos si se completaron hoy */}
      
      {/* Botón para ir a Mis Hábitos */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ir a mis hábitos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  rankingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rankingCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent', // Cambiar dinámicamente si es líder
  },
  rankingText: {
    color: 'white',
    fontSize: 16,
  },
  habitsTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DuelInfo;
