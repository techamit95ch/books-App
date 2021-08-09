import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Button, Icon, Divider, Text } from "react-native-elements";
// import { Book } from './../../interfaces/index';
import StarRating from "react-native-star-rating";
import { updateRating, deleteBook } from "../../actions/books";
import { useDispatch } from "react-redux";

const Book = ({ book }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState(book.rating);
  const changeRating = (value: number) => {
    setRating(value);
    dispatch(updateRating(book.id, value));
  };
  const bookDelete = (id) => {
    dispatch(deleteBook(book.id));
  };
  return (
    <>
      <ListItem.Swipeable
        rightContent={
          <Button
            title="Delete"
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
            onPress={() => bookDelete(book.id)}
          />
        }
      >
        <ListItem.Content>
          <ListItem.Title
            style={{
              textAlign: "center",
              marginHorizontal: 10,
              display: "flex",
            }}
          >
            <Text style={{ flex: 3, color: "#005EB8" }}>
              Book: {book?.title}
            </Text>
          </ListItem.Title>
          <ListItem.Subtitle style={{ marginLeft: 10, flex: 3, color: "grey" }}>
            By - {book?.author}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ marginHorizontal: 10, color: "#005EB8" }}>
            <StarRating
              disabled={false}
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={rating}
              selectedStar={changeRating}
              fullStarColor={"#005EB8"}
            />
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
      <Divider />
      {/* <Text>{book?.title}</Text> */}
    </>
  );
};

export default Book;

const styles = StyleSheet.create({});
