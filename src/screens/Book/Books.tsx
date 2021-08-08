import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  Button,
  Header,
  Text,
} from "react-native-elements";
import {
  ScrollView,
  NativeBaseProvider,
} from "native-base";
import HeaderBar from "../../components/Header/HeaderBar";
const Books = ({ navigation }) => {

  return (
    <NativeBaseProvider>
      <HeaderBar navigation={navigation} add={'Add Book'} back='' BackButton={(<></>)}/>
      <ScrollView>
        <Text> {"View Books"}</Text>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Books;
