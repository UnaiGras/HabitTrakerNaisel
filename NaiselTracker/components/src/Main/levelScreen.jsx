import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import AppBar from '../General/AppBar';


const LevelScreen = ({navigation}) => {
    const [userProfile, setUserProfile] = useState({ level: 0, points: 0 });
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const storedUserProfile = await AsyncStorage.getItem('userProfile');
          if (storedUserProfile !== null) {
            // Si existe un userProfile, lo parseamos y actualizamos el estado
            const profile = JSON.parse(storedUserProfile);
            setUserProfile({ level: profile.level, points: profile.points });
            console.log(profile.points)
          }
        } catch (error) {
          console.error('Error al recuperar el perfil del usuario', error);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    return (
      <View style={styles.container}>
        <ProgressBar userPoints={userProfile.points}/>
        <AppBar navigation={navigation} position={"LevelScreen"}/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202020',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    info: {
      fontSize: 18,
      margin: 10,
    },
  });
  
  export default LevelScreen;
  