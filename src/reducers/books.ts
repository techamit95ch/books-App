import { Book, Books } from "../interfaces";
import {
  CREATE_USER,
  GET_USER,
  USER_ERROR_MESSAGE,
  USER_ERRORS,
  USER_AUTHENTICATION,
} from "../constraints";
export default (
  books: Books = { books: [], errors: null, errorMessage: "", success: false },
  action: any
) => {
  switch (action.type) {
    case "FETCH_ALL":
      return books.books;
    case "CREATE":
     books.books?.push(action.payload.book);
     books.success= action.payload.success;
     books.errorMessage= action.payload.errorMessage;
     return books;   
    default:
      return books;
  }
};
