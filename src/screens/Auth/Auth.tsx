import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, Link } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import LoginScreen from "./Login";
import SignInScreen from "./Signin";

export default function AuthScreen() {
  const navigation = useNavigation();

  const scheme = useColorScheme();

  const Tab = createBottomTabNavigator();
  const AuthStack = createStackNavigator();

  // <AntDesign name="login" size={24} color="black" />
  // <Feather name="log-in" size={24} color="black" />
  return (
    <SafeAreaProvider>
      <NavigationContainer
        independent={true}
        screenOptions={{ headerStyle: { backgroundColor: "papayawhip" } }}
      >
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: "Log In",
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#005EB8",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <AuthStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerTitle: "Sign In",
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#005EB8",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerLeft: () => (
                <Link to="/Login" >
                  {"   "}
                  <MaterialIcons name="arrow-back-ios" size={24} color="grey" />
                  {"   "}
                </Link>
              ),
            }}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
