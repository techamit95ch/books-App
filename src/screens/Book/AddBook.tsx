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
  useEffect(() => {}, [books]);
  const [searchAuthor, results, authors, filterAuthor, setFilterAuthor] =
    UseBooks();

  const [book, setBook] = useState<Book>({
    author: "",
    title: "",
    description: "",
    rating: 0,
  });
  const [isInvalid, setInvalid] = useState({
    author: false,
    title: false,
    description: false,
  });
  const [error, setError] = useState("");
  const [isSaveError, setIsSaveError] = useState(false);
  const [success, setSuccess] = useState(0);
  const [isDisabled, setDisabled] = useState(true);
  const checkFilled = () => {
    if (book.author === "") {
      setInvalid({ author: true, title: false, description: false });
      setError("Author is required ");
    } else if (book.title === "") {
      setInvalid({ author: false, title: true, description: false });
      setError("Title is required ");
    } else if (book.description === "") {
      setInvalid({ author: false, title: false, description: true });
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
  useEffect(() => {}, [book, isInvalid, error, success, dispatch]);
  const saveBook = () => {
    setSuccess(2);
    setDisabled(true);
    console.log(book);
    dispatch(storeBook(book));
    if (books.success) {
      setSuccess(1);
      navigation.navigate("Books");
      setBook({
        author: "",
        title: "",
        description: "",
        rating: 0,
      });
    } else {
      setSuccess(3);

      console.log(books);
    }
  };
  return (
    <NativeBaseProvider>
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
