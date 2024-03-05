import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet,
    ScrollView,
    Modal,
    FlatList
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'



const CreateDuelHabitForm = ({ onCreateDuelHabit }) => {
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [habitDuration, setHabitDuration] = useState('');
  const [habitPoints, setHabitPoints] = useState(0)
  const [habitColor, setHabitColor] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [isFocused, setIsFocused] = useState(false)

  const pointsOptions = [10, 20, 30, 40, 50];
  const durations = ['15m', '30m', '45m', '1h', '1,5h'];

  // Lista de colores para seleccionar
  const colors = [
    '#ee6fc6',
    '#ee6f6f',
    '#6f76ee',
    '#6fee91',
    '#ebee6f'
  ];

  const addSubtask = () => {
    const newSubtask = { id: Date.now(), name: '', lastCompletedDate: '' }; // Estructura básica de un SubTask
    setSubtasks([...subtasks, newSubtask]);
  };

  const handlePointsChange = (points) => {

      setHabitPoints(points);

  };

  const handleSubtaskChange = (text, id) => {
    const updatedSubtasks = subtasks.map(subtask => {
      if (subtask.id === id) {
        return { ...subtask, name: text };
      }
      return subtask;
    });
    setSubtasks(updatedSubtasks);
  };

  const handleNameChange = (text) => setHabitName(text);
  const handleDurationChange = (duration) => setHabitDuration(duration);
  const handleColorChange = (color) => setHabitColor(color);

  const createHabit = () => {
    // Validación básica
    if (!habitName || !habitDescription || habitPoints <= 0 || !habitDuration || !habitColor || subtasks.length === 0) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    
    const duelHabit = {
      name: habitName,
      desc: habitDescription,
      duration: parseInt(habitDuration, 10),
      points: habitPoints,
      color: habitColor,
      lastCompletedDate: '', // Manejar según la lógica de tu app
      subTasks: subtasks.map(subtask => ({
        id: subtask.id,
        name: subtask.name,
        lastCompletedDate: '' // Manejar según la lógica de tu app
      })),
      challengerLastCompletedDate: '', // Manejar según la lógica de tu app
      challengedLastCompletedDate: '', // Manejar según la lógica de tu app
    };

    onCreateDuelHabit(duelHabit);
  };

  // Componente UI omitido para brevedad. Debe incluir TextInput para nombre, descripción, etc., y un botón para llamar a createDuelHabit

  return (
    <View style={{ flex: 1, backgroundColor: '#252525', paddingHorizontal: 10 }}>
    <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            <Text>Nuevo </Text>
            <Text style={styles.headerTitleAccent}>Hábito</Text>
          </Text>
        </View>

        <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            onChangeText={handleNameChange}
            value={habitName}
            placeholder="Nombre del hábito"
            placeholderTextColor="#999" // Color del placeholder
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
      />
        <TextInput
            style={styles.input}
            onChangeText={setHabitDescription}
            value={habitDescription}
            placeholder="Descripción del hábito"
            placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setIconPickerVisible(true)} style={styles.iconPickerOpener}>
          {selectedIcon ? (
            <Ionicons name={selectedIcon} size={40} color="white" />
          ) : (
            <Text style={styles.iconPickerOpenerText}>Elegir Icono</Text>
          )}
        </TouchableOpacity>

      <View style={styles.durationContainer}>
        <Text style={styles.label}>Duracion</Text>
        <View style={styles.durationRow}>
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationButton,
              habitDuration === duration ? styles.selected : null,
            ]}
            onPress={() => handleDurationChange(duration)}
          >
            <Text style={styles.durationText}>{duration}</Text>
          </TouchableOpacity>
        ))}
        </View>
      </View>

      <View style={styles.durationContainer}>
          <Text style={styles.label}>Puntos</Text>
          <View style={styles.durationRow}>
            {pointsOptions.map((points) => (
              <TouchableOpacity
                key={points}
                style={[
                  styles.durationButton,
                  habitPoints === points ? styles.selected : {},
                  
                ]}
                onPress={() => handlePointsChange(points)}

              >
                <Text style={[
                  styles.durationText,

                ]}>
                  {points}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      <View style={styles.colorContainer}>
        <Text style={styles.label}>Color?</Text>
        <View style={styles.durationRow}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  habitColor === color ? styles.selected : null,
                ]}
                onPress={() => handleColorChange(color)}
              />
            ))}
        </View>
      </View>

      <View style={{ marginVertical: 10 }}>
               <Text style={styles.addButtonText}>Añadir Subtareas</Text>
             {subtasks.map(subtask => (
               <View key={subtask.id} style={styles.subtaskContainer}>
                 <Text style={styles.subtaskNumber}>{subtask.id}</Text>
                 <TextInput
                   style={styles.subtaskInput}
                   value={subtask.name}
                   onChangeText={text => handleSubtaskChange(text, subtask.id)}
                   placeholder={`Subtarea ${subtask.id}`}
                   placeholderTextColor="#999"
                 />
               </View>
             ))}
             <TouchableOpacity onPress={addSubtask} style={styles.addSubtaskButton}>
               <Ionicons name="add" size={20} color="#FFF" />
             </TouchableOpacity>
        </View>

      <TouchableOpacity style={styles.createButton} onPress={createHabit}>
        <Text style={styles.createButtonText}>Create Habito</Text>
      </TouchableOpacity>
      <View style={{paddingVertical: 40}}/>
    </ScrollView>
    <Modal
      visible={isIconPickerVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={() => setIconPickerVisible(false)}
    >
      <View style={styles.modalContainer}>
        <FlatList
          data={Object.keys(Ionicons.glyphMap)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setSelectedIcon(item);
                setIconPickerVisible(false);
              }}
            >
              <Ionicons name={item} size={40} color="white" />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
        />
      </View>
    </Modal>

    </View>
  );
};

