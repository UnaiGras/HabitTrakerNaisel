import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from "expo-notifications"
import AuthContext from '../../../AuthContext'
import { checkUserLoggedAndToken } from '../Main/MainScreen';

const SettingsScreen = ({navigation}) => {
  const { reloadTheApp } = useContext(AuthContext)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    const fetchNotificationSetting = async () => {
      try {
        const userProfileStr = await AsyncStorage.getItem('userProfile')
        if (userProfileStr) {
          const userProfile = JSON.parse(userProfileStr)
          // Asumiendo que 'activatedNotifications' es un booleano guardado en userProfile
          setIsEnabled(!!userProfile.activatedNotifications)
        }
      } catch (error) {
        console.error('Error fetching notification settings', error)
      }
    };
    const verifyLoginStatus = async () => {
      const result = await checkUserLoggedAndToken()
      setIsLoggedIn(result); // Actualiza el estado con el resultado de la verificación
  }

    fetchNotificationSetting()
    verifyLoginStatus()
  }, []);

  const ensureNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let granted = false;

    if (existingStatus !== 'granted') {
      // Solicitar permisos
      const { status } = await Notifications.requestPermissionsAsync();
      granted = status === 'granted';
    } else {
      granted = true;
    }

    return granted;
  };

  const toggleSwitch = async () => {
    const granted = await ensureNotificationPermissions();
    if (granted) {
      setIsEnabled(previousState => !previousState);
      try {
        const userProfileStr = await AsyncStorage.getItem('userProfile');
        const userProfile = userProfileStr ? JSON.parse(userProfileStr) : {};
        userProfile.activatedNotifications = !isEnabled;
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      } catch (error) {
        console.error('Error updating userProfile with notification permission status:', error);
      }
    } else {
      // Aquí podrías manejar el caso de que el usuario no conceda permisos,
      // por ejemplo, mostrando una alerta explicando por qué necesitas los permisos
    }
  };

  const handleGoLogin = async () => {
    try {
      console.log("Estas entrando en la funcion")
      // Leer el valor actual de usingAccount desde AsyncStorage
      const usingAccount = await AsyncStorage.getItem('usingaccount');
      const isUsingAccount = JSON.parse(usingAccount);
      console.log("UsingAccount in Settings: ", usingAccount)
      // Si usingAccount es false, cambiarlo a true y luego recargar la app
      if (isUsingAccount === false) {
        await AsyncStorage.setItem('usingaccount', JSON.stringify(true));
        console.log("Estas en la rama que deberia reiniciar la app")
        // Llamar a reloadTheApp para recargar la aplicación
        reloadTheApp();
      }
    } catch (error) {
      console.error('Error al acceder a AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>

        <Text style={styles.title}>
            Ajustes
        </Text>
      <View style={styles.settingItem}>
        <Ionicons name="notifications" size={24} color="#FFFFFF" />
        <Text style={styles.settingText}>Notificaciones</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={isEnabled ? "#a565f2" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={{paddingVertical: 20}}/>
      
      <TouchableOpacity style={styles.settingItem} onPress={handleGoLogin}>
        <Ionicons name={Platform.OS === 'android' ? "logo-google" : "logo-apple"} size={24} color="white" />
        <Text style={styles.settingText}>{Platform.OS === 'android' ? "Conectar con Google" : "Conectar con iOS"}</Text>
      </TouchableOpacity>

      <View style={{paddingVertical: 20}}/>

      <TouchableOpacity style={[styles.settingItem, styles.subscription]} onPress={() => {navigation.navigate("BillingPlansScreen")}}>
        <Ionicons name="star" size={24} color="#a565f2" />
        <Text style={styles.settingText}>Conseguir Premium</Text>
      </TouchableOpacity>

      <View style={{paddingVertical: 20}}/>
      
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Ionicons name="help" size={24} color="white" />
        <Text style={styles.settingText}>Ayuda</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Ionicons name="chatbubbles" size={24} color="white" />
        <Text style={styles.settingText}>Feedback</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Ionicons name="share-social" size={24} color="white" />
        <Text style={styles.settingText}>Compartir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.settingItem, styles.delete]} onPress={() => {navigation.navigate("PlansScreen")}}>
        <Ionicons name="trash" size={24} color="red" />
        <Text style={styles.settingText}>Borrar Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919', // Fondo oscuro
    paddingTop: 50,
  },
  settingItem: {
    backgroundColor: '#353535', // Fondo de cada "carta"
    padding: 20,
    borderRadius: 10, // Bordes redondeados para la apariencia de carta
    marginVertical: 8, // Espaciado vertical para separar las cartas
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  settingText: {
    fontSize: 18,
    color: '#FFFFFF', // Texto claro
    flex: 1, // Asegurar que el texto ocupe el espacio disponible
    marginLeft: 16, // Espaciado entre el icono y el texto
  },
  title: {
    paddingVertical: 40,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center"
  },
  subscription: {
    borderWidth: 0.3,
    borderColor: "#a565f2",
  },
  delete: {
    borderWidth: 0.5,
    borderColor: "red"
  }
});

export default SettingsScreen;

