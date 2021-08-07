import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  Card,
  Button,
  ListItem,
  Avatar,
  Header,
  Text,
  Divider,
} from "react-native-elements";
import {
  ScrollView,
  Collapse,
  Alert,
  VStack,
  NativeBaseProvider,
  Heading,
} from "native-base";
const Books = ({ navigation }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <NativeBaseProvider>
      <Header
        statusBarProps={{
          barStyle: "dark-content",
          backgroundColor: "white",
          animated: true,
          showHideTransition: "fade",
        }}
        leftComponent={{
          text: "Books App",
          style: {
            color: "#005EB8",
            fontSize: 20,
            marginLeft: 10,
            width: 100,
            fontWeight: "bold",
            marginTop: 4,
          },
        }}
        rightComponent={
          <Button
            title="Add Book"
            type="clear"
            titleStyle={{ color: "#005EB8" }}
            onPress={() => navigation.navigate("Add")}
          />
        }
        rightContainerStyle={{ flex: 2 }}
        containerStyle={{
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.50,
          shadowRadius: 0,
          elevation: 4,
        }}
      />
      <ScrollView>
        <Text> {"View Books"}</Text>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Books;
