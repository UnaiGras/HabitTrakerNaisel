import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const recommendHabits = (totalPoints) => {
  if (totalPoints <= 4) {
    return beginnerHabits;
  } else if (totalPoints <= 19) {
    return intermediateHabits;
  } else {
    return advancedHabits;
  }
};


const OnboardingScreen = ({ navigation }) => {
  // Estado para controlar el paso actual del onboarding
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentSelectionPoints, setCurrentSelectionPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0)

  
  // Función para ir al siguiente paso
  const goToNextStep = () => {
    setTotalPoints(prevPoints => prevPoints + currentSelectionPoints); // Sumamos los puntos al total
    setCurrentStep(currentStep + 1); // Avanzamos al siguiente paso
    setCurrentSelectionPoints(0); // Resetear los puntos de la selección actual por si vuelve a la pregunta
  };

  // Función para finalizar el onboarding y crear el perfil de usuario
  const finishOnboarding = async () => {

    // Determina los hábitos recomendados basados en los puntos totales
    const recommendedHabits = recommendHabits(totalPoints);
  
    // Crea el objeto userProfile
    const userProfile = {
      points: 0,
      level: 0, // Asume que tienes una función para calcular el nivel
      activeHabits: recommendedHabits,
      premium: false,
      activeChallenges: [],
      milestones: {
        currentMilestone: 0,
        nextMilestone: 1
    }
    };
  
    // Guarda el userProfile en AsyncStorage
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      console.log('Perfil del usuario creado y guardado con éxito.', userProfile);
      // Navega a la pantalla principal
      navigation.navigate('MainScreen');
    } catch (error) {
      console.error('Error al guardar el perfil del usuario', error);
    }
  };

  const handleSelectOption = (option, points) => {
    setSelectedOption(option);
    setCurrentSelectionPoints(points); // Guardamos los puntos de la opción seleccionada
  };

  useEffect(() => {
    console.log(totalPoints, "<<--totalpoints");
  }, [totalPoints]);

  // Renderiza diferente contenido dependiendo del paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
            <View style={styles.container}>
            <Image
              source={require('../../../assets/atomo.png')}
              style={styles.atomoImage}
              resizeMode="contain"
            />
            <Text style={styles.text}>
            El<Text style={styles.highlight}> mejor </Text>momento para empezar es<Text style={styles.highlight}> ahora</Text>
          </Text>
            <Text style={styles.description}>
              El mejor momento para plantar un arbol fue hace 20 años, el segundo mejor es ahora. ~Young Beef
            </Text>
            <Text style={[styles.description, {marginTop: 20, fontWeight: "400"}]}>
              Estas a un paso de cambiar tu vida
            </Text>
            <TouchableOpacity style={styles.lilaButton} onPress={() => goToNextStep()}>
              <Text style={styles.buttonText}>Vamos Allá</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
            <View style={styles.container}>
            <Text style={styles.text}>Cuanta energia tienes durante el dia</Text>
            <View style={styles.cardContainer}>
              {/* Tarjeta 1 */}
              <TouchableOpacity
                  style={[styles.card, selectedOption === 1 && styles.cardSelected]}
                  onPress={() => handleSelectOption(1, 10)}
                >
                  <Text style={styles.cardTitle}>Me siento muy activo</Text>
                  <Image
                    source={require('../../../assets/100bat.png')} // Reemplaza con el path correcto de tu imagen
                    style={styles.cardImage}
                  />
                </TouchableOpacity>
      
              {/* Tarjeta 2 */}
              <TouchableOpacity
                  style={[styles.card, selectedOption === 2 && styles.cardSelected]}
                  onPress={() => handleSelectOption(2, 5)}
                >
                  <Text style={styles.cardTitle}>No muy motivado</Text>
                  <Image
                    source={require('../../../assets/50bat.png')} // Reemplaza con el path correcto de tu imagen
                    style={styles.cardImage}
                  />
                </TouchableOpacity>
      
              {/* Tarjeta 3 */}
              <TouchableOpacity
                  style={[styles.card, selectedOption === 3 && styles.cardSelected]}
                  onPress={() => handleSelectOption(3, 2)}
                >
                  <Text style={styles.cardTitle}>Poco energico</Text>
                  <Image
                    source={require('../../../assets/0bat.png')} // Reemplaza con el path correcto de tu imagen
                    style={styles.cardImage}
                  />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.lilaButton} onPress={() => goToNextStep()}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
            <View style={styles.container}>
            <Text style={styles.text}>Cual es tu objetivo principal con <Text style={styles.highlight}>Naisel</Text></Text>
            <View style={styles.cardContainer}>
              {/* Tarjeta 1 */}
              <TouchableOpacity
                  style={[styles.card, selectedOption === 1 && styles.cardSelected]}
                  onPress={() => handleSelectOption(1, 10)}
                >
                  <Text style={styles.cardTitle}>Estoy preparado para crear buenos habitos</Text>
                  <Image
                    source={require('../../../assets/monje.png')} // Reemplaza con el path correcto de tu imagen
                    style={styles.cardImage}
                  />
                </TouchableOpacity>
      
              {/* Tarjeta 2 */}
              <TouchableOpacity
                  style={[styles.card, selectedOption === 2 && styles.cardSelected]}
                  onPress={() => handleSelectOption(2, 5)}
                >
                  <Text style={styles.cardTitle}>Quiero ser un poco mas organizado y productivo</Text>
                  <Image
                    source={require('../../../assets/avance.png')} // Reemplaza con el path correcto de tu imagen
                    style={styles.cardImage}
                  />
                </TouchableOpacity>
      
              {/* Tarjeta 3 */}
              <TouchableOpacity
                  style={[styles.card, selectedOption === 3 && styles.cardSelected]}
                  onPress={() => handleSelectOption(3, 2)}
                >
                  <Text style={styles.cardTitle}>Quiero un cambio en general</Text>
                  <Image
                    source={require('../../../assets/ajuste.png')} // Reemplaza con el path correcto de tu imagen
                    style={styles.cardImage}
                  />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.lilaButton} onPress={() => goToNextStep()}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        );
      case 4:
        return (
            <View style={styles.lastContainer}>
            <Text style={styles.text}>Hemos <Text style={styles.highlight}>acabado</Text> con el proceso <Text style={styles.highlight}>inicial</Text></Text>
            <TouchableOpacity style={styles.finishButton} onPress={() => finishOnboarding()}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  lastContainer: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: "center"
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    top: 100, 
    textAlign: 'center',
    maxWidth: "90%"
  },
  atomoImage: {
    position: "absolute",
    width: 350, // Asumiendo que quieres que la imagen ocupe todo el ancho disponible
    height: 350, // Puedes ajustar esto según tu necesidad
    bottom: 120,
    left: -80
},
  lilaButton: {
    position: "absolute",
    backgroundColor: '#8e44ad', // Un color lila como ejemplo
    width: "80%",
    padding: 20,
    borderRadius: 30,
    bottom: 150,
    alignItems: "center"
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19
  },
  signInText: {
    color: '#ffffff',
    marginTop: 15,
  },
  signInTextBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  description: {
    color: 'white',
    fontSize: 18, // Tamaño más grande para la descripción
    fontWeight: '600',
    top: 150,
    textAlign: "center",
    marginHorizontal: 20
    },
    highlight: {
        color: '#8e44ad', // Color lila
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // Alinea los elementos al inicio de la tarjeta
        marginTop: 130, // Ajusta el espacio desde la parte superior
      },
      card: {
        backgroundColor: '#252525', // Un color de fondo para las tarjetas
        borderRadius: 10,
        padding: 15,
        width: 350, // Anchura fija para las tarjetas
        height: "15%", // Altura fija para las tarjetas
        flexDirection: 'row', // Alinea el contenido de la tarjeta horizontalmente
        alignItems: 'center', // Centra el contenido de la tarjeta verticalmente
        marginBottom: 20, // Para separar las tarjetas verticalmente
        justifyContent: 'space-between', // Espacio entre el texto y la imagen
      },
      cardTitle: {
        color: 'white',
        fontSize: 14, // Tamaño de texto más pequeño
        fontWeight: 'bold',
        maxWidth: "70%"
      },
      cardImage: {
        width: 80, // Ancho de la imagen
        height: 80, // Altura de la imagen
        borderRadius: 25, // Si quieres que las imágenes sean redondas
      },
      cardSelected: {
        borderColor: '#8e44ad', // Color lila para resaltar la selección
        borderWidth: 2,
      },
      finishButton:{
        position: "absolute",
    backgroundColor: '#8e44ad', // Un color lila como ejemplo
    width: "80%",
    padding: 20,
    borderRadius: 30,
    bottom: 150,
    alignItems: "center"
      }
})

