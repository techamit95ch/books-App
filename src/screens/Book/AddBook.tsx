import React, { useState, useEffect } from 'react';

import { ScrollView, NativeBaseProvider } from 'native-base';
import AddBookForm from '../../components/Forms/AddBooks';
import { Book } from '../../interfaces';
import { storeBook } from '../../actions/books';
import { useDispatch, useSelector } from 'react-redux';
import UseBooks from '../../hooks/useBooks';

const AddBook = ({ navigation }) => {
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.results);
  
  const [error, setError] = useState('');
  const [isSaveError, setIsSaveError] = useState(false);
  const [success, setSuccess] = useState(0);
  const [isDisabled, setDisabled] = useState(true);
  const [searchAuthor, results, filterAuthor, setFilterAuthor] = UseBooks();

  const [book, setBook] = useState<Book>({
    author: '',
    title: '',
    description: '',
    rating: 0,
  });
  const [isInvalid, setInvalid] = useState({
    author: false,
    title: false,
    description: false,
  });
  const authors = useSelector((state: any) => state.authors);
  const answer = useSelector((state: any) => state.results);
  useEffect(() => {}, [
    answer,
    books,
    authors,
    book,
    isInvalid,
    error,
    success,
    dispatch,
  ]);
  // useEffect(() => {}, []);

  const checkFilled = () => {
    if (book.author === '') {
      setInvalid({ author: true, title: false, description: false });
      setError('Author is required ');
    } else if (book.title === '') {
      setInvalid({ author: false, title: true, description: false });
      setError('Title is required ');
    } else if (book.description === '') {
      setInvalid({ author: false, title: false, description: true });
      setError('Description is required ');
    } else {
      setInvalid({
        author: false,
        title: false,
        description: false,
      });
      setDisabled(false);
    }
  };
  const saveBook = () => {
    setSuccess(2);
    setDisabled(true);
    console.log(book);
    dispatch(storeBook(book));
    if (answer?.success) {
      setSuccess(1);
      navigation.navigate('Books');
      setBook({
        author: '',
        title: '',
        description: '',
        rating: 0,
      });
    } else {
      setSuccess(3);

      console.log(answer);
    }
  };
  return (
    <NativeBaseProvider>
      <ScrollView style={{ backgroundColor: '#fefefe', padding: 10 }}>
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
