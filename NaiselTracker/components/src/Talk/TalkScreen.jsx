import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppBar from '../General/AppBar';

const ProfessionalCard = ({ title, desc, image, pts }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc} numberOfLines={8}>{desc}</Text>
      </View>
      <Image source={image} style={styles.image} />
    </View>
  );
};


const TalkScreen = ({navigation}) => {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Apoyo</Text>
        {professionals.map((professional, index) => (
          <ProfessionalCard
            key={index}
            title={professional.title}
            desc={professional.desc}
            image={professional.image}
          />
        ))}
        <AppBar navigation={navigation} position={"talk"}/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#252525', // Puedes ajustar según tu esquema de colores
        paddingVertical: 60 // Puedes ajustar según tu esquema de colores
    },
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
          backgroundColor: '#252525', // Puedes ajustar según tu esquema de colores
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
  
  export default TalkScreen;
  




const professionals = [{
    title: "Alex",
    desc: "Experto en salud, ejercicio y rutinas. Crea y aplica tus rutinas en para llegar a el punto que estas buscando.",
    image: require("../../../assets/terapeuta.png"),
    pts: 550
}, {
    title: "Rocio",
    desc: "Experta en trastornos como Depresión y Ansiedad desde hace mas de 20 años.Puedes hablar con ella lo que quieras, desde hacer sesiones de introspeccion hasta establecimiento de un plan de accion",
    image: require("../../../assets/psicologo.png"),
    pts: 800
}]