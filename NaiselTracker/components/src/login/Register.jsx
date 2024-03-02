import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { REGISTER } from "./loginQueries";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from 'formik';
import * as yup from 'yup';




const registerSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email('Correo electrónico no válido').required('El correo electrónico es requerido'),
    username: yup.string().required('El nombre de usuario es requerido'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
});
 


export default function Register({navigation}) {
    const [addUser, result] = useMutation(REGISTER, {
        onError: error => {
            console.log(error)
        }
    })

    useEffect(() => {
        if(result.data){
            console.log(result.data)
            navigation.goBack()
        }
    }, [result.data])


    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            username: '',
            password: ''
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            addUser({
                variables: 
                {
                    username: values.username, 
                    password: values.password,
                    name: values.name,
                    email: values.email
                }
            });
        }
    });


    return(

            <ScrollView style={{
                    height: '100%',
                    backgroundColor: 'black'
                }}>

                    <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
                    <View style= { { borderRadius: 100}}>
                       <Ionicons name="person-circle" size={200}/>
                    </View>
                    </View>
                    <View style={{
                        marginVertical: 40,
                        paddingHorizontal: 40

                    }}>

                        <TextInput
                            style={styles.input}
                            value={formik.values.name}
                            onChangeText={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            placeholder="Tu Nombre"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <Text style={styles.error}>{formik.errors.name}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            placeholder="Email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Text style={styles.error}>{formik.errors.email}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            value={formik.values.username}
                            onChangeText={formik.handleChange('username')}
                            onBlur={formik.handleBlur('username')}
                            placeholder="Username"
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <Text style={styles.error}>{formik.errors.username}</Text>
                        ) : null}

                        <TextInput
                            style={styles.input}
                            value={formik.values.password}
                            onChangeText={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                            placeholder="Password"
                            secureTextEntry
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <Text style={styles.error}>{formik.errors.password}</Text>
                        ) : null}
                        {formik.touched.phone && formik.errors.phone ? (
                            <Text style={styles.error}>{formik.errors.phone}</Text>
                        ) : null}
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={formik.handleSubmit}
                        >
                            <Text style={{
                                padding: 10,
                                fontSize: 14,
                                fontStyle: 'italic', 
                                fontWeight: '700'
                            }}>
                                REGISTER
                            </Text>
                    </TouchableOpacity>
            </ScrollView>
                )
                        }



const styles = StyleSheet.create({

    input: {
        backgroundColor: '#151515',
        color: '#ffffff',
        borderRadius: 8,
        padding: 10,
        marginTop: 25,
        width: "90%",
        alignSelf: "center"
    },
    layout: {
        backgroundColor: 'black',
        paddingVertical: 100,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 40,
        shadowColor: "#00c1b9",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.70,
        shadowRadius: 18.00,

        elevation: 40,

    },
    error: {
        color: 'red',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#a565f2',
        marginVertical: 30,
        borderRadius: 15,
        width: "80%",
        alignSelf: "center",
        shadowColor: "#00c1b9",
        shadowOffset: {
            width: 30,
            height: 15,
        },
        shadowOpacity: 0.90,
        shadowRadius: 24.00,

        elevation: 20,
    }
}) 