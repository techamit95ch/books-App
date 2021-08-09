import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Select,
  Divider,
  HStack,
  FormControl,
  Button,
  
  Stack,
  Link,
} from "native-base";
import StarRating from "react-native-star-rating";

const FiterAuth = ({
  setFilterAuthor,
  authors,
  filterAuthor,
  searchAuthor,
  setBooks,
  books,
}) => {
  const [value, setValue] = React.useState(filterAuthor);
  const [rating, setRating] = React.useState(0);
  const changeRating = (value: number) => {
    setRating(value);
    const arr = books?.filter((book) => {
      book.rating === value;
    });
    setBooks(arr);
  };
  return (
    <>
      <Divider />
      <Stack mx={4}>
        <FormControl style={{ justifyContent: "center" }}>
          {/* <FormControl.Label >Select Item</FormControl.Label>
        <Select
          p={2}
          minWidth={200}
          placeholder="Author"
          onValueChange={(itemValue) => {
            setFilterAuthor(itemValue);
            searchAuthor(itemValue);
            setValue(itemValue);
          }}
          selectedValue={value}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
          }}
          variant={'filled'}
        >
          <Select.Item label="Select Author" value="none" disabled />
          <Select.Item label="All" value="All" />
          {authors.map((author,index) => (
            <Select.Item label={author} value={author} key={index}/>
          ))}
        </Select> */}
          <Button.Group
            variant="solid"
            isAttached
            space={6}
            mx={{
              base: "auto",
              md: 0,
            }}
          >
            <Button colorScheme="teal" mr={2}>
              {filterAuthor}
            </Button>
            <Button
              colorScheme="danger"
              _text={{
                color: "white",
              }}
              onPress={() => setFilterAuthor('All')}
            >
              Clear
            </Button>
          </Button.Group>
        </FormControl>
        <FormControl style={{ justifyContent: "center" }}>
          <FormControl.Label>
            <>
              <Text>Book Rating: </Text>
              <Text style={{ color: "#005EB8" }}>{rating}/5</Text>
            </>
          </FormControl.Label>
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
        </FormControl>
      </Stack>
      <Divider />
    </>
  );
};

export default FiterAuth;

const styles = StyleSheet.create({});