const styles = StyleSheet.create({

    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#252525', // Cambia el color de fondo si es necesario
    },
    inputContainer: {
        marginBottom: 20,
        backgroundColor: '#333', // Puedes ajustar el color según tu preferencia
        borderRadius: 10,
    },
    label: {
      fontSize: 20,
      color: 'white',
      fontWeight: '700', // 600 es menos grueso que 'bold' pero más que 'normal'
      padding: 11, // Ajusta el padding para posicionar la etiqueta
    },
    input: {
      backgroundColor: '#333', // Un color oscuro para el fondo del input
      color: 'white', // Color del texto
      fontSize: 16,
      paddingHorizontal: 20, // Espaciado interno horizontal
      paddingVertical: 15, // Espaciado interno vertical
      borderRadius: 25, // Bordes redondeados
      marginTop: 10, // Espacio por encima del input
      marginBottom: 20, // Espacio debajo del input
      shadowColor: '#000', // Sombra
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4, // Elevación para Android
    },  
    inputFocused: {
      borderColor: '#a565f2', // Un borde lila cuando el input esté enfocado
      borderWidth: 2, // Grosor del borde
    },   
    durationContainer: {
      marginVertical: 20,
      justifyContent: 'space-between',
    },
    durationButton: {
        backgroundColor: '#555',
        padding: 10,
        borderRadius: 20, // Aumenta el borderRadius para hacerlo más redondeado
        marginHorizontal: 5, // Añade un margen para separar los botones
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    durationText: {
      color: 'white',
      fontSize: 16,
    },
    colorContainer: {
      marginVertical : 20,
      justifyContent: 'space-between',
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20, // Esto ya es completamente redondeado
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5, // Esto da espacio entre los botones de color
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
    iconContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    iconButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#555', // Fondo de los botones de íconos
    },
    selected: {
      borderColor: 'white',
      borderWidth: 2,
    },
    createButton: {
      backgroundColor: '#a565f2',
      paddingVertical: 20,
      paddingHorizontal: 30,
      borderRadius: 25, // Más redondeado que los botones de color y duración
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginTop: 20, // Espacio antes del botón
    },
    createButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    durationRow: {
      flexDirection: 'row',
    },
    headerContainer: {
      backgroundColor: '#191919', // O el color de fondo de tu pantalla
      borderRadius: 20, // Para bordes redondeados
      padding: 20,
      shadowColor: '#000', // Estas propiedades son para añadir sombra y dar el efecto de flotación
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10, // Para Android
      margin: 40,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: "white"
    },
    headerTitleAccent: {
      color: '#a565f2', // Color lila para la segunda palabra
    },
    addButton: {
        backgroundColor: '#a565f2', // color lila
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
      },
      addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: "center",
        marginVertical: 10
      },
      subtaskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      subtaskNumber: {
        color: '#a565f2', // color lila
        fontSize: 16,
        marginRight: 10,
      },
      subtaskInput: {
        flex: 1,
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
      },
      addSubtaskButton: {
        backgroundColor: '#353535', // color lila
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919', // Fondo semitransparente
        paddingVertical: 50
      },
      iconPickerOpener: {
        padding: 10,
        backgroundColor: '#333333',
        borderRadius: 40,
        alignSelf: 'center',
        flexDirection: 'row', // Para alinear el texto y el ícono horizontalmente
        alignItems: 'center', // Para alinear el texto y el ícono verticalmente
        justifyContent: 'center', // Para centrar el contenido
        width: "100%"
      },
      iconPickerOpenerText: {
        color: 'white',
      },
      icon: {
        padding: 10,
        margin: 10,
        // Añade más estilos si es necesario
      },
      disabled: {
        backgroundColor: '#444', // Un color diferente para mostrar que está deshabilitado
        // Puedes ajustar otros estilos para hacer que parezca deshabilitado, como la opacidad
      },
      disabledText: {
        color: '#888', // Texto más claro para indicar que está deshabilitado
      },
  });

// Estilos omitidos para brevedad

export default CreateDuelHabitForm;
