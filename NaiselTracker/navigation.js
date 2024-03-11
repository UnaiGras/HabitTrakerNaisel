import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import MainScreen from "./components/src/Main/MainScreen";
import AddHabitScreen from "./components/src/Main/AddNewHabit";
import ChallengesFeed from "./components/src/Challenges/ChallengesFeed";
import TalkScreen from "./components/src/Talk/TalkScreen";
import OnboardingScreen from "./components/src/Onboarding/OnboardingScreen";
import LevelScreen from "./components/src/Main/levelScreen";
import ChallengeDetails from "./components/src/Challenges/ChallengeInfo";
import SettingsScreen from "./components/src/settings/SettingsScreen";
import ChatScreen from "./components/src/Talk/ChatScreen";
import TimerScreen from "./components/src/General/TimerScreen";
import StatsScreen from "./components/src/stats/StatsScreen";
import PlansScreen from "./components/src/settings/PlanScreen";
import Login1 from "./components/src/login/Login";
import Register from "./components/src/login/Register";
import BillingPlansScreen from "./components/src/Billing/BillingPlans";
import DuelScreen from "./components/src/Duels/DuelScreen";
import DuelInfo from "./components/src/Duels/DuelInfo";
import CreateDuelHabitForm from "./components/src/Duels/createDuelHabit";
import CreateDuelRequestForm from "./components/src/Duels/CreateDuel";
import DuelRequestsPage from "./components/src/Duels/RequestsFeedScreen";


const Stack = createStackNavigator();
const AuthStack = createStackNavigator(); // Crea un nuevo Stack para el flujo de autenticación

export function AuthFlow() {
    return (
        <NavigationContainer>
      <AuthStack.Navigator
      initialRouteName="Login1"
        presentation="modal" // Define el modo del navigator como modal
        screenOptions={{
          gestureEnabled: true,
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS, // Usa el preset para modales, disponible en iOS
        }}>
        <AuthStack.Screen name="Login1" component={Login1} />
        <AuthStack.Screen name="Register" component={Register} />
      </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
  

export function Navigation({ userProfileExists }) { // Recibe userProfileExists como prop
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={userProfileExists ? "MainScreen" : "OnboardingScreen"} // Decide la pantalla inicial basada en userProfileExists
                screenOptions={{
                  gestureEnabled: true,
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
            >

                    <>
                        <Stack.Screen name="MainScreen" component={MainScreen} />
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
                        <Stack.Screen
                            name="LevelScreen"
                            component={LevelScreen}
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
                            name="ChallengeDetails"
                            component={ChallengeDetails}
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
                            name="SettingsScreen"
                            component={SettingsScreen}
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
                            name="ChatScreen"
                            component={ChatScreen}
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
                            name="TimerScreen"
                            component={TimerScreen}
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
                            name="StatsScreen"
                            component={StatsScreen}
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
                            name="PlansScreen"
                            component={PlansScreen}
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
                            name="BillingPlansScreen"
                            component={BillingPlansScreen}
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
                            name="DuelScreen"
                            component={DuelScreen}
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
                            name="DuelInfo"
                            component={DuelInfo}
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
                            name="CreateDuelHabitForm"
                            component={CreateDuelHabitForm}
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
                            name="CreateDuelRequestForm"
                            component={CreateDuelRequestForm}
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
                            name="DuelRequestsPage"
                            component={DuelRequestsPage}
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
                    </>
                    <Stack.Screen 
                        name="OnboardingScreen" 
                        component={OnboardingScreen} 
                    />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
