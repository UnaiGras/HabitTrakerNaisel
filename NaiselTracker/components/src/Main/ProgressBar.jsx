
import React, {useRef, useEffect}from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import milestones from '../../../milestones'; // Asegúrate de que la ruta es correcta

export const imageMap = {
  'semilla.png': require('../../../assets/semilla.png'),
  'hormiga.png': require('../../../assets/hormiga.png'),
  'angel-santo.png': require('../../../assets/angel-santo.png'),
  'monje.png': require('../../../assets/monje.png'),
  'leon.png': require('../../../assets/leon.png'),
  'faraon.png': require('../../../assets/faraon.png'),
  'samurai.png': require('../../../assets/samurai.png'),
  'perseo.png': require('../../../assets/perseo.png'),
  'atlas.png' : require('../../../assets/atlas.png'),
  'zeus.png': require('../../../assets/zeus.png'),
  'griego.png': require('../../../assets/griego.png'),
  'dios.png': require('../../../assets/dios.png'),
};

const ProgressBar = ({ userPoints }) => {
  const scrollViewRef = useRef();
  // Ordena milestones de mayor a menor puntuación
  const sortedMilestones = [...milestones].sort((a, b) => b.points - a.points);

  useEffect(() => {
    // Espera un breve momento después de montar para asegurar la medición correcta
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100); // Puede ajustar este tiempo si es necesario

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView
    ref={scrollViewRef}
    contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
      {sortedMilestones.map((milestone, index) => {
        let progress = 0;
        // Asumiendo que los hitos están ordenados de mayor a menor como indicaste,
        // el hito anterior (en términos de progreso) sería el siguiente en la lista (index + 1)
        // y el "siguiente" hito (hacia el que el usuario avanza) sería el anterior en la lista (index - 1)
        if (userPoints < milestone.points) {
          const nextMilestonePoints = index > 0 ? sortedMilestones[index - 1].points : Infinity;
          const prevMilestonePoints = index < sortedMilestones.length - 1 ? sortedMilestones[index + 1].points : 0;
          progress = ((userPoints - prevMilestonePoints) / (milestone.points - prevMilestonePoints)) * 100;
        } else {
          progress = 100; // El hito ya fue alcanzado
        }
      
        return (
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            userPoints={userPoints}
            progress={progress}
          />
        );
      })}

    </ScrollView>
  );
};




// Asegúrate de que el contenedor de MilestoneItem fluya normalmente (no use position: 'absolute')
const MilestoneItem = ({ milestone, userPoints, progress }) => {
  // Calcula los puntos que faltan para alcanzar este hito
  const pointsToNextMilestone = milestone.points - userPoints;
  // Mensaje que muestra cuántos puntos faltan o si el hito ya fue alcanzado
  const pointsMessage = pointsToNextMilestone > 0 ? `Faltan ${pointsToNextMilestone} puntos` : "Hito alcanzado";

  return (
    <View style={styles.milestoneContainer}>
      <View style={styles.milestoneCard}>
        <Image source={imageMap[milestone.icon]} style={styles.milestoneImage} />
        <Text style={styles.milestoneName}>{milestone.name}</Text>
        <Text style={styles.milestoneDescription}>{milestone.description}</Text>
        {/* Muestra los puntos del usuario y cuántos faltan para el hito */}
        <Text style={styles.pointsInfo}>{pointsMessage}</Text>
      </View>
      <View style={styles.progressBarVertical}>
        <View style={[styles.progressBarFill, { height: `${progress}%` }]} />
      </View>
    </View>
  );
};






//<Image source={milestoneImageSource} style={styles.milestoneImage} />
//      <Text style={styles.milestoneName}>{nextMilestone.name}</Text>
//      <Text style={styles.milestoneDescription}>{nextMilestone.description}</Text>


  
  // Añade estilos para progressBarBackground y progressBarFill
  const styles = StyleSheet.create({
    milestoneContainer: {
      alignItems: 'center',
      justifyContent: 'space-between', // Ajusta según necesites para el diseño
      marginBottom: 20, // Espaciado entre hitos
      width: '100%', // Asegura que el contenedor use todo el ancho disponible
      paddingVertical: 50
    },
    progressBarVertical: {
      width: 60, // Incrementa el ancho si quieres barras más anchas
      height: 500, // Aumenta la altura para barras más altas
      backgroundColor: '#292929',
      justifyContent: 'flex-end',
      margin: 20, // Ajusta el margen si es necesario
      borderRadius: 30,
      overflow: 'hidden',
    },
    progressBarFill: {
      width: '100%', // Esto puede permanecer igual
      backgroundColor: 'white', // Ajusta el color si lo deseas 
      shadowColor: 'white', // Color de la sombra lila
      shadowOffset: { width: 0, height: -20 }, // Desplazamiento de la sombra
      shadowOpacity: 1.5, // Opacidad de la sombra
      shadowRadius: 20, // Radio de desenfoque de la sombra
      elevation: 20,
      // La altura se ajusta dinámicamente basado en el progreso
    },
    milestoneCard: {
      width: 200, // Ancho de la tarjeta
      alignItems: 'center', // Centra el contenido de la tarjeta
      backgroundColor: '#191919', // Fondo de la tarjeta
      borderRadius: 10, // Bordes redondeados de la tarjeta
      padding: 10, // Padding interno de la tarjeta
      shadowColor: '#8A2BE2', // Color de la sombra lila
      shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
      shadowOpacity: 0.3, // Opacidad de la sombra
      shadowRadius: 5, // Radio de desenfoque de la sombra
      elevation: 8, // Elevación para Android, controla la profundidad de la sombra
    },
    milestoneImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    milestoneName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 5,
    },
    milestoneDescription: {
      textAlign: 'center',
      color: 'gray',
    },
    pointsInfo: {
      color: 'white', // Asegúrate de que el color contraste con el fondo de la tarjeta
      marginTop: 10, // Espacio por encima del texto para separarlo de la descripción
      fontSize: 14, // Ajusta el tamaño del texto según necesites
    },
  });
  
  
  
  


  

export default ProgressBar;
