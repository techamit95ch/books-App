import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  Card,
  Button,
  ListItem,
  Avatar,
  Header,
  Text,
} from "react-native-elements";
import {
  ScrollView,
  Collapse,
  Alert,
  NativeBaseProvider,
  FormControl,
  Input,
  Stack,
  TextArea,
  Select,
} from "native-base";
import AddBookForm from "../../components/Forms/AddBooks";
// import HeaderBar from "../../components/Header/HeaderBar";
import { Ionicons } from "@expo/vector-icons";
import { Book } from "../../interfaces";
import { storeBook } from "../../actions/books";
import { useDispatch, useSelector } from "react-redux";
import UseBooks from "../../hooks/useBooks";  

const AddBook = ({ navigation }) => {
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.books);
  const [authors] = UseBooks();

  /* const BackButton = () => (
    <Button
      type="clear"
      icon={
        <Ionicons
          name="return-up-back-outline"
          size={28}
          color="#005EB8"
          onPress={() => navigation.goBack()}
        />
      }
      onPress={() => navigation.goBack()}
    />
  ) ;*/
  const [book, setBook] = useState<Book>({
    author: "",
    title: "",
    description: "",
  });
  const [isInvalid, setInvalid] = useState({
    author: false,
    title: false,
    description: false,
  });
  const [error, setError] = useState("");
  const [isSaveError, setIsSaveError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const checkFilled = () => {
    if (book.author === "") {
      setInvalid({ ...isInvalid, author: true });
      setError("Author is required ");
    } else if (book.title === "") {
      setInvalid({ ...isInvalid, title: true });
      setError("Title is required ");
    } else if (book.description === "") {
      setInvalid({ ...isInvalid, description: true });
      setError("Description is required ");
    } else {
      setInvalid({
        author: false,
        title: false,
        description: false,
      });
      setDisabled(false);
    }
  };
  useEffect(() => {}, [book, isInvalid, error]);
  const saveBook = async () => {
    await dispatch(storeBook(book));
    if (books.success) {
      await  setBook({
        author: "",
        title: "",
        description: "",
      });
    } else {
      console.log(books);
    }
    // console.log(book);
  };
  return (
    <NativeBaseProvider>
      {/* <HeaderBar
        navigation={navigation}
        add={""}
        back="back"
        BackButton={BackButton}
      /> */}

      <ScrollView style={{ backgroundColor: "#fefefe", padding: 10 }}>
        <AddBookForm
          book={book}
          setBook={setBook}
          error={error}
          isInvalid={isInvalid}
          success={success}
          isSaveError={isSaveError}
          saveBook={saveBook}
          isDisabled={isDisabled}
          checkFilled={checkFilled}
          authors={authors}
        />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default AddBook;
