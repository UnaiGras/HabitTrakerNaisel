import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { DUEL_REQUESTS_PENDING, ACTIVE_DUELS } from './duelQuerys';
import { Ionicons } from '@expo/vector-icons';

const DuelScreen = ({navigation}) => {
  const { data: dataRequests, loading: loadingRequests, error: errorRequests } = useQuery(DUEL_REQUESTS_PENDING);
  const { data: dataDuels, loading: loadingDuels, error: errorDuels } = useQuery(ACTIVE_DUELS);
  
  console.log("Has entrado")

  if (loadingRequests || loadingDuels) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (errorDuels) {
    return <Text style={styles.errorText}>Error al cargar los duelos activos: {errorDuels.message}</Text>;
  }

  // Asegurarse de que ambos datos están presentes antes de proceder
  if (!dataRequests || !dataDuels) {
    return <Text style={styles.errorText}>Error: Datos no disponibles</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Duelos</Text>
      <View style={styles.card}>
        <Ionicons name="paper-plane" size={24} color="white" />
        <Text style={styles.cardText}>Solicitudes ({dataRequests.duelRequestsPending.length})</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateDuelRequestForm")}>
        <Text style={styles.buttonText}>Crear nuevo reto</Text>
      </TouchableOpacity>
<View style={styles.duelsContainer}>
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
</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Fondo oscuro
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Texto claro
    alignSelf: 'center', // Centra el título
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828', // Un poco más claro que el fondo
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000', // Sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white', // Texto claro
  },
  duelCard: {
    backgroundColor: '#333333', // Gris oscuro, puedes hacerlo un poco más claro si quieres
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000', // Sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: 18
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
    fontSize: 18, // Ajustado para ser coherente
  },
  button: {
    backgroundColor: '#1F1F1F', // Un color que combine con el resto de la UI
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', // Centrar el texto del botón
    justifyContent: 'center',
    marginTop: 20, // Espacio arriba
    marginBottom: 40, // Espacio abajo para scroll
    shadowColor: '#000', // Sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white', // Texto claro
    fontWeight: 'bold',
  },
  duelsContainer: {
    backgroundColor: '#282828', // Un fondo claro respecto al tema oscuro de la app
    padding: 20, // Espacio interior para no pegar los elementos a los bordes
    borderRadius: 15, // Bordes redondeados
    shadowColor: '#000', // Sombra para darle profundidad
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Elevación para Android para la sombra
    marginBottom: 20, // Espacio debajo del contenedor para separarlo de otros elementos
  },
});


export default DuelScreen;
