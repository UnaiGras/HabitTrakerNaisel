import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './navigation';
import * as Notifications from "expo-notifications"

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userProfileExists, setUserProfileExists] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        setUserProfileExists(userProfile !== null);
      } catch (error) {
        console.error("Error al verificar el perfil del usuario", error);
      }
      setLoading(false);
    };

    checkUserProfile();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (nextAppState === "background") {
        scheduleHabitReminder();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const scheduleHabitReminder = async () => {
    const userProfileStr = await AsyncStorage.getItem('userProfile');
    if (!userProfileStr) return; // Si no hay userProfile, no hacer nada
    const userProfile = JSON.parse(userProfileStr);
    const today = new Date().toISOString().split('T')[0];

    const incompleteHabits = userProfile.activeHabits.filter(habit => habit.lastCompletedDate !== today);
    if (incompleteHabits.length > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          //Se puede añadir un sonido personalizado
          title: "Tienes hábitos por completar",
          body: `Hoy no has completado: ${incompleteHabits.map(habit => habit.name).join(', ')}. ¡Ánimo!`,
          data: { data: "goes here" },
        },
        trigger: { seconds: 3 * 60 }, // 5 minutos
      });
    }
  };

  if (loading) {
    // Muestra un indicador de carga mientras verifica el userProfile
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navigation userProfileExists={userProfileExists}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centra el ActivityIndicator
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

