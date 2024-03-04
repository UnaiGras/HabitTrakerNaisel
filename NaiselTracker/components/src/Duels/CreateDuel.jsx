import React, { useState, useRef, useMemo } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CreateDuelHabitForm from './createDuelHabit';
import { SEARCH_USER } from './duelQuerys';

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

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const [generateAndSendDuelRequest] = useMutation(GENERATE_AND_SEND_DUEL_REQUEST);
  const { data, loading, error } = useQuery(SEARCH_USER, {
    variables: { searchString },
    skip: !searchString || searchString.length < 3, // Para evitar búsquedas con cadenas muy cortas
  });

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchString(''); // Limpiar la barra de búsqueda
  };


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

  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <BottomSheetModalProvider>
    <View style={styles.container}>
        { selectedUser &&
        <View style={styles.selectedUserCard}>
            <Text>{selectedUser.name}</Text>
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
            <TouchableOpacity onPress={() => handleSelectUser(item)}>
              <Text>{item.name}</Text>
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
      <Button title="Add New Habit" onPress={() => setModalVisible(true)} />
      <FlatList
        data={habits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (Days)"
        keyboardType="numeric"
        value={duelInput.durationDays}
        onChangeText={(text) => handleInputChange('durationDays', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Points"
        keyboardType="numeric"
        value={duelInput.points}
        onChangeText={(text) => handleInputChange('points', text)}
      />
      
      <Button title="Send Duel Request" onPress={handleSubmit} />
    
    {modalVisible &&
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1} // Estado inicial como oculto
        snapPoints={snapPoints}
        style={{ backgroundColor: "#202020" }}
        backgroundStyle={{ backgroundColor: "#202020" }}
      >
        <CreateDuelHabitForm onCreateDuelHabit={onCreateDuelHabit} />
      </BottomSheetModal>
      }


    </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 18,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  selectedUserCard: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default CreateDuelRequestForm;
