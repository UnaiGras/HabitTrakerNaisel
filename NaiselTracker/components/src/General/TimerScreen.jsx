import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const TimerScreen = ({ route }) => {
  const { minutes, color, iconName, title } = route.params;
  const [time, setTime] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const totalDuration = minutes * 60;

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

  const toggleTimer = () => {
    setIsActive(!isActive);
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
