import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Card, Button, Input, Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Link,
  NativeBaseProvider,
  ScrollView,
  Text,
  Pressable,
} from "native-base";
const LoginScreen = ({ navigation }) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  return (
    <NativeBaseProvider>
      <ScrollView style={{ height: "100%" }}>
        <Card>
          <Card.Title>
            {" "}
            <Avatar
              rounded
              size={"xlarge"}
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
            placeholder="Email"
            errorStyle={{ color: "red" }}
            errorMessage=""
          />

          <Input
            leftIcon={<MaterialIcons name="lock" size={24} color="grey" />}
            label="Password"
            secureTextEntry={true}
            placeholder="Password"
            errorStyle={{ color: "red" }}
            errorMessage=""
          />

          <Button type="clear" style={{ marginTop: 10 }} title="Login" />
          <Card.Divider />

          <Text sub style={{ margin: 10, padding:5}}>
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
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
