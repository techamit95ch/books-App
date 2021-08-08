import { User } from "../interfaces";
import {
  CREATE_USER,
  GET_USER,
  USER_ERROR_MESSAGE,
  USER_ERRORS,
  USER_AUTHENTICATION,
} from "../constraints";
export default (
  user: User = {
    id: "",
    uid: "",
    success: false,
    errorMessage: "",
    errors: null,
    isAuthenticated: false,
  },
  action: any
) => {
  switch (action.type) {
    case CREATE_USER:
      user.success = action.payload.success;
      user.uid = action.payload.uid;
      user.id = action.payload.id;
      return user;
    case GET_USER:
      user.success = action.payload.success;
      user.uid = action.payload.uid;
      user.isAuthenticated = action.payload.isAuthenticated;
      return user;
    case USER_ERROR_MESSAGE:
      user.errorMessage = action.payload.errorMessage;
      return user;
    case USER_ERRORS:
      user.errors = action.payload.errors;
      return user;
    case USER_AUTHENTICATION:
      user.isAuthenticated = action.payload.isAuthenticated;
      return user;
    default:
      return user;
  }
};
