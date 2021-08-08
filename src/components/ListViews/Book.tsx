import React from "react";
import { StyleSheet,  View } from "react-native";
import { ListItem, Button, Icon, Divider,Text } from "react-native-elements";
// import { Book } from './../../interfaces/index';

const Book = ({ book}) => {
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
          <ListItem.Subtitle style={{ textAlign: "center" , marginHorizontal: 15, display:"flex" }}>
          <Text style={{flex:3}}>By - {book?.author}</Text> 
           
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
