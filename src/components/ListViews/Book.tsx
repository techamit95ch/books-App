import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ListItem, Button, Icon, Divider, Text } from 'react-native-elements';
// import { Book } from './../../interfaces/index';

import {
  VStack,
  Center,
  Heading,
  NativeBaseProvider,
  Stack,
  Pressable,
} from 'native-base';

import StarRating from 'react-native-star-rating';
import { updateRating, deleteBook } from '../../actions/books';
import { useDispatch } from 'react-redux';

const Book = ({ book, setAuthor, viewBooks, setViewBooks, user }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState(book.rating);
  const changeRating = (value: number) => {
    if (user.uid === book.uid) {
      let res = viewBooks.filter((result) => {
        if (result.id === book.id) {
          result.rating = value;
        }
        return result;
      });
      setViewBooks(res);
      setRating(value);
      dispatch(updateRating(book, value));
    }
  };
  const bookDelete = (id) => {
    let res = viewBooks.filter((result) => result?.id !== id);
    setViewBooks(res);
    dispatch(deleteBook(book.id));
  };
  const selectAuthor = (auth: string) => {
    let res = viewBooks.filter((result) => result?.author === auth);
    setViewBooks(res);
    setAuthor(auth);
  };

  return (
    <>
      <ListItem bottomDivider>
        <ListItem.Content>
          <Stack
            space={2}
            direction={'row'}
            style={{ justifyContent: 'space-between' }}
          >
            <Stack space={2} direction={'column'}>
              <Stack direction={'row'} alignItems="flex-start">
                <ListItem.Title style={{ color: '#005EB8' }}>
                  Book: {book?.title}
                </ListItem.Title>

                <ListItem.Subtitle style={{ marginLeft: 10, flex: 3 }}>
                  <TouchableOpacity
                    style={styles.author}
                    onPress={() => {
                      console.log(book?.author);
                      selectAuthor(book?.author);
                    }}
                  >
                    <Text style={{ color: 'grey' }}> by: {book?.author}</Text>
                  </TouchableOpacity>
                </ListItem.Subtitle>
              </Stack>
              <Stack direction={'row'} style={{ marginRight: 30 }}>
                <StarRating
                  style={{ height: 2 }}
                  disabled={false}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  rating={rating}
                  selectedStar={changeRating}
                  fullStarColor={'#FFCC00'}
                />
              </Stack>
            </Stack>
            <Stack
              space={2}
              direction={'column'}
              style={{ justifyContent: 'center' }}
            >
              {user?.uid === book?.uid ? (
                <>
                  <Button
                    title=""
                    icon={{ name: 'delete', color: 'red' }}
                    buttonStyle={{
                      backgroundColor: 'white',
                      marginLeft: 40,
                    }}
                    onPress={() => bookDelete(book.id)}
                  />
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </ListItem.Content>
        {/* <ListItem.Chevron /> */}
      </ListItem>
      <Divider />
      {/* <Text>{book?.title}</Text> */}
    </>
  );
};

export default Book;

const styles = StyleSheet.create({
  author: {
    // display: 'flex',

    textAlign: 'center',
    // margin: 20,
    // padding: 10,
    marginLeft: 5,
    borderRadius: 8,
  },
});
