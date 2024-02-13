
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppBar from '../General/AppBar';

const challenges = [{
    id: 28398,
    title: "Una Vida Saludable con 20min Al Dia",
    desc: "Los cientificos han demostrado que con solo 30 min al dia se pueden conseguir muy buenos resultados en cuanto a la mejora de el estado de animo y estado fisico",
    image: require("../../../assets/excursionismo.png"),
    pts: 550,
    days: 31,
    habits: 
    [
      {
        id: 60679,
        name: "Planificación de comidas saludables",
        icon: "nutrition",
        desc: "Dedicar tiempo a planificar las comidas de la semana para asegurar una dieta equilibrada.",
        duration: "30m",
        points: 25,
        color: "#4caf50",
        subTasks: [
          { id: 1, name: "Seleccionar recetas nutritivas" },
          { id: 2, name: "Preparar lista de compras saludables" }
        ]
      },
      {
        id: 53410,
        name: "Hidratación constante",
        icon: "water",
        desc: "Beber agua regularmente a lo largo del día para mantenerse hidratado.",
        duration: "10m",
        points: 15,
        color: "#2196f3",
        subTasks: [
          { id: 1, name: "Beber un vaso de agua cada hora" },
          { id: 2, name: "Llevar una botella de agua reusable" }
        ]
      },
      {
        id: 44192,
        name: "Actividad física diaria",
        icon: "fitness",
        desc: "Realizar al menos 30 minutos de actividad física cada día para mejorar la salud y el bienestar.",
        duration: "30m",
        points: 30,
        color: "#ffeb3b",
        subTasks: [
          { id: 1, name: "Caminata rápida o correr" },
          { id: 2, name: "Sesión de ejercicios en casa" }
        ]
      },
      {
        id: 63386,
        name: "Snacks saludables",
        icon: "cafe",
        desc: "Preparar y consumir snacks saludables entre comidas para evitar el hambre excesiva.",
        duration: "15m",
        points: 20,
        color: "#ff9800",
        subTasks: [
          { id: 1, name: "Cortar vegetales para snacks" },
          { id: 2, name: "Preparar mezclas de frutos secos" }
        ]
      },
      {
        id: 58518,
        name: "Meditación post-ejercicio",
        icon: "leaf",
        desc: "Dedicar tiempo después del ejercicio para una breve sesión de meditación, ayudando a la recuperación y relajación.",
        duration: "10m",
        points: 25,
        color: "#9c27b0",
        subTasks: [
          { id: 1, name: "Meditación guiada" },
          { id: 2, name: "Respiración profunda" }
        ]
      }
    ]    
  }, {
    id:  29300,
    title: "Habitos Atomicos",
    desc: "Metodo probado: con solo 21 dias puedes cambiar tu vida segun Papa Noel",
    image: require("../../../assets/atomo.png"),
    pts: 800,
    days: 21,
    habits: [
      {
        id: 16891,
        name: "Tiempo de reflexión personal",
        icon: "time",
        desc: "Dedicar un momento del día a la reflexión personal para aumentar el autoconocimiento.",
        duration: "20m",
        points: 20,
        color: "#03a9f4",
        subTasks: [
          { id: 1, name: "Reflexionar sobre metas personales" },
          { id: 2, name: "Evaluar emociones del día" }
        ]
      },
      {
        id: 64377,
        name: "Diario de emociones",
        icon: "book",
        desc: "Escribir diariamente sobre tus emociones para entender mejor tus reacciones y sentimientos.",
        duration: "15m",
        points: 25,
        color: "#e91e63",
        subTasks: [
          { id: 1, name: "Identificar emociones del día" },
          { id: 2, name: "Escribir sobre eventos que provocaron esas emociones" }
        ]
      },
      {
        id: 60527,
        name: "Práctica de gratitud",
        icon: "happy",
        desc: "Enumerar diariamente cosas por las que estás agradecido para fomentar una actitud positiva.",
        duration: "10m",
        points: 15,
        color: "#ffeb3b",
        subTasks: [
          { id: 1, name: "Listar tres cosas nuevas por las que estás agradecido cada día" }
        ]
      },
      {
        id: 83538,
        name: "Desconexión digital",
        icon: "phone-portrait-off",
        desc: "Reservar un tiempo sin dispositivos electrónicos para reducir el estrés y mejorar la calidad del sueño.",
        duration: "30m",
        points: 30,
        color: "#9c27b0",
        subTasks: [
          { id: 1, name: "Apagar dispositivos electrónicos una hora antes de dormir" }
        ]
      },
      {
        id: 98766,
        name: "Ejercicios de respiración",
        icon: "leaf",
        desc: "Realizar ejercicios de respiración profunda para reducir la ansiedad y mejorar la concentración.",
        duration: "10m",
        points: 20,
        color: "#4caf50",
        subTasks: [
          { id: 1, name: "Practicar la respiración diafragmática" },
          { id: 2, name: "Utilizar aplicaciones de meditación para guiar la respiración" }
        ]
      }
    ]
    
    
    
  }]

const ChallengeCard = ({ title, desc, image, pts }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc} numberOfLines={4}>{desc}</Text>
        <Text style={styles.pts}>{pts} pts</Text>
      </View>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const ChallengesFeed = ({navigation}) => {
    return (
      <View style={styles.feedContainer}>
        <Text style={styles.screenText}>Retos</Text>
        {challenges.map((challenge, index) => (
          <TouchableOpacity>
            <ChallengeCard
              key={index}
              title={challenge.title}
              desc={challenge.desc}
              image={challenge.image}
              pts={challenge.pts}
            />
          </TouchableOpacity>
        ))}
        <AppBar navigation={navigation} position={"challenge"}/>
      </View>
    );
  };

  export default ChallengesFeed
  




  const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#333',
      borderRadius: 10,
      padding: 20,
      marginBottom: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    desc: {
      color: 'white',
      fontSize: 14,
      marginBottom: 10,
    },
    pts: {
      fontSize: 16,
      color: '#a565f2',
      fontWeight: '700',
    },
    image: {
      position: "relative",
      width: 110,
      height: 110,
      borderRadius: 20,
    },
    feedContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#202020', // Puedes ajustar según tu esquema de colores
        paddingVertical: 60
    },
    screenText: {
        fontSize: 28,
        fontWeight: "bold",
        alignSelf: "center",
        marginVertical: 20,
        color: "white"
    }
  });
  