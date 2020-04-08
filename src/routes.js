import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={Signin} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
