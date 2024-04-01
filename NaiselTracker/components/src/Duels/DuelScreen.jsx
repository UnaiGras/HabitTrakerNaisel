import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { DUEL_REQUESTS_PENDING, ACTIVE_DUELS } from './duelQuerys';
import { Ionicons } from '@expo/vector-icons';

const DuelScreen = ({navigation}) => {
  const { data: dataRequests, loading: loadingRequests, error: errorRequests } = useQuery(DUEL_REQUESTS_PENDING, {

    onCompleted: (data) => {
      console.log("Se a efectuado la query")
      console.log(data.duelRequestsPending[0].duel)
    },

    onError: (e) => {
      console.log(e)
    }
    
  });

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
      <TouchableOpacity onPress={() => navigation.navigate("DuelRequestsPage", {duelRequests: dataRequests})}>
        <View style={styles.card}>
          <Ionicons name="paper-plane" size={24} color="white" />
          <Text style={styles.cardText}>Solicitudes ({dataRequests.duelRequestsPending.length})</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateDuelRequestForm")}>
        <Text style={styles.buttonText}>Crear nuevo reto</Text>
      </TouchableOpacity>
<View >
      {dataDuels.activeDuels.length === 0 && (
        <Text style={styles.noDataText}>No tienes duelos activos</Text>
      )}
      {dataDuels.activeDuels.map(duel => (
        <TouchableOpacity key={duel.id} style={styles.duelCard} onPress={() => navigation.navigate("DuelInfo", {duelId: duel.id})}>
          <View style={{backgroundColor: "#232323", borderRadius: 20, padding: 10, alignItems: "center", justifyContent: "center", marginVertical: 10, width: "100%"}}>
          <Text style={{
            fontSize: 18,
            color: '#BDBDBD', // Gris más suave para los detalles
            textAlign: 'center',
          }}>{duel.challenger.username} vs {duel.challenged.username}</Text>
          <Text style={styles.duelName}>{duel.name}</Text>
          <Text style={styles.dateText}>{duel.points}</Text>
          <View style={{height: 2, width: "90%", borderRadius: 20, backgroundColor: "#353535"}}/>
          <View style={{backgroundColor: "#191919", borderRadius: 20, paddingVertical: 10, alignItems: "center", justifyContent: "center", marginTop: 20, width: "100%"}}>
          <Text style={styles.text}>{new Date(parseInt(duel.finishTime)).toLocaleString()}</Text>
          </View>
          </View>
        </TouchableOpacity>
      ))
}
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
    borderRadius: 15, // Bordes más redondeados para un aspecto más moderno
    marginBottom: 20,
    shadowColor: '#9C27B0', // Sombra lila para dar un toque único
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3, // Opacidad de la sombra para no saturar
    shadowRadius: 5, // Radio de la sombra para un efecto suave
    elevation: 8, // Elevación para Android
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'center', // Centra los elementos verticalmente para una distribución uniforme
  },
  duelName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E0E0E0', // Un gris claro para destacar el nombre del duelo
    marginBottom: 10, // Espacio antes de los detalles del duelo
    textAlign: 'center', // Alineación central para el nombre
  },
  text: {
    fontSize: 14,
    color: '#bebebe', // Gris más suave para los detalles
    textAlign: 'center', // Texto centrado para una distribución equilibrada
  },
  dateText: {
    fontSize: 14,
    fontWeight: '800', // Semi-bold para destacar la fecha
    color: '#FFF', // Blanco para contraste con el fondo oscuro
    marginTop: 10, // Espacio después de los detalles del duelo
    fontStyle: 'italic', // Cursiva para dar un toque distinto a la fecha
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
    fontSize: 38, // Ajustado para ser coherente
  },
  button: {
    backgroundColor: '#a565f2', // Un color que combine con el resto de la UI
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
  dateText: {
    fontSize: 34, // Tamaño más pequeño para las fechas
    fontStyle: 'italic', // Texto en cursiva
    color: 'white', // Color de texto aún más claro
    marginVertical: 3, // Margen inferior pequeño para separación
    fontWeight: "bold"
  },
});


export default DuelScreen;
