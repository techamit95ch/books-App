import { Book, Books } from "../interfaces";
import {
  CREATE_BOOK,
  GET_BOOKS,
  BOOK_ERROR_MESSAGE,
  BOOK_ERRORS,
  UPDATE_RATING,
  DELETE_BOOK
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
      books?.books?.push(action.payload?.book);
      books.success = action.payload.success;
      books.isError = action.payload.isError;
      books.errorMessage = action.payload.errorMessage;
      return books;
    case UPDATE_RATING:
      books.books?.forEach((book)=>{
       if( book.id===action.payload.id){
         book.rating = action.payload.rating
       }
      });
      books.success = action.payload.success;
      return books;
      case DELETE_BOOK:
      books.books = books?.books?.filter((book) => book.id!==action.payload.id);
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
