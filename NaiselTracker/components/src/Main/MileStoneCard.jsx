import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Modal, Image } from 'react-native';
import { imageMap } from './ProgressBar';
//El problema es que milestone no esta cojiendo la imagende require y solo tiene el nombre, hay que ponerle u indice o exportar elde progressbar



const MilestoneCard = ({ visible, milestone, onHide }) => {
  const [showModal, setShowModal] = useState(visible);
  const opacity = useState(new Animated.Value(0))[0]; // Inicia la opacidad en 0

  useEffect(() => {
    if (visible) {
      // Fade in
      setShowModal(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Después de 3 segundos, fade out y llama onHide
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowModal(false);
          onHide(); // Callback para limpiar cualquier estado en el componente padre
        });
      }, 10000);
    }
  }, [visible]);

  if (!showModal) return null;

  return (
    <Modal transparent visible={showModal} animationType="fade">
      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalView, { opacity }]}>
          <Image source={imageMap[milestone.icon]} style={styles.milestoneImage} />
              <Text style={styles.felicitacionesText}>
            Felicidades, has alcanzado el hito{' '}
            <Text style={styles.hitoNameText}>{milestone.name}</Text>
          </Text>
              <Text style={styles.milestoneDescription}>{milestone.description}</Text>
              <Text style={styles.text}>Puedes ver tu progreso en la pestaña de niveles en la pagina pricipal</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252525', // Fondo semi-transparente
  },
  modalView: {
    margin: 20,
    backgroundColor: '#353535',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#a565f2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  milestoneImage: {
    width: 100,
    height: 100,
  },
  milestoneText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },
  milestoneDescription: {
    fontSize: 16,
    textAlign: 'center',
    color:"white"
  },
  felicitacionesText: {
    fontSize: 24, // Cambia este valor según necesites
    color: 'white',
    textAlign: 'center', // Centra el texto si es necesario
  },
  hitoNameText: {
    fontSize: 24, // Asegúrate de que coincide con el tamaño de felicitacionesText si quieres que sean del mismo tamaño
    color: '#8A2BE2', // Este es un tono de lila; ajústalo según tu preferencia
    fontStyle: 'italic',
    fontWeight: "bold"
  },
  text: {
    fontSize: 14, // Cambia este valor según necesites
    color: 'white',
    textAlign: 'center', // Centra el texto si es necesario
  },
});

export default MilestoneCard;
