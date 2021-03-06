import api from "../utils/api";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

function decodeUserAndToken(token) {
  const payload = token.split(".")[1];
  const userObj = JSON.parse(atob(payload));
  localStorage.setItem("USER", JSON.stringify(userObj));
  localStorage.setItem("token", token);
  return { user: userObj, token };
}

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.signup(formData);
    const { user, token } = decodeUserAndToken(res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        user,
        token,
      },
    });
    // dispatch(loadUser());
  } catch (err) {
    const errors = err.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
    // // window.location.reload();
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    // const res = await api.post("/auth", body);
    const res = await api.login(email, password);

    const { user, token } = decodeUserAndToken(res.data.token);

    // dispatch({
    //   type: USER_LOADED,
    //   payload: res.data,
    // });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user,
        token,
      },
    });

    // dispatch(loadUser());
  } catch (err) {
    const errors = err.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
    // window.location.reload();
  }
};

// Logout
export const logout = (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("USER");
  dispatch({ type: LOGOUT });
};
