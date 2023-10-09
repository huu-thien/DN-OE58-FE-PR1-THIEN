import {
  handleCheckLogin,
  handleLogout,
  handleGotoCart,
} from "./checkLogin.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const start = () => {
  handleCheckLogin();
  handleLogout();
  handleGotoCart();
};

start();
