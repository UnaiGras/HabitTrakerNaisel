import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, Button, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from './loginQueries';

export default function Login1({ navigation, setToken }) {

    const [error, setError] = useState('');

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error);
        },
    });

    useEffect(() => {
        if (result.data) {
            const { value: token } = result.data.login;
            setToken(token);
        }
    }, [result.data]);

    const loginSchema = Yup.object().shape({
        username: Yup.string().required('El nombre de usuario es requerido'),
        password: Yup.string().required('La contraseña es requerida'),
    });

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            login({
                variables: {
                    username: values.username,
                    password: values.password,
                },
            });
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.imageStyle}
                />
                <Text style={styles.naisel}>NaiselApp</Text>
                <TextInput
                    style={styles.input}
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                    placeholder="Username"
                    placeholderTextColor="gray"
                />
                {formik.touched.username && formik.errors.username && <Text style={{ color: 'red' }}>{formik.errors.username}</Text>}
                <TextInput
                    style={styles.input}
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    placeholderTextColor={"gray"}
                    placeholder="Password"
                    secureTextEntry
                />
                {formik.touched.password && formik.errors.password && <Text style={{ color: 'red' }}>{formik.errors.password}</Text>}
                <Button title="Iniciar sesión" onPress={formik.handleSubmit} color="#a565f2" />
                <TouchableOpacity
                    style={styles.registerLink}
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                >
                    <Text style={styles.registerText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151515',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '80%',
      padding: 20,
      paddingVertical: 30,
      borderRadius: 20,
      backgroundColor: "#101010",
      shadowColor: "#a565f2",
      elevation: 10
    },
    input: {
      backgroundColor: '#191919',
      marginBottom: 20,
      paddingHorizontal: 10,
      height: 50,
      borderRadius: 8,
      fontSize: 20,
      color: "white"
    },
    naisel: {
      fontSize: 18,
      fontWeight: "700",
      alignSelf: "center",
      marginBottom: 20,
      color: "white"
    },
    imageStyle: {
      width: 200,
      height: 200,
      alignSelf: "center",
      borderRadius: 20
    }
  });