import React, { useState } from 'react';
import { ScrollView, Switch, View, Text, Button, StyleSheet } from 'react-native';

const TermsAndConditions = ({ onAcceptTerms }) => {
    const [switchValue, setSwitchValue] = useState(false);
  
    const handleToggleSwitch = () => setSwitchValue(previousValue => !previousValue);
  
    return (
      <View style={styles.container}>
        <ScrollView style={styles.termsScrollView}>
          <Text style={styles.termsText}>
            Aquí van tus términos y condiciones...
          </Text>
        </ScrollView>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={handleToggleSwitch}
            value={switchValue}
          />
          <Text style={styles.switchLabel}>Acepto los términos y condiciones</Text>
        </View>
        <Button
          title="Aceptar"
          color="purple"
          onPress={onAcceptTerms}
          disabled={!switchValue}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212', // Fondo oscuro
      padding: 20
    },
    termsScrollView: {
      flex: 1,
      marginVertical: 20,
      paddingHorizontal: 10,
      backgroundColor: '#1e1e1e', // Color de fondo ligeramente más claro para el área de texto
    },
    termsText: {
      color: '#ffffff', // Texto claro
      textAlign: 'justify',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    switchLabel: {
      color: '#ffffff', // Texto claro
      marginLeft: 10,
    },
  });

export default TermsAndConditions;
