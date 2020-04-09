import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "@expo/vector-icons/MaterialIcons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import SelectProvider from "./pages/New/SelectProvider";
import SelectDateTime from "./pages/New/SelectDateTime";
import Confirm from "./pages/New/Confirm";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function stackNewAgendamento() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: "#FFF",
        headerLeftContainerStyle: { marginLeft: 20 },
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={({ navigation }) => ({
          title: "Selecione o Prestador",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Dashboard")}
              title="Info"
              color="#fff"
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={({ navigation }) => ({
          title: "Selecione a Data / Horário",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              title="Info"
              color="#fff"
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
}

export function RoutesDashboard() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#FFF",
          keyboardHidesTabBar: true,
          inactiveTintColor: "rgba(255,255,255,0.6)",
          style: { backgroundColor: "#8d41a8" },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: "Agendamentos",
            tabBarIcon: ({ color, size }) => (
              <Icon name="event" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Agendar"
          component={stackNewAgendamento}
          options={{
            tabBarVisible: false,
            tabBarLabel: "Novo Agendamento",
            tabBarIcon: ({ color, size }) => (
              <Icon name="add-circle-outline" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Meu Perfil",
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={Signin} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
