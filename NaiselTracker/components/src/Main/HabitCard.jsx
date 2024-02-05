import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const HabitCard = ({ title, icon, duration, color }) => {
  const renderRightAction = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={styles.rightAction}
          onPress={() => console.log('Habit completed!')}
        >
          <Ionicons name="checkbox" size={80} color="green" style={styles.actionIcon} />
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = progress => (
    <View style={{ width: 120, flexDirection: 'row' }}>
      {renderRightAction(progress)}
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={[styles.card, { backgroundColor: '#333' }]}>
        <Ionicons style={styles.icon} name={icon} size={38} color={color} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: "700"
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
    marginHorizontal: 25
  },
  actionIcon: {
    alignSelf: 'center', // Asegura que el icono esté centrado en su eje
    justifyContent: "center",
    marginBottom: 10
  },
  // Agrega más estilos según sea necesario
});

export default HabitCard;

