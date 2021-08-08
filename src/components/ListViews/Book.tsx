import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Button, Icon, Divider } from "react-native-elements";
// import { Book } from './../../interfaces/index';

const Book = ({ book }) => {
  console.log(book);
  return (
    <>
      <ListItem.Swipeable
        leftContent={
          <Button
            title="Info"
            icon={{ name: "info", color: "white" }}
            buttonStyle={{ minHeight: "100%" }}
          />
        }
        rightContent={
          <Button
            title="Delete"
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
          />
        }
      >
        <ListItem.Content>
          <ListItem.Title style={{ textAlign: "center" , marginLeft: 10 }}> Book: {book?.title}</ListItem.Title>
          <ListItem.Subtitle style={{ textAlign: "center" , marginLeft: 15 }}>
           By - {book?.author}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
      <Divider/>
      {/* <Text>{book?.title}</Text> */}
    </>
  );
};

export default Book;

const styles = StyleSheet.create({});
