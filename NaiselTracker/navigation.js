import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import MainScreen from "./components/src/Main/MainScreen";
import AddHabitScreen from "./components/src/Main/AddNewHabit";
import ChallengesFeed from "./components/src/Challenges/ChallengesFeed";
import TalkScreen from "./components/src/Talk/TalkScreen";

const Stack = createStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='MainScreen'
                screenOptions={{
                  gestureEnabled: true,
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                    }}
                >
                    <Stack.Screen
                        name="MainScreen"
                        component={MainScreen}
                        
                    />
                <Stack.Screen
                        name="AddHabitScreen"
                        component={AddHabitScreen}
                        options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#191919",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                        name="ChallengesFeed"
                        component={ChallengesFeed}
                        options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#191919",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                        name="TalkScreen"
                        component={TalkScreen}
                        options={{
                        headerStyle: {
                            backgroundColor: '#151515',
                            shadowColor: "#191919",
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                </Stack.Navigator>
        </NavigationContainer>
    )}