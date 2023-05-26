import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isLoggedIn: sessionStorage.getItem("isLoggedIn"),
  }),
  actions: {
    loginUser(formData) {
      return axios.post("https://testapi.io/api/dartya//login", formData);
    },
    addUser(formData) {
      return axios.post(
        "https://testapi.io/api/dartya/resource/users",
        formData
      );
    },
    getUsers() {
      return axios.get("https://testapi.io/api/dartya/resource/users");
    },
    isAuthenticated() {
      const loggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
      const token = sessionStorage.getItem("token");
      this.isLoggedIn = loggedIn;
      return (
        loggedIn !== null &&
        loggedIn !== undefined &&
        loggedIn !== "" &&
        loggedIn &&
        token !== null &&
        token !== ""
      );
    },
    logout() {
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("token");
      this.isLoggedIn = false;
    },
  },
});
