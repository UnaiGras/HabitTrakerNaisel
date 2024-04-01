import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Switch,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const flatListRef = useRef();
  console.log("deberia moverse para abajo")

  const { name, desc, image, context } = route.params; // Asumiendo que estos datos vienen como parámetros
  console.log(context)
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (message.trim() === '') return;
  
    // Preparar el mensaje del usuario
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user'
    };
    // Añadir el mensaje del usuario al estado
    setMessages(currentMessages => [...currentMessages, userMessage]);
    setMessage('');
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  
    try {
      // Preparar los últimos 5 mensajes + el contexto como mensaje del sistema
      const recentMessages = messages.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
  

      setIsLoading(true)


      // Añadir el mensaje del sistema como el contexto al inicio
      const systemMessage = { role: "system", content: context };

      console.log(JSON.stringify({
        messages: [
          systemMessage,
          ...recentMessages,
          { role: "user", content: message }, // El mensaje actual del usuario
        ]
      }))
      

      const response = await fetch('http://192.168.0.12:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            systemMessage,
            ...recentMessages,
            { role: "user", content: message }, // El mensaje actual del usuario
          ]
        }),
      });

      
  
      const data = await response.json();

      console.log(data)
      // Añadir la respuesta del asistente al estado
      const responseMessage = {
        id: Date.now() + 1,
        text: data.message, // Asegúrate de acceder a la propiedad correcta
        sender: 'assistant'
      };

      setIsLoading(false)

      setMessages(currentMessages => [...currentMessages, responseMessage]);
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };
  


  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={image} style={styles.profileImage} />
        <Text style={styles.headerText}>{name}</Text>
      </View>
      <FlatList
      ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.cardContainer}>
            <Image source={image} style={styles.cardImage} />
            <Text style={styles.cardName}>{name}</Text>
            <Text style={styles.cardDesc}>{desc}</Text>
          </View>
        }
        style={styles.messagesList}
      />
      {
      isLoading && (
        <View style={[styles.message, styles.botMessage, {width: "60%"}]}>

            <ActivityIndicator size="small" color="#454545" />

        </View>
      )
    }
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#666"
                />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#a565f2"/>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#191919', // Asegúrate de que el color de fondo sea consistente con el tema oscuro.
      },
      container: {
        flex: 1,
      },
      header: {
        position: "absolute",
        top: 10,
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15, // Modifica el padding para un aspecto más espaciado
        paddingHorizontal: 20, // Agrega espacio adicional a los lados para un aspecto más equilibrado
        backgroundColor: '#353535',
        margin: 15,
        borderRadius: 20,
        zIndex: 1000, // Asegura que el header esté por encima de otros elementos
        elevation: 1000, // Para Android, funciona de manera similar a zIndex
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15, // Mueve la imagen de perfil al lado derecho del texto para un mejor equilibrio
      },
      headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18, // Aumenta el tamaño del texto para mayor legibilidad y presencia
      },
    messagesList: {
      flex: 1,
    },
    message: {
      margin: 20,
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#575757',
      alignSelf: 'flex-start',
      maxWidth: "60%"
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#4A90E2',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#292929',
      borderWidth: 1,
      borderColor: "#a565f2"
    },
    messageText: {
      color: 'white',
      fontSize: 16,
      fontWeight: "500"
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#353535',
    },
    input: {
      flex: 1,
      marginRight: 10,
      backgroundColor: '#353535',
      color: 'white',
      borderRadius: 20,
      padding: 10,
    },
    cardContainer: {
      alignItems: 'center', // Centra los elementos horizontalmente en el contenedor
      padding: 10,
      alignSelf: "center",
      backgroundColor: "#252525",
      marginVertical: 100,
      borderRadius: 20,
      shadowColor: '#8A2BE2', // Color de la sombra lila
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
        shadowOpacity: 0.3, // Opacidad de la sombra
        shadowRadius: 5, // Radio de desenfoque de la sombra
        elevation: 8,
    },
    cardImage: {
      width: 150, // Ancho de la imagen
      height: 150, // Alto de la imagen
      borderRadius: 50, // Redondea las esquinas para hacerla circular
    },
    cardName: {
      fontSize: 18, // Tamaño de fuente para el nombre
      fontWeight: 'bold', // Negrita para el nombre
      marginTop: 8, // Margen arriba del nombre
      color: "white"
    },
    cardDesc: {
      fontSize: 14, // Tamaño de fuente para la descripción
      color: '#888', // Color de la descripción
      marginTop: 4, // Margen arriba de la descripción
      textAlign: 'center', // Centra el texto de la descripción
      maxWidth: "60%"
    },
  });

export default ChatScreen;
