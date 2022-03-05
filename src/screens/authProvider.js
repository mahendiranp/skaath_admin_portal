import { auth } from "../config/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    let user = await signInWithEmailAndPassword(auth, username, password);
    if (user && user.user && user.user.email) {
      localStorage.setItem("username", user);
      return Promise.resolve();
    }
    // localStorage.setItem("username", username);
    // // accept all username/password combinations
    // return Promise.resolve();
  },
  getUsers: async () => {},
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
