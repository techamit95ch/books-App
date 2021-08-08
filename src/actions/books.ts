import firebase from "../config/credential";
import "firebase/firestore";
import "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { Book, Books } from "../interfaces";
import {
  CREATE_BOOK,
  GET_BOOKS,
  BOOK_ERROR_MESSAGE,
  BOOK_ERRORS,
} from "../constraints";
const storeBook = (book: Book) => async (dispatch: any) => {
  try {
    const db = firebase.firestore();
    const uid = await SecureStore.getItemAsync("uid");

    await db
      .collection("books")
      .add({
        ...book,
        uid: uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        dispatch({
          type: CREATE_BOOK,
          payload: {
            uid: uid,
            id: res?.id,
            success: true,
            book: {
              ...book,
              uid: uid,
              id: res?.id,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            },
            isError: false,
            errorMessage: "",
          },
        });
        console.log(res.id);
      })
      .catch((e) => {
        dispatch({
          type: BOOK_ERROR_MESSAGE,
          payload: {
            isError: true,

            errorMessage: e.message,
          },
        });
      });
  } catch (err: any) {
    dispatch({
      type: BOOK_ERROR_MESSAGE,
      payload: {
        isError: true,
        errorMessage: err.message,
      },
    });
  }
};
