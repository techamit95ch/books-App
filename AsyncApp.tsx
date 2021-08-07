import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Link, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import LoginScreen from "./screens/Auth/Login";
import SignInScreen from "./screens/Auth/Signin";
import BookScreen from "./screens/Book/Books";
import AddBookScreen from "./screens/Book/AddBook";
// import EditBookScreen from "./screens/Book/EditBook";
// import DetailsBookScreen from "./screens/Book/Details";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "./actions/auth";
import * as SecureStore from "expo-secure-store";
import { Spinner, Center, NativeBaseProvider } from "native-base";
import { Button } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";

export default function AsyncApp({ navigation }) {
  // const navigation = useNavigation();

  const [ready, setReady] = useState(false);
  const Stack = createStackNavigator();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated());
    setTimeout(() => setReady(true), 3000);
  }, [dispatch, user, ready]);
  // console.log(user);

  if (!ready) {
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
          initialRouteName={user.isAuthenticated ? "Books" : "Login"}
        >
          <Stack.Screen
            name="Login"
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
            name="Books"
            component={BookScreen}
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen
            name="Add"
            component={AddBookScreen}
            options={{
              headerTitle: "Books App",
              headerStyle: {
                backgroundColor: "white",
              },
              headerTintColor: "#005EB8",
              headerTitleStyle: {
                fontWeight: "bold",
              },
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
