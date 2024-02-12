import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './navigation';

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

  if (loading) {
    // Muestra un indicador de carga mientras verifica el userProfile
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Una vez completada la carga, retorna la navegación de tu app.
  // Aquí deberías ajustar <Navigation/> para que tome en cuenta 
  // si userProfileExists o no para decidir qué pantalla mostrar primero.
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