const beginnerHabits = [
  {
    id: 1,
    name: "Escribir pensamientos",
    icon: "pencil",
    desc: "Dedicar unos minutos a escribir lo que sientes o piensas para liberar la mente.",
    duration: "10m",
    points: 10,
    color: "#d76fee",
    subTasks: [
      { id: 1, name: "Escribir tres gratitudes" },
      { id: 2, name: "Anotar un logro del día" },
    ]
  },
  {
    id: 2,
    name: "Estiramientos matinales",
    icon: "accessibility",
    desc: "Realizar estiramientos suaves para comenzar el día con energía.",
    duration: "10m",
    points: 20,
    color: "#f3735f",
    subTasks: [
      { id: 1, name: "Estiramiento de brazos" },
      { id: 2, name: "Estiramiento de piernas" },
    ]
  },
  {
    id: 3,
    name: "Levantarse pronto",
    icon: "bed",
    desc: "Levantarse al menos 1h antes de hacer cualquier cosa para aclarar la mente",
    duration: "60m", // Este valor representa el acto de beber agua en un momento dado, repetido a lo largo del día.
    points: 30,
    color: "#65cce8",
    subTasks: []
  }
];


const intermediateHabits = [
  {
    id: 1,
    name: "Planificación semanal",
    icon: "calendar",
    desc: "Dedicar tiempo cada semana para organizar actividades y objetivos.",
    duration: "10m",
    points: 10,
    color: "#d76fee",
    subTasks: [
      { id: 1, name: "Definir metas de la semana" },
      { id: 2, name: "Preparar lista de tareas" },
    ]
  },
  {
    id: 2,
    name: "Ejercicio",
    icon: "barbell",
    desc: "Hacer ejercicio por la mañana para energizar el cuerpo y calmar la mente.",
    duration: "20m",
    points: 20,
    color: "#f3735f",
    subTasks: [
      { id: 1, name: "Encontrar secuencia de yoga" },
      { id: 2, name: "Crear espacio tranquilo" },
    ]
  },
  {
    id: 3,
    name: "Lectura consciente",
    icon: "book",
    desc: "Leer con propósito para el desarrollo personal o profesional.",
    duration: "30m",
    points: 30,
    color: "#65cce8",
    subTasks: [
      { id: 1, name: "Elegir libros de crecimiento personal" },
      { id: 2, name: "Tomar notas clave" },
    ]
  }
];


