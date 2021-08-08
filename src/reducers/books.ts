import { Book, Books } from "../interfaces";
import {
  CREATE_BOOK,
  GET_BOOKS,
  BOOK_ERROR_MESSAGE,
  BOOK_ERRORS,
} from "../constraints";
export default (
  books: Books = {
    books: [],
    errors: null,
    errorMessage: "",
    success: false,
    uid: "",
    isError: false
  },
  action: any
) => {
  switch (action.type) {
    case GET_BOOKS:
      books.books = action.payload.books;
      return books;
    case CREATE_BOOK:
      books.uid = action.payload.uid;
      books.books.push(action.payload.book);
      books.success = action.payload.success;
      books.isError = action.payload.isError;
      books.errorMessage = action.payload.errorMessage;
      return books;
    case BOOK_ERROR_MESSAGE:

      books.isError = action.payload.isError;
      books.errorMessage = action.payload.errorMessage;
      return books;
    case BOOK_ERRORS:
      books.isError = action.payload.isError;
      books.errors = action.payload.errors;
      return books;
    default:
      return books;
  }
};
