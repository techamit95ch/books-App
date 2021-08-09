import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "./actions/auth";
import * as SecureStore from "expo-secure-store";
import { Spinner, Center, NativeBaseProvider } from "native-base";
// import AuthNav from "./navigation/Auth";
import ContentNav from "./navigation/Content";
import LoginScreen from "./screens/Auth/Login";
import SignInScreen from "./screens/Auth/Signin";
import { getAll } from "./actions/books";
import { LogBox } from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

export default function AsyncApp() {

  let Stack;
  Stack = createStackNavigator();
  //  Stack = createDrawerNavigator();

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    LogBox.ignoreLogs(["timer"]);
    dispatch(isAuthenticated());
    dispatch(getAll());

    // setTimeout(() => setReady(true), 2000);
  }, [dispatch, user]);
  console.log(user.authState);

  if (user.authState ===0) {
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <Spinner color="blue.500" size="lg" />
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={user.isAuthenticated ? "Content" : "Auth"}
          // initialRouteName={"Content" }
        >
          <Stack.Screen
            name="Auth"
            component={LoginScreen}
            options={{
              headerTitle: "Log In",
              headerStyle: {
                backgroundColor: "white",
              },
              headerTintColor: "#005EB8",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerLeft: () => (<></>)

            }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerTitle: "Sign In",
              headerStyle: {
                backgroundColor: "white",
              },
              headerTintColor: "#005EB8",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Content"
            component={ContentNav}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
