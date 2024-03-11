import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CreateDuelHabitForm from './createDuelHabit';
import { SEARCH_USER } from './duelQuerys';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


const GENERATE_AND_SEND_DUEL_REQUEST = gql`
  mutation GenerateAndSendDuelRequest($input: GenerateAndSendDuelRequestInput!) {
    generateAndSendDuelRequest(input: $input) {
      id
      status
      duel {
        id
      }
      from {
        id
      }
      to {
        id
      }
    }
  }
`;

const CreateDuelRequestForm = ({ toUserId, habitos }) => {
  const [duelInput, setDuelInput] = useState({
    name: '',
    durationDays: '1',
    points: '0',
  });
  const [habits, setHabits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [duelPoints, setDuelPoints] = useState(0)

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const [generateAndSendDuelRequest] = useMutation(GENERATE_AND_SEND_DUEL_REQUEST);
  const { data, loading, error } = useQuery(SEARCH_USER, {
    variables: { searchString },
    skip: !searchString || searchString.length < 3, // Para evitar búsquedas con cadenas muy cortas
  });

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchString(''); // Limpiar la barra de búsqueda
  };

  const handlePresentModalPress = useCallback(() => {
    console.log("abre")
    setModalVisible(true)
    bottomSheetRef.current?.present();
  }, []);


  const handleInputChange = (name, value) => {
    setDuelInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, durationDays, points } = duelInput;
    if (!name || !durationDays || !points) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    try {
      const { data } = await generateAndSendDuelRequest({
        variables: {
          input: {
            duelHabitsInput: habitos, // Asegúrate de que 'habitos' tenga el formato correcto
            duelInput: {
              ...duelInput,
              durationDays: parseInt(durationDays, 10),
              points: parseInt(points, 10),
            },
            toUserId,
          },
        },
      });
      Alert.alert('Success', 'Duel Request sent successfully!');
      console.log(data);
    } catch (error) {
      console.error('Error sending Duel Request', error);
      Alert.alert('Error', 'Failed to send Duel Request.');
    }
  };


  const onCreateDuelHabit = (duelHabit) => {
    setHabits((currentHabits) => [...currentHabits, duelHabit]);
    setModalVisible(false); // Cierra el modal después de añadir el hábito
  };

  const calculatePoints = () => {
    const basePointsPerDay = 2; // Define cuántos puntos vale cada día
    const totalDays = selectedDuration; // La duración seleccionada es el total de días
    const numberOfHabits = habits.length; // El número de hábitos
    
    // Calcula los puntos totales
    const totalPoints = basePointsPerDay * totalDays * numberOfHabits;
    
    return totalPoints;
  }

  useEffect(() => {
    setDuelPoints(calculatePoints())
  }, [selectedDuration, habits])

  

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Asegúrate de tener un nombre de icono válido para Ionicons aquí. */}
      {console.log(item)}
      <Ionicons style={styles.icon} name={item.icon} size={38} color={item.color} />
      <Text style={styles.title}>
        {item.name} {/* Cambié de item.title a item.name basándome en tu log */}
      </Text>
    </View>
  );
  

  return (
    <BottomSheetModalProvider>
    <View style={styles.container}>
        { selectedUser &&
        <View style={styles.selectedUserCard}>
            <Text style={{color: "white"}}>{selectedUser.name}</Text>
            <TouchableOpacity onPress={() => setSelectedUser(null)}>
              <Text>Change User</Text>
            </TouchableOpacity>
      </View>
        }
{ selectedUser === null &&
    <View>
    <TextInput
        placeholder="Buscar usuarios..."
        value={searchString}
        onChangeText={setSearchString}
        style={styles.searchInput}
      />
      {loading && <Text>Cargando...</Text>}
      {error && <Text>Error en la búsqueda</Text>}
      {!loading && !error && data && (
        <FlatList
          data={data.searchUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.userCard}>
          <Text style={styles.userText}>
            {item.name}</Text>
          </TouchableOpacity>
          )}
        />
      )}
      </View>
      }
      <TextInput
        style={styles.input}
        placeholder="Duel Name"
        value={duelInput.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
<View style={styles.listContainer}> 
      <TouchableOpacity style={styles.button} onPress={handlePresentModalPress}>
        <Text style={styles.buttonText}>Add New Habit</Text>
      </TouchableOpacity>
      <FlatList
        data={habits}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
</View>
      <View style={styles.durationContainer}>
        {[3, 7, 14, 28].map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationButton,
              selectedDuration === duration && styles.selectedDuration,
            ]}
            onPress={() => setSelectedDuration(duration)}
          >
            <Text style={styles.durationButtonText}>{`${duration} días`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.pointsText}>Puntos del reto: {calculatePoints()}</Text>

      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Duel Request</Text>
      </TouchableOpacity>

    {modalVisible &&
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1} // Estado inicial como oculto
        snapPoints={snapPoints}
        style={{ backgroundColor: "#202020" }}
        backgroundStyle={{ backgroundColor: "#202020" }}
        
      >
      <ScrollView>
        <CreateDuelHabitForm onCreateDuelHabit={onCreateDuelHabit} />
        </ScrollView>
      </BottomSheetModal>
      }


    </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515', // Fondo oscuro para el contenedor principal
    padding: 20, // Espaciado interior
    paddingTop: 80
  },
  pointsText: {
    color: "white",
    fontSize: 30,
    fontWeight: "800"
  },
  selectedUserCard: {
    backgroundColor: '#282828', // Fondo de tarjeta más claro que el contenedor
    borderRadius: 15, // Bordes redondeados
    padding: 15, // Espaciado interior
    marginBottom: 20, // Margen inferior
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Elevación para Android
    alignItems: 'center', // Alineación de los elementos de la tarjeta
  },
  searchInput: {
    backgroundColor: '#333333', // Color de fondo para el input
    color: 'white', // Color del texto
    paddingHorizontal: 10, // Espaciado horizontal interior
    paddingVertical: 8, // Espaciado vertical interior
    borderRadius: 10, // Bordes redondeados
    marginBottom: 10, // Margen inferior
  },
  input: {
    backgroundColor: '#333333', // Fondo del input
    color: 'white',  // Color del texto
    paddingHorizontal: 20, // Más espacio horizontal
    paddingVertical: 15, // Más espacio vertical para hacer el input más grande
    fontSize: 18, // Hacer el texto más grande
    borderRadius: 10,
    marginBottom: 20, // Aumentar el espacio entre inputs
  },
  listContainer: {
    backgroundColor: '#242424', // Un poco más claro que el contenedor principal
    padding: 10,
    borderRadius: 10, // Bordes redondeados para la FlatList
    marginBottom: 20, // Asegurar que haya espacio debajo de la lista
  },
  button: {
    backgroundColor: '#8A2BE2', // Lila
    padding: 10,
    borderRadius: 20, // Bordes redondeados
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5, // Margen vertical para separar los botones
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio de la sombra
    elevation: 5, // Elevación para Android
  },
  buttonText: {
    color: '#FFF', // Texto en blanco
    fontSize: 16, // Tamaño del texto
    fontWeight: 'bold', // Negrita
  },
  loadingText: {
    color: 'grey', // Color del texto para "Cargando..."
    fontSize: 16, // Tamaño del texto
    textAlign: 'center', // Centrar texto
    marginBottom: 20, // Espacio debajo del texto
  },
  errorText: {
    color: 'red', // Color del texto para errores
    fontSize: 16, // Tamaño del texto
    textAlign: 'center', // Centrar texto
    marginBottom: 20, // Espacio debajo del texto
  },
  // Estilización para BottomSheetModal si es necesario
  bottomSheet: {
    backgroundColor: "#202020", // Fondo oscuro para el modal
    borderRadius: 15, // Bordes redondeados para el modal
    padding: 20, // Espaciado interior para el contenido del modal
  },
  userCard: {
    backgroundColor: '#282828', // Un fondo claro en comparación con el fondo de la app
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Espaciado interior para contenido
    marginBottom: 10, // Espacio entre tarjetas
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Elevación para Android
    flexDirection: 'row', // En caso de que quieras añadir iconos o más texto
    alignItems: 'center', // Centrar elementos en la tarjeta
    padding: 20, // Más espacio interior
    fontSize: 20,
  },
  userText: {
    color: 'white', // Texto claro para contraste
    fontSize: 16, // Tamaño del texto
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  durationButton: {
    backgroundColor: '#333333', // Fondo oscuro para el botón
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10, // Bordes redondeados
    borderWidth: 2,
    borderColor: 'transparent', // Borde transparente por defecto
  },
  selectedDuration: {
    borderColor: '#8e44ad', // Borde lila para el botón seleccionado
  },
  durationButtonText: {
    color: 'white', // Texto claro para contraste
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: '#353535', // Fondo original de la tarjeta
    borderRightWidth: 4,
    borderRightColor: 'transparent', // Borde derecho por defecto
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowColor: "#a565f2",
    elevation: 4,
  },
  title: {
    color: 'white',
    fontSize:18,
    fontWeight: "700",
    maxWidth: "90%"
  },
  icon: {
    marginRight: 10,
  },
  infoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    // Estilos adicionales si son necesarios
  },
});

export default CreateDuelRequestForm;
