import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation, AuthFlow }from './navigation';
import * as Notifications from "expo-notifications"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client"
import AuthContext from './AuthContext';





export default function App() {
  const [loading, setLoading] = useState(true);
  const [userProfileExists, setUserProfileExists] = useState(false);
  const [token, setUserToken] = useState('')
  const [showLogin, setShowLogin] = useState(false);
  const [reload, setReload] = useState(false)
  const [client, setClient] = useState(
    new ApolloClient({
    link: createUploadLink({
      uri: 'http://192.168.0.12:3000/graphql',
      headers: {
        'authorization': `bearer `
      }
    }),
    cache: new InMemoryCache(),
  }))

  useEffect(() => {
    const checkUserProfileAndAuthSettings = async () => {
      try {
        const userProfile = await AsyncStorage.getItem('userProfile');
        setUserProfileExists(userProfile !== null);
  
        // Comprobación y configuración de usingaccount
        let usingAccount = await AsyncStorage.getItem('usingaccount');
        if (usingAccount === null) {
          // Si no existe, establece el valor por defecto en AsyncStorage
          await AsyncStorage.setItem('usingaccount', 'false');
          usingAccount = 'false'; // Asegúrate de que la variable también tenga el valor por defecto
        }
  
        // Comprobación y configuración del token
        let token = await AsyncStorage.getItem('token');


        if (token === null) {
          // Si no existe, establece el valor por defecto en AsyncStorage
          await AsyncStorage.setItem('token', '');
          token = ''; // Asegúrate de que la variable también tenga el valor por defecto
        } else {
          setUserToken(token)
        }

        console.log("Is user using account?: ", usingAccount )
        console.log("This is the token of user: ", token)
  
        // Actualiza el estado basado en usingaccount y token
        if (usingAccount === 'true' && (!token || token === '')) {
          setShowLogin(true);
        } else {
          setShowLogin(false);
        }
      } catch (error) {
        console.error("Error al verificar el perfil del usuario y la configuración de autenticación", error);
      }
      setLoading(false);
    };
  
    checkUserProfileAndAuthSettings();
  }, [reload]);
  

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
        uri: 'http://192.168.0.12:3000/graphql',
        headers: {
          'authorization': `bearer ${token}`
        }
      }),
      cache: new InMemoryCache(),
    }))
    setShowLogin(false)
  },[token])

  const reloadTheApp = () => {
    setReload(prev => !prev)
  }

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
    <AuthContext.Provider value={{ setToken: setUserToken, reloadTheApp }}>
      {showLogin ? <AuthFlow /> : (
        <View style={styles.container}>
          <Navigation userProfileExists={userProfileExists}/>
          <StatusBar style="auto" />
        </View>
      )}
    </AuthContext.Provider>
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

