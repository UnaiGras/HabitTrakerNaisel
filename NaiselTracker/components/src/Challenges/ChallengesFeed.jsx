
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppBar from '../General/AppBar';

const challenges = [{
    title: "Una Vida Saludable con 20min Al Dia",
    desc: "Los cientificos han demostrado que con solo 30 min al dia se pueden conseguir muy buenos resultados en cuanto a la mejora de el estado de animo y estado fisico",
    image: require("../../../assets/excursionismo.png"),
    pts: 550
}, {
    title: "Habitos Atomicos",
    desc: "Metodo probado: con solo 21 dias puedes cambiar tu vida segun Papa Noel",
    image: require("../../../assets/atomo.png"),
    pts: 800
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
          <ChallengeCard
            key={index}
            title={challenge.title}
            desc={challenge.desc}
            image={challenge.image}
            pts={challenge.pts}
          />
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
  