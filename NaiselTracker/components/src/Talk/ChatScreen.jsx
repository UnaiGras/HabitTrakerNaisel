import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, desc, image, context, pts } = route.params; // Asumiendo que estos datos vienen como parámetros
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() === '') return;
    
    const userMessage = {
        id: Date.now(),
        text: message,
        sender: 'user'
    };
    setMessages([...messages, userMessage]);
    setMessage('');

    try {
        const response = await fetch('http://TU_SERVIDOR/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    // Aquí puedes incluir mensajes previos si es necesario
                    { role: "user", content: message },
                ]
            }),
        });

        const data = await response.json();

        // Asume que la respuesta de OpenAI es directamente el texto a mostrar
        const responseMessage = {
            id: Date.now() + 1,
            text: data.choices[0].message.content,
            sender: 'bot'
        };
        setMessages(currentMessages => [...currentMessages, responseMessage]);
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
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === 'user' && styles.userMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.messagesList}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#353535',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  headerText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
  },
  message: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#575757',
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
  },
  messageText: {
    color: 'white',
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
});

export default ChatScreen;
