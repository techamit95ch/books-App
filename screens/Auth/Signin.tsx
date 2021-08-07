import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Collapse,
  Alert,
  NativeBaseProvider,
} from "native-base";
import { StyleSheet } from "react-native";
import { Card, Button, Input, Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { storeUser } from "../../actions/auth";
import { User } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { useNavigation, Link } from "@react-navigation/native";

const SignInScreen = ({ navigation}) => {
  // const navigation = useNavigation();
  const users = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    
  }, [dispatch,users]);
  const [hide, setHide] = useState<boolean>(true);
  const [user1, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [name1, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [successMessage, setSuccess] = useState<string>("");
  const [error, setError] = useState({
    email: "",
    password: "",
    password2: "",
    errorMessage: "",
  });
  const [alert, setAlert] = useState(false);

  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email !== "" && re.test(email)) {
      setError({ ...error, email: `` });

      setUser({ ...user1, email: email });
      // console.log(user);
    } else if (email !== "") {
      setError({ ...error, email: email + `is not a valid email address` });
    }
  };
  const validatePassword = () => {
    const re =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    if (password !== "" && re.test(password)) {
      setError({ ...error, password: `` });

      setUser({ ...user1, password: password });
    }
    if (password === "" && cPassword !== "") {
      setError({ ...error, password: password + `password Can Not be empty` });
    }
    if (cPassword !== "" && password !== cPassword && cPassword !== "") {
      setError({
        ...error,
        password2: cPassword + ` password does not match with confirm password`,
      });
    }
    if (password !== "" && !re.test(password)) {
      setError({ ...error, password: password + ` not Valid password` });
    }
    if (cPassword !== "" && re.test(cPassword)) {
      setError({ ...error, password2: `` });
    }
  };
  const signin = async () => {
    if (email === "") {
      setError({ ...error, email: `Should not be empty` });
    } else if (password === "" && email !== "") {
      setError({ ...error, email: `` });
      setError({ ...error, password: `Should not be empty` });
    } else if (cPassword === "") {
      setError({ ...error, password: `` });
      setError({ ...error, password2: `Should not be empty` });
    } else {
      setError({ ...error, email: `` });
    }
    if (
      error.email === "" &&
      error.password === "" &&
      error.password2 === "" &&
      user1.email !== "" &&
      user1.password !== "" &&
      name1 !== ""
    ) {
      // console.log(name1);
      try {
        setUser({ ...user1, name: name1 });
        await dispatch(storeUser(user1));
        console.log(users);

        if (users.success) {
          await SecureStore.setItemAsync("email", String(user1.email));
          await SecureStore.setItemAsync("password", String(user1.password));
          await SecureStore.setItemAsync("uid", String(users.uid));
          await SecureStore.setItemAsync("id", String(users.id));
          await setSuccess("User Created Successfully");
          await setAlert(true);
          await setTimeout(() => navigation.navigate('Books'), 3000)
        } else {
          await setError({ ...error, errorMessage: users.errorMessage });
          await setAlert(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <NativeBaseProvider>
        <ScrollView style={{ height: "100%" }}>
          <Collapse isOpen={alert}>
            <Alert
              status={users.success ? "success" : "error"}
              display="flex"
              variant="top-accent"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Alert.Icon />
              <Alert.Title flexShrink={1}>
                {users.success ? "Success" : "Error"}
              </Alert.Title>
              <Alert.Description>
                {users.success ? successMessage : users.errorMessage}
                <MaterialIcons name="close" size={24} color="red" />
              </Alert.Description>
            </Alert>
          </Collapse>
          <Card>
            <Card.Title>
              {" "}
              <Avatar
                rounded
                size="large"
                source={{
                  uri: "https://wallpapercave.com/wp/wp2297884.jpg",
                }}
              />
            </Card.Title>

            <Input
              leftIcon={
                <MaterialIcons name="verified-user" size={24} color="grey" />
              }
              label="Full Name"
              placeholder="John Doe"
              autoCorrect={true}
              value={name1}
              onChangeText={setName}
              // onEndEditing={setName}

              style={styles.input}
              blurOnSubmit
            />

            <Input
              leftIcon={
                <MaterialIcons name="alternate-email" size={24} color="grey" />
              }
              label="Email"
              placeholder="abcd@xyz.com"
              value={email}
              onChangeText={setEmail}
              onEndEditing={validateEmail}
              errorStyle={{ color: "red" }}
              errorMessage={error.email}
              autoCompleteType={"email"}
              autoCorrect={false}
              autoCapitalize={"none"}
              autoFocus={true}
              blurOnSubmit
              style={styles.input}
            />
            <Input
              leftIcon={<MaterialIcons name="lock" size={24} color="grey" />}
              rightIcon={
                hide ? (
                  <Feather
                    name="eye"
                    size={24}
                    color="grey"
                    onPress={() => setHide(false)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={24}
                    color="grey"
                    onPress={() => setHide(true)}
                  />
                )
              }
              label="Password"
              secureTextEntry={hide}
              placeholder="Password"
              autoCorrect={false}
              autoCapitalize={"none"}
              errorStyle={{ color: "red" }}
              errorMessage={error.password}
              value={password}
              onChangeText={setPassword}
              onEndEditing={validatePassword}
              style={styles.input}
            />
            <Input
              leftIcon={<MaterialIcons name="lock" size={24} color="grey" />}
              rightIcon={
                hide ? (
                  <Feather
                    name="eye"
                    size={24}
                    color="grey"
                    onPress={() => setHide(false)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={24}
                    color="grey"
                    onPress={() => setHide(true)}
                  />
                )
              }
              label="Confirm Password"
              secureTextEntry={hide}
              placeholder="Confirm Password"
              errorStyle={{ color: "red" }}
              autoCorrect={false}
              autoCapitalize={"none"}
              errorMessage={error.password2}
              value={cPassword}
              onChangeText={setCPassword}
              onEndEditing={validatePassword}
              style={styles.input}
            />

            <Button
              type="clear"
              style={{ marginTop: 10 }}
              title="Sign Up"
              onPress={signin}
            />
          </Card>
        </ScrollView>
      </NativeBaseProvider>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  input: {
    color: "grey",
  },
  error: {},
  success: {},
});
