import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>

        <Text style={styles.title}>
            Ajustes
        </Text>
      <View style={styles.settingItem}>
        <Ionicons name="notifications" size={24} color="#FFFFFF" />
        <Text style={styles.settingText}>Notificaciones</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={{paddingVertical: 20}}/>
      
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Ionicons name={Platform.OS === 'android' ? "logo-google" : "logo-apple"} size={24} color="#FFFFFF" />
        <Text style={styles.settingText}>{Platform.OS === 'android' ? "Conectar con Google" : "Conectar con iOS"}</Text>
      </TouchableOpacity>

      <View style={{paddingVertical: 20}}/>
      
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Ionicons name="help" size={24} color="#FFFFFF" />
        <Text style={styles.settingText}>Help</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Ionicons name="chatbubbles" size={24} color="#FFFFFF" />
        <Text style={styles.settingText}>Feedback</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Ionicons name="share-social" size={24} color="#FFFFFF" />
        <Text style={styles.settingText}>Share</Text>
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
  }
});

export default SettingsScreen;

