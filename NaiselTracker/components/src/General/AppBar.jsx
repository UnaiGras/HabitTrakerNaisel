import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import COLORS from './colors'
import { checkUserLoggedAndToken } from '../Main/MainScreen'

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "90%",
        backgroundColor: "#191919",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 20,
        paddingVertical: 10,
        marginBottom: 30
    },
    button: {
        alignItems: "center",
    },
    text: {
        fontSize: 10,
        color: "white"
    },
    centralButtonStyle:{
        alignItems: "center",
        zIndex: 1, // Aseguramos que se superponga sobre los otros elementos
        backgroundColor: COLORS.APP_PRIMARY_COLOR, // Añadimos un fondo, cambia el color como necesites
        borderRadius: 35, // Hacemos que el botón sea circular
        width: 55, // Ajustamos el ancho del botón
        height: 55, // Ajustamos la altura del botón
        justifyContent: 'center', // Centramos el icono y texto en el botón
        shadowColor: '#a565f2', // Añadimos una sombra para darle profundidad
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4
    }
})


const AppBar = ({navigation, position}) => {

    const handleGoDuels = async () => {
        const isLoggedIn = await checkUserLoggedAndToken(true); // Utiliza la función para verificar si el usuario está logueado
        console.log("is logged: ", isLoggedIn)
        if (isLoggedIn) {
            // Si el usuario está logueado, navega a DuelScreen
            navigation.navigate("DuelScreen");
        }
        // Si el usuario no está logueado, checkUserLoggedAndToken ya habrá mostrado un alerta, así que no necesitas hacer nada más aquí.
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("MainScreen")
                }}
            >
                {position === "home" ? (
                <Ionicons name="home" size={25} color={COLORS.APP_PRIMARY_COLOR}/>
                ):(
                <Ionicons name="home-outline" size={25} color={"white"}/>
                )}
                <Text style={styles.text}>Home</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("ChallengesFeed")
                }}
                >
                {position === "challenge" ? (
                    <Ionicons name="flag" size={25} color={COLORS.APP_PRIMARY_COLOR}/>
                ):(
                    <Ionicons name="flag" size={25} color="white" />
                )}
                    <Text style={styles.text}>Retos</Text>

            </TouchableOpacity>
        { position == "home" &&
            <TouchableOpacity 
                style={styles.centralButtonStyle} 
                onPress={() => {navigation.navigate("TalkScreen")}}
            >
                <Ionicons name="chatbubbles" size={40} color="white" />
            </TouchableOpacity>
            }
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("LevelScreen")
                }}
                >
                {position === "LevelScreen" ? (
                <Ionicons name="diamond-outline" size={25} color={COLORS.APP_PRIMARY_COLOR}/>
                ):(
                <Ionicons name="diamond-outline" size={25} color="white" />
                )}
                <Text style={styles.text}>Level</Text>

            </TouchableOpacity>
            <TouchableOpacity  
            style={styles.button}
            onPress={handleGoDuels}
            >
    
                        <Ionicons name="people-circle" size={25} color="white"/>
                    
                    <Text style={styles.text}>Duelos</Text>
            </TouchableOpacity>
      </View>
        

    )
}

export default AppBar