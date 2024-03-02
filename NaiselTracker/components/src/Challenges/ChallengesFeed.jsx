
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppBar from '../General/AppBar';

const challenges = [{
    id: 28398,
    title: "Una Vida Saludable En 1 Mes",
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
    ]},
    {
      id: 40001,
      title: "Operación Bikini",
      desc: "Programa de 2 meses para tonificar y eliminar grasa, mejorando la composición corporal.",
      image: require("../../../assets/fitnesschallenge.png"),
      pts: 1600,
      days: 60,
      habits: [
        {
          id: 30001,
          name: "Ejercicio cardiovascular",
          icon: "walk",
          desc: "Realizar 30 minutos de ejercicio cardiovascular diario para aumentar la quema de calorías.",
          duration: "30m",
          points: 50,
          color: "#f44336",
          subTasks: []
        },
        {
          id: 30002,
          name: "Entrenamiento de fuerza",
          icon: "fitness",
          desc: "Incorporar rutinas de fuerza 4 veces a la semana para tonificar y construir músculo.",
          duration: "1h",
          points: 70,
          color: "#9c27b0",
          subTasks: []
        },
        {
          id: 30003,
          name: "Hidratación adecuada",
          icon: "water",
          desc: "Consumir al menos 2 litros de agua al día para apoyar la eliminación de toxinas y la hidratación.",
          duration: "All day",
          points: 20,
          color: "#2196f3",
          subTasks: []
        },
        {
          id: 30004,
          name: "Dieta balanceada",
          icon: "restaurant",
          desc: "Seguir una dieta equilibrada, rica en frutas, verduras y proteínas magras, evitando azúcares y grasas saturadas.",
          duration: "All day",
          points: 80,
          color: "#4caf50",
          subTasks: []
        },
        {
          id: 30005,
          name: "Descanso adecuado",
          icon: "bed",
          desc: "Asegurar 7-8 horas de sueño de calidad cada noche para favorecer la recuperación muscular y la regulación hormonal.",
          duration: "8h",
          points: 40,
          color: "#673ab7",
          subTasks: []
        }
      ]
    },
    {
      id: 50001,
      title: "Bienestar Mental",
      desc: "Reto de 60 días para mejorar el bienestar mental y apoyar la recuperación de estados depresivos.",
      image: require("../../../assets/mental-health.png"),
      pts: 1600,
      days: 60,
      habits: [
        {
          id: 40001,
          name: "Meditación diaria",
          icon: "leaf",
          desc: "Practicar meditación diaria para reducir el estrés y mejorar la concentración.",
          duration: "15m",
          points: 30,
          color: "#4caf50",
          subTasks: []
        },
        {
          id: 40002,
          name: "Actividad física regular",
          icon: "bicycle",
          desc: "Incluir al menos 30 minutos de actividad física moderada diariamente para mejorar el estado de ánimo.",
          duration: "30m",
          points: 50,
          color: "#ff9800",
          subTasks: []
        },
        {
          id: 40003,
          name: "Alimentación nutritiva",
          icon: "nutrition",
          desc: "Priorizar una dieta rica en nutrientes que beneficie la salud mental, incluyendo omega-3, frutas y vegetales.",
          duration: "All day",
          points: 100,
          color: "#4caf50",
          subTasks: []
        },
        {
          id: 40004,
          name: "Escritura reflexiva",
          icon: "book",
          desc: "Dedicar tiempo para escribir pensamientos y sentimientos, fomentando la autoexploración y comprensión.",
          duration: "20m",
          points: 40,
          color: "#ffc107",
          subTasks: []
        },
        {
          id: 40005,
          name: "Conexión social",
          icon: "people",
          desc: "Realizar un esfuerzo consciente para interactuar con amigos o familiares, ya sea virtualmente o en persona, para reducir el aislamiento.",
          duration: "30m",
          points: 60,
          color: "#03a9f4",
          subTasks: []
        },
        {
          id: 40006,
          name: "Prácticas de gratitud",
          icon: "happy",
          desc: "Listar diariamente tres cosas por las que estás agradecido, promoviendo una perspectiva positiva.",
          duration: "10m",
          points: 20,
          color: "#ffeb3b",
          subTasks: []
        },
        {
          id: 40007,
          name: "Rutinas de sueño regulares",
          icon: "moon",
          desc: "Establecer y mantener una rutina de sueño constante para mejorar la calidad del descanso nocturno.",
          duration: "8h",
          points: 50,
          color: "#795548",
          subTasks: []
        }
      ]
    }
    
    
    
  
  ]

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
      <ScrollView>
      <View style={styles.feedContainer}>
        <Text style={styles.screenText}>Retos</Text>
        {challenges.map((challenge, index) => (
          <TouchableOpacity onPress={() => navigation.navigate("ChallengeDetails", {challenge: challenge})}>
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
      </ScrollView>
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
    },
  });
  