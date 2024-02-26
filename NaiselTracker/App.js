import React, { useEffect, useState, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './navigation';
import * as Notifications from "expo-notifications"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client"

export const AuthContext = createContext()

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userProfileExists, setUserProfileExists] = useState(false);
  const [token, setUserToken] = useState('')
  const [client, setClient] = useState(
    new ApolloClient({
    link: createUploadLink({
      uri: 'http://192.168.0.13:4000/graphql',
      headers: {
        'authorization': `bearer `
      }
    }),
    cache: new InMemoryCache(),
  }))

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

  useEffect(() => {
    console.log("si esto sale es que funciona miperro", token)
    setClient(
      new ApolloClient({
      link: createUploadLink({
        uri: 'http://192.168.0.13:4000/graphql',
        headers: {
          'authorization': `bearer ${token}`
        }
      }),
      cache: new InMemoryCache(),
    }))
  },[token])

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
    <ApolloProvider client={client}>
    <View style={styles.container}>
      <Navigation userProfileExists={userProfileExists}/>
      <StatusBar style="auto" />
    </View>
    </ApolloProvider>
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