const advancedHabits = [
  {
    id: 1,
    name: "Rutina de HIIT",
    icon: "bicycle",
    desc: "Realizar una rutina de entrenamiento de alta intensidad para fortalecer el cuerpo.",
    duration: "30m",
    points: 20,
    color: "#d76fee",
    subTasks: [
      { id: 1, name: "Calentamiento dinámico" },
      { id: 2, name: "Ejercicios de alta intensidad" },
    ]
    },
    {
      id: 2,
      name: "Planificación de objetivos a largo plazo",
      icon: "bookmark",
      desc: "Establecer y revisar objetivos a largo plazo para el desarrollo personal y profesional.",
      duration: "10m",
      points: 10,
      color: "#f3735f",
      subTasks: [
      { id: 1, name: "Definir objetivos SMART" },
      { id: 2, name: "Crear un plan de acción" },
      ]
    },
    {
      id: 3,
      name: "Desafío de habilidades nuevas",
      icon: "bulb",
      desc: "Adquirir y practicar una nueva habilidad o hobby que estimule el crecimiento personal o profesional.",
      duration: "60m",
      points: 30,
      color: "#65cce8",
      subTasks: [
        { id: 1, name: "Investigar y seleccionar una nueva habilidad para aprender" },
        { id: 2, name: "Dedicar tiempo semanalmente para practicar y mejorar" },
      ]
    }
    
    ];

export default OnboardingScreen;
