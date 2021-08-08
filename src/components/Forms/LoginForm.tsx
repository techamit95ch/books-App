import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Card, Button, Input, Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Text,
  ScrollView,
  Collapse,
  Alert,
  NativeBaseProvider,
} from "native-base";
export default function LoginForm({
  navigation,
  user,
  setUser,
  error,
  validate,
  submit,
  alert,
  loginUser,
}) {
  return (
    <>
      <Collapse isOpen={alert}>
        <Alert
          status={loginUser.success ? "success" : "error"}
          display="flex"
          variant="top-accent"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Alert.Icon />
          <Alert.Title flexShrink={1}>
            {loginUser.success ? "Success" : "Error"}
          </Alert.Title>
          <Alert.Description>
            {loginUser.success
              ? `User Logged in successfully! `
              : loginUser.errorMessage}
          </Alert.Description>
        </Alert>
      </Collapse>
      <Card >
        <Card.Title>
          <Avatar
            rounded
            size={"large"}
            source={{
              uri: "https://wallpapercave.com/wp/wp2297884.jpg",
            }}
          />
        </Card.Title>
        <Input
          leftIcon={
            <MaterialIcons name="alternate-email" size={24} color="grey" />
          }
          label="Email"
          placeholder="abcd@xyz.com"
          autoCompleteType={"email"}
          autoCorrect={false}
          autoCapitalize={"none"}
          autoFocus={true}
          errorStyle={{ color: "red" }}
          errorMessage={error.isError ? error.email : ""}
          onChange={(evt) => {
            // console.log(evt.nativeEvent.text);
            setUser({ ...user, email: evt.nativeEvent.text });
            
          }}
          onEndEditing={()=>validate()}
        />

        <Input
          leftIcon={<MaterialIcons name="lock" size={24} color="grey" />}
          label="Password"
          secureTextEntry={true}
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize={"none"}
          onChange={(evt) => {
            // console.log(evt.nativeEvent.text);
            setUser({ ...user, password: evt.nativeEvent.text });
          }}
        />

        <Button
          type="clear"
          style={{ marginTop: 10 }}
          title="Login"
          onPress={submit}
          disabled={user.email == "" || user.password === "" || error.email}
        />
        <Card.Divider />

        <Text sub style={{ margin: 10, padding: 5 }}>
          Doesn't Have Account?{" "}
          <Text
            underline
            italic
            onPress={() => {
              navigation.navigate(`SignIn`);
            }}
            color={"#005EB8"}
          >
            Create New
          </Text>
        </Text>
  
      </Card>
    </>
  );
}

{
  /* export default LoginForm; */
}

{
  /* const styles = StyleSheet.create({}); */
}
