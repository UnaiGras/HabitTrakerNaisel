import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { DUEL_REQUESTS_PENDING, ACTIVE_DUELS } from './queries';
import { Ionicons } from '@expo/vector-icons';

const DuelScreen = () => {
  const { data: dataRequests, loading: loadingRequests, error: errorRequests } = useQuery(DUEL_REQUESTS_PENDING);
  const { data: dataDuels, loading: loadingDuels, error: errorDuels } = useQuery(ACTIVE_DUELS);

  if (loadingRequests || loadingDuels) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (errorRequests || errorDuels) return <Text style={styles.errorText}>Error al cargar los datos</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Duelos</Text>
      <View style={styles.card}>
        <Ionicons name="paper-plane" size={24} color="white" />
        <Text style={styles.cardText}>Solicitudes ({dataRequests.duelRequestsPending.length})</Text>
      </View>
      {dataRequests.duelRequestsPending.length === 0 && (
        <Text style={styles.noDataText}>No tienes solicitudes pendientes</Text>
      )}
      {dataDuels.activeDuels.length === 0 && (
        <Text style={styles.noDataText}>No tienes duelos activos</Text>
      )}
      {dataDuels.activeDuels.map((duel) => (
        <TouchableOpacity key={duel.id} style={styles.duelCard}>
          <Text style={styles.duelName}>{duel.name}</Text>
          <Text style={styles.text}>Contra: {duel.challenger.username} vs {duel.challenged.username}</Text>
          <Text style={styles.text}>Puntos: {duel.points}</Text>
          <Text style={styles.text}>Finaliza: {new Date(duel.finishTime).toLocaleDateString()}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Fondo oscuro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Texto claro
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white', // Texto claro
  },
  duelCard: {
    backgroundColor: '#333333', // Gris oscuro
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  duelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Texto claro
  },
  text: {
    color: 'grey', // Texto gris claro para el resto
  },
  noDataText: {
    color: 'grey', // Mensajes de no datos en gris claro
    textAlign: 'center',
    marginTop: 10,
  },
  loadingText: {
    color: 'white', // Cargando... en blanco
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red', // Error en rojo para contraste
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DuelScreen;
