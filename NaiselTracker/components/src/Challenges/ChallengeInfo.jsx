import React, { useRef, useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChallengeDetails = ({ navigation, route }) => {
    const { challenge } = route.params; // Asume que challenge se pasa a través de navigation params
    console.log(challenge)
    const [selectedHabit, setSelectedHabit] = useState(null);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const addUserChallenge = async () => {

        
        try {
          // Recuperar userProfile de AsyncStorage
          const userProfileJson = await AsyncStorage.getItem('userProfile');
          let userProfile = userProfileJson != null ? JSON.parse(userProfileJson) : null;
          
          if (userProfile) {
            // Añadir el challengeId a activeChallenges si no existe ya
            if (!userProfile.activeChallenges.includes(challenge)) {
              userProfile.activeChallenges.push(challenge);
              
              // Guardar el userProfile actualizado en AsyncStorage
              await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
              
              console.log('Challenge añadido con éxito.');

              navigation.goBack(2)
            } else {
              console.log('El challenge ya está activo.');
            }
          } else {
            console.log('userProfile no encontrado.');
          }
        } catch (error) {
          console.error('Error al añadir el challenge:', error);
        }
      };
  
    // Presentar modal de detalles del hábito
    useEffect(() => {
      if (selectedHabit) {
        bottomSheetModalRef.current?.present();
      }
    }, [selectedHabit]);
  
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
      <View style={styles.container}>
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.desc}</Text>
        <FlatList
          data={challenge.habits}
          renderItem={({ item }) => (
            <HabitCard
              habit={item}
              onPress={() => setSelectedHabit(item)}
            />
          )}
          keyExtractor={(item) => `habit-${item.id}`}
          ListFooterComponent={<View style={{ height: 600 }} />}
        />
        <TouchableOpacity style={styles.finishButton} onPress={() => addUserChallenge(challenge)}>
              <Text style={styles.buttonText}>Aceptar Reto</Text>
            </TouchableOpacity>
        {selectedHabit && renderHabitDetails()}
      </View>
      </BottomSheetModalProvider>
    );
  };


const HabitCard = ({ habit, onPress }) => {
    const { name, icon, color, duration } = habit;
    return (
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Ionicons name={icon} size={38} color={color} style={styles.icon} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#202020",
        padding: 10,
        paddingTop: 80
    },
    title: {
        color: "white",
        fontSize: 22,
        fontStyle: "italic",
        fontWeight: "800",
        textAlign: "center"
    },
    description: {
        color: "white",
        fontSize: 17,
        textAlign: "center",
        paddingVertical: 20
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
      title: {
        color: 'white',
        fontSize: 18,
        fontWeight: "700",
        maxWidth: "60%"
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
      buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19
      },
      finishButton:{
        position: "absolute",
        backgroundColor: '#8e44ad', // Un color lila como ejemplo
        width: "80%",
        padding: 20,
        borderRadius: 30,
        bottom: 20,
        alignItems: "center"
      }
});

export default ChallengeDetails;