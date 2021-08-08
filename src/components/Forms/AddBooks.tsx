import React from "react";
import { StyleSheet, View } from "react-native";
import {
  FormControl,
  Input,
  Stack,
  TextArea,
  Select,
  Popover,
  Button,
  Modal,
  Text,
} from "native-base";

const AddBooks = ({
  book,
  setBook,
  error,
  isInvalid,
  success,
  saveBook,
  isSaveError,
  isDisabled,
  checkFilled,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [author, setAuthor] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("none");
  const [reactElem, setReactElem] = React.useState(<></>);
  const saveAuthor = () => {
    if (author === "" || author === "add") {
      setAuthError("Give Proper Name");
    } else {
      setBook({ ...book, author: author });
      setReactElem(<Select.Item label={author} value={author} />);
      setAuthError("");
      setSelectedValue(author);
      setModalVisible(false);
      checkFilled();
      console.log(isInvalid);
      console.log(book);
    }
  };
  const checkAuthor = (value: any = "") => {
    if (value === "add") {
      setModalVisible(true);
    } else {
      setBook({ ...book, author: value });
    }
  };
  return (
    <>
      <Modal isOpen={modalVisible}>
        <Modal.Content>
          {/* <Modal.CloseButton /> */}
          <Modal.Header>Add Author</Modal.Header>
          <Modal.Body>
            <Text style={{ color: "red" }}>{authError}</Text>
            <Input
              mt={4}
              placeholder="Click here..."
              value={author}
              onChange={(evt) => setAuthor(evt.nativeEvent.text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                _text={{
                  color: "#005EB8",
                }}
                onPress={saveAuthor}
                variant="unstyled"
              >
                SAVE
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                colorScheme="secondary"
              >
                CLOSE
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <FormControl isRequired isInvalid={isInvalid.author}>
        <Stack mx={4}>
          <FormControl.Label>Author</FormControl.Label>
          <Select
            p={2}
            placeholder="Author"
            onValueChange={(itemValue) => {
              checkAuthor(itemValue);
              checkFilled();
            }}
            selectedValue={selectedValue}
          >
            <Select.Item label="Select Author" value="none" disabled />
            {reactElem}
            <Select.Item label="Add Author" value="add" />
          </Select>

          {isInvalid.author && (
            <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>

      <FormControl isRequired isInvalid={isInvalid.title}>
        <Stack mx={4}>
          <FormControl.Label>Book Title</FormControl.Label>
          <Input
            p={2}
            placeholder="Book title"
            value={book.title}
            onChange={(evt) => {
              // console.log(evt.nativeEvent.text);
              setBook({ ...book, title: evt.nativeEvent.text });
              checkFilled();
            }}
          />
          {isInvalid.title && (
            <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={isInvalid.description}>
        <Stack mx={4}>
          <FormControl.Label>Book Details</FormControl.Label>
          <TextArea
            numberOfLines={4}
            placeholder="Book Description"
            value={book.description}
            onChange={(evt) => {
              setBook({ ...book, description: evt.nativeEvent.text });
              checkFilled();
            }}
          />
          {isInvalid.description && (
            <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid>
        <Stack mx={4} style={{ marginTop: 10 }}>
          <Button
            _text={{
              color: "#005EB8",
            }}
            variant="unstyled"
            onPress={saveBook}
            isDisabled={isDisabled}
          >
            Save
          </Button>
        </Stack>
      </FormControl>
    </>
  );
};

export default AddBooks;

const styles = StyleSheet.create({});
