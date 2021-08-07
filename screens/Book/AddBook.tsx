import React, { useState, useEffect } from "react";
import {  StatusBar } from "react-native";
import { Card, Button, ListItem, Avatar, Header, Text } from "react-native-elements";
import {
  ScrollView,
  Collapse,
  Alert,
  NativeBaseProvider,
  
  FormControl,
  Input,Stack,
  TextArea,Select
} from "native-base";
const AddBook = ({navigation}) => {
  const [hidden, setHidden] = useState(false);

  return (
    <NativeBaseProvider>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      
      <ScrollView style={{backgroundColor:'#fefefe', padding:10}}>

    <Card>
      <FormControl isRequired isInvalid>
      <Stack mx={4}>
        <FormControl.Label>Author</FormControl.Label>
        <Select p={2} placeholder="Author" >
        <Select.Item label="Select Author" value="none"  disabled selected/>
        <Select.Item label="Add Author" value="add"/>

        </Select>
        <FormControl.HelperText>
         Author is required
        </FormControl.HelperText>
        <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
      </Stack>
    </FormControl>

    <FormControl isRequired isInvalid>
      <Stack mx={4}>
        <FormControl.Label>Book Title</FormControl.Label>
        <Input p={2} placeholder="Book title" />
        <FormControl.HelperText>
         Book Title is required
        </FormControl.HelperText>
        <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
      </Stack>
    </FormControl>
    <FormControl isRequired isInvalid>
      <Stack mx={4}>
        <FormControl.Label>Book Details</FormControl.Label>
        <TextArea  numberOfLines={4} placeholder="Book Description" />
        <FormControl.HelperText>
         Book Title is required
        </FormControl.HelperText>
        <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
      </Stack>
    </FormControl>
    <FormControl isRequired isInvalid>
      <Stack mx={4} style={{marginTop:10}}>
      <Button
            title="Save Book"
            type="clear"
            titleStyle={{ color: "#005EB8" }}
          />
      </Stack>
    </FormControl>
    </Card>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default AddBook;
