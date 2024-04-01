import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerScreen = ({ route }) => {
  const { minutes, color, iconName, title, id } = route.params; // Asegúrate de pasar un `id` único para cada hábito
  const [time, setTime] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const totalDuration = minutes * 60;

  // Usamos el id del hábito para crear claves únicas para AsyncStorage
  const startTimeKey = `startTime_${id}`;
  const durationKey = `duration_${id}`;

  console.log("tic tac")

  useEffect(() => {
    const checkTime = async () => {
      const startTime = await AsyncStorage.getItem(startTimeKey);
      const duration = await AsyncStorage.getItem(durationKey);
      if (startTime && duration) {
        const now = new Date().getTime();
        const elapsed = now - parseInt(startTime);
        const totalTime = parseInt(duration) * 60 * 1000; // Convertir a milisegundos
        if (elapsed < totalTime) {
          setTime(Math.floor((totalTime - elapsed) / 1000)); // Actualizar tiempo con segundos restantes
          setIsActive(true);
        } else {
          // Manejar cronómetro expirado
          setTime(0);
          setIsActive(false);
          Alert.alert("Cronómetro finalizado", "El tiempo para tu actividad ha terminado.");
          await AsyncStorage.removeItem(startTimeKey);
          await AsyncStorage.removeItem(durationKey);
        }
      }
    };

    checkTime();
  }, [id]); // Asegúrate de incluir el id en el array de dependencias

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = async () => {
    if (!isActive) {
      const now = new Date().getTime();
      await AsyncStorage.setItem(startTimeKey, now.toString());
      await AsyncStorage.setItem(durationKey, minutes.toString());
      scheduleNotification();
    }
    setIsActive(!isActive);
  };

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Tiempo Finalizado!",
        body: `Tu tiempo para ${title} ha terminado.`,
      },
      trigger: { seconds: time },
    });
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = `0${time % 60}`.slice(-2);
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: "center"}}>
        <View style={{backgroundColor: "#353535", padding: 20, borderRadius: 20, marginVertical: 20}}>
          <Ionicons name={iconName} size={68} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <AnimatedCircularProgress
        size={300}
        width={25}
        fill={(1 - time / totalDuration) * 100}
        tintColor={color}
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <Text style={styles.timerText}>{formatTime()}</Text>
        )}
      </AnimatedCircularProgress>
      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={toggleTimer}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#202020',
  },
  title: {
    fontSize: 29,
    color: 'white',
    fontWeight: "700"
  },
  timerText: {
    fontSize: 44,
    color: 'white',
    fontWeight: "700"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default TimerScreen;
