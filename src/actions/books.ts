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
  UPDATE_RATING,
  DELETE_BOOK
} from "../constraints";
import books from "../reducers/books";
export const storeBook = (book: Book) => async (dispatch: any) => {
  try {
    const db = firebase.firestore();
    const uid = await SecureStore.getItemAsync("uid");
    const id = Date.now();
    await db
      .collection("books")
      .add({
        ...book,
        uid: uid,
        // id: id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        dispatch({
          type: CREATE_BOOK,
          payload: {
            uid: uid,
            // id: id,
            success: true,
            book: {
              ...book,
              uid: uid,
              id: res?.id,
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

export const getBooksUid = () => async (dispatch: any) => {
  try {
    const db = firebase.firestore();
    const uid = await SecureStore.getItemAsync("uid");
    const BookRef = db.collection("books");
    const query = await BookRef.where("uid", "==", uid);
    query
      .get()
      .then((res) => {})
      .catch((err: any) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
};

export const getAll = () => async (dispatch: any) => {
  try {
    let books: firebase.firestore.DocumentData[] = [];
    const db = firebase.firestore();
    const uid = await SecureStore.getItemAsync("uid");
    const BookRef = db.collection("books");
    const query = BookRef.where("uid", "==", uid);
    // await BookRef.orderBy("id", "desc").get().then((res) => {
    // await BookRef.get().then((res) => {
    query
      .get()
      .then((res) => {
        //  console.log(typeof res );

        res.forEach(function (doc) {
          console.log(doc.id);

          books.push({
            id: doc.id,
            uid: doc.data().uid,
            author: doc.data().author,
            title: doc.data().title,
            rating: doc.data().rating,
            description: doc.data().description,
          });
          // books.push(doc.data());
        });
        dispatch({
          type: GET_BOOKS,
          payload: {
            books: books,
          },
        });
      })
      .catch((err: any) => {
        dispatch({
          type: BOOK_ERROR_MESSAGE,
          payload: {
            isError: true,
            errorMessage: err.message,
          },
        });
        console.log(err);
      });
  } catch (e:any) {
    dispatch({
      type: BOOK_ERROR_MESSAGE,
      payload: {
        isError: true,
        errorMessage: e.message,
      },
    });
    console.log(e);
  }
};
export const updateRating = (id, rating) => async (dispatch: any) => {
  try {
    const db = firebase.firestore();
    const BookRef = db.collection("books");
    const query = await BookRef.doc(id)
      .set({ rating: rating })
      .then((res) => {
        dispatch({
          type: UPDATE_RATING,
          payload: {
            id : id,
            rating: rating,
            success:true
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: BOOK_ERROR_MESSAGE,
          payload: {
            isError: true,
            errorMessage: err.message,
          },
        });
      });
  } catch (e: any) {
    dispatch({
      type: BOOK_ERROR_MESSAGE,
      payload: {
        isError: true,
        errorMessage: e.message,
      },
    });
  }
};
export const deleteBook = (id) => async (dispatch: any) => {
  try{
    const db = firebase.firestore();
    const BookRef = db.collection("books");
    const query = await BookRef.doc(id).delete().then((res)=>{
  
    }).catch((err) =>{
      dispatch({
        type: BOOK_ERROR_MESSAGE,
        payload: {
          isError: true,
          errorMessage: err.message,
        },
      });
    });
  }catch(e: any){
    dispatch({
      type: BOOK_ERROR_MESSAGE,
      payload: {
        isError: true,
        errorMessage: e.message,
      },
    });
  }
  
};
