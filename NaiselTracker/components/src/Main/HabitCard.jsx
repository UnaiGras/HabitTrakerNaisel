import React from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const HabitCard = ({ 
  title, 
  icon, 
  duration, 
  color, 
  onComplete, 
  isCompleted, 
  openInfo
}) => {
  const renderRightAction = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });

    const handleComplete = () => {
      console.log("Habito ", title, "completado")
      // Aquí llamas a la función pasada como prop cuando se completa un hábito
      onComplete();
    };

    return (
      <Animated.View style={{ 
        flex: 1, 
        transform: [{ 
          translateX: trans 
          }] }}>
        <RectButton
          style={styles.rightAction}
          onPress={handleComplete} // Usar handleComplete aquí
        >
          <Ionicons name="checkbox" size={60} color="#38ec76" style={styles.actionIcon} />
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = progress => (
    <View style={{ width: 100, flexDirection: 'row' }}>
      {renderRightAction(progress)}
    </View>
  );

  return (

    <Swipeable renderRightActions={renderRightActions}>
    <RectButton onPress={openInfo} style={[styles.card, isCompleted && styles.completedCard]}>
      
        <Ionicons style={styles.icon} name={icon} size={38} color={color} />
        <Text style={[styles.title, isCompleted && styles.completedTitle]}>{title}</Text>
        <Text style={styles.duration}>{duration}</Text>
      
      </RectButton>
    </Swipeable>

  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: '#252525', // Fondo original de la tarjeta
    borderRightWidth: 4,
    borderRightColor: 'transparent', // Borde derecho por defecto
  },
  completedCard: {
    opacity: 0.5, // Hace la tarjeta más transparente si está completada
    borderRightColor: '#38ec76', // Borde derecho verde si está completada
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: "700",
    maxWidth: "60%"
  },
  completedTitle: {
    textDecorationLine: 'line-through', // Tacha el título si el hábito está completado
  },
  icon: {
    marginRight: 10,
  },
  duration: {
    color: 'white',
    fontSize: 14,
    fontWeight: "700"
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 20,
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 25,
    borderRadius: 20
  },
  actionIcon: {
    alignSelf: 'center', // Asegura que el icono esté centrado en su eje
    justifyContent: "center",
    marginBottom: 10
  },
  // Agrega más estilos según sea necesario
});

export default HabitCard;

