import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BillingPlansScreen = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
            <Text style={styles.header}>Elige tu Plan de Hábitos</Text>
            <ScrollView contentContainerStyle={styles.cardContainer}>
                <SubscriptionCard
                    title="Plan Mensual"
                    price="7.99"
                    originalPrice="9.99"
                    description="Da el primer paso hacia una mejor versión de ti mismo. ¡Ideal para probar nuevas rutinas!"
                    benefits={[
                        "Entrenador y creador de rutinas y dieta personalizado",
                        "Psicólogo de IA",
                        "Guardado de los datos en la nube",
                        "Duelos para competir en hábitos con tus amigos"
                    ]}
                />
                <SubscriptionCard
                    title="Plan Anual"
                    price="78"
                    originalPrice="119.88"
                    description="Transforma tu vida con un compromiso a largo plazo. ¡Más ahorro, más progreso!"
                    benefits={[
                        "Entrenador y creador de rutinas y dieta personalizado",
                        "Psicólogo de IA",
                        "Guardado de los datos en la nube",
                        "Duelos para competir en hábitos con tus amigos"
                    ]}
                />
            </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const SubscriptionCard = ({ title, price, originalPrice, description, benefits }) => (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{`$${price}`}</Text>
        <Text style={styles.originalPrice}>{`$${originalPrice}`}</Text>
        <View style={styles.benefitsContainer}>
            {benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitRow}>
                    <Icon name="checkmark-circle-outline" size={20} color="#4CAF50" />
                    <Text style={styles.benefitText}>{benefit}</Text>
                </View>
            ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Fondo oscuro para todo el contenedor
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF', // Texto claro para el encabezado
        alignSelf: "center"
    },
    cardContainer: {
        alignItems: 'center',
    },
    card: {
        width: '90%', // Ajusta el ancho de la tarjeta al 90% del contenedor
        padding: 20,
        borderColor: '#333333', // Borde más oscuro para las tarjetas
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#1E1E1E', // Fondo oscuro para las tarjetas
        marginBottom: 20, // Añade espacio entre las tarjetas
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF', // Texto claro para el título
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
        color: '#CCCCCC', // Texto más claro para la descripción
    },
    price: {
        fontSize: 22,
        color: '#4CAF50', // Color para el precio
        fontWeight: 'bold',
    },
    originalPrice: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: '#BDBDBD', // Color para el precio original tachado
    },
    benefitsContainer: {
        marginTop: 10,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    benefitText: {
        marginLeft: 10,
        color: '#DDDDDD', // Texto claro

    }
})

export default BillingPlansScreen