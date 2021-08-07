import firebase from "../config/credential";
import "firebase/firestore";
import "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { User } from "../interfaces";
import {
  CREATE_USER,
  GET_USER,
  USER_ERROR_MESSAGE,
  USER_ERRORS,
  USER_AUTHENTICATION,
} from "../constraints";
export const storeUser = (user: User) => async (dispatch: any) => {
  try {
    // console.log(user);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(String(user.email), String(user.password))
      .then(async (result) => {
        const db = firebase.firestore();
        await db
          .collection("users")
          .add({
            ...user,
            uid: result?.user?.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((res) => {
            dispatch({
              type: CREATE_USER,
              payload: {
                uid: result?.user?.uid,
                id: res?.id,
                success: true,
                isAuthenticated: true,
              },
            });
            console.log(res.id);
          })
          .catch((e) => {
            // console.log(e.message);
            dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage: e.message,
              },
            });
          });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            // console.log(`Email address ${user.email} already in use.`);
            dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage: `Email address ${user.email} already in use.`,
              },
            });
            break;
          case "auth/invalid-email":
            console.log(`Email address ${user.email} is invalid.`);
            dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage: `Email address ${user.email} is invalid.`,
              },
            });
            break;
          case "auth/operation-not-allowed":
            console.log(`Error during sign up.`);
            dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage: `Error during sign up.`,
              },
            });
            break;
          case "auth/weak-password":
            console.log(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );
            dispatch({
              type: USER_ERROR_MESSAGE,
              payload: {
                errorMessage:
                  "Password is not strong enough. Add additional characters including special characters and numbers.",
              },
            });
            break;
          default:
            console.log(error.message);
            dispatch({
              type: USER_ERRORS,
              payload: {
                error: error.message,
              },
            });
            break;
        }
      });
  } catch (error: any) {
    console.error(error);
    dispatch({
      type: USER_ERROR_MESSAGE,
      payload: {
        errorMessage: error.message,
      },
    });
  }
};
export const Login = (user: User) => async (dispatch: any) => {};
export const isAuthenticated = () => async (dispatch: any) => {
  try {
    const email = await SecureStore.getItemAsync("email");
    const password = await SecureStore.getItemAsync("password");
    const uid = await SecureStore.getItemAsync("uid");
    const id = await SecureStore.getItemAsync("id");
    // console.log(email, password, uid, id);
    if (!email || !password || !uid || !id) {
      dispatch({
        type: USER_AUTHENTICATION,
        payload: {
          isAuthenticated: false,
        },
      });
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
          //  console.log(success);
          dispatch({
            type: USER_AUTHENTICATION,
            payload: {
              isAuthenticated: true,
            },
          });
        })
        .catch((error: any) => {
          dispatch({
            type: USER_ERROR_MESSAGE,
            payload: {
              errorMessage: error.message,
            },
          });
        });
    }
  } catch (e: any) {
    dispatch({
      type: USER_ERROR_MESSAGE,
      payload: {
        errorMessage: e.message,
      },
    });
  }
};
