
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de importar Ionicons desde el paquete adecuado
import { ACCEPT_DUEL_REQUEST } from './duelQuerys';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DuelRequestsPage = ({ navigation ,route }) => {

  const {duelRequests} = route.params

  const [acceptDuelRequest] = useMutation(ACCEPT_DUEL_REQUEST, {
    onCompleted: async (data) => {
      console.log(data);
      try {
        // Obtener el objeto userProfile almacenado en AsyncStorage
        const userProfileString = await AsyncStorage.getItem('userProfile')
        let userProfile = userProfileString ? JSON.parse(userProfileString) : {}
        
        userProfile.activeDuel = data.acceptDuelRequest.id;
        
  
        // Guardar el userProfile actualizado en AsyncStorage
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      } catch (error) {
        console.error('Error al actualizar el userProfile en AsyncStorage:', error);
      }
    },
  });
  


  const handleAcceptDuelRequest = (requestId) => {
    console.log("Esta es la requestId que estas enviando: ", requestId)
    acceptDuelRequest({
      variables: {
        requestId: requestId
      }
    })


      navigation.goBack()
  };
  
  const renderDuelHabitCard = (habit) => {

    return (
      <View style={styles.habitCard}>
        <Ionicons name={habit.icon} size={34} color={habit.color} />
        <Text style={styles.habitCardText}>{habit.name} - {habit.duration} min</Text>
      </View>
    );
  };
  
    const renderDuelRequestItem = ({ item }) => {
  
      return (
        <TouchableOpacity onPress={() => console.log('Clicked duel request')}>
          <View style={styles.duelCard}>
            <View style={{backgroundColor: "#252525", padding: 10, borderRadius: 20}}>
            <Text style={styles.duelIdText}>{item.duel.name}</Text>
            </View>
            <Text style={styles.duelCardText}>{item.from.name}</Text>
            {item.duel.habits.map(habit => renderDuelHabitCard(habit))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity  style={[styles.button, styles.rejectButton]}>
                <Text style={styles.buttonText}>Rechazar</Text>
              </TouchableOpacity>
              <TouchableOpacity  
              style={[styles.button, styles.acceptButton]}
              onPress={() => handleAcceptDuelRequest(item.id)}
              >
                <Text style={styles.buttonText}>Acceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    
  
    return (
      <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>Duel Requests</Text>
        <FlatList
          data={duelRequests.duelRequestsPending}
          renderItem={renderDuelRequestItem}
          keyExtractor={(item) => item.id}
        />
        
        </SafeAreaView>
      </View>
      

    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212', // Color de fondo oscuro
      padding: 10,
      paddingTop: 60
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white', // Color de texto blanco
      marginBottom: 10,
    },
    duelCard: {
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: '#353535',
    },
    duelIdText: {
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 5,
      fontSize: 20,
      alignSelf: "center"
    },
    duelCardText: {
      color: 'white',
      marginBottom: 5,
      fontSize: 20
    },
    habitCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      backgroundColor: "#252525",
      padding: 10,
      borderRadius: 15
    },
    habitCardText: {
      marginLeft: 10,
      color: 'white',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    acceptButton: {
      backgroundColor: 'green',
      marginRight: 5,
    },
    rejectButton: {
      backgroundColor: 'red',
      marginLeft: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
  export default DuelRequestsPage;