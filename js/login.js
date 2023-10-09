import { handleGotoCart } from "./checkLogin.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const API_URL = "http://localhost:3000/users";

const username = $("#username");
const password = $("#password");
const btnLogin = $("#btn-login");

const LoginApi = async (username, password) => {
  const listAccounts = await fetch(API_URL).then((res) => res.json());
  for (let i = 0; i < listAccounts.length; i++) {
    if (
      (listAccounts[i].email === username ||
        listAccounts[i].username === username) &&
      listAccounts[i].password === password
    ) {
      localStorage.setItem("user", JSON.stringify(listAccounts[i]));
      window.location.href = "/";
      break;
    }
  }
  if (!localStorage.getItem("user")) {
    alert("Thông tin đăng nhập sai!");
  }
};

const handleLogin = () => {
  btnLogin.onclick = (e) => {
    e.preventDefault();
    LoginApi(username.value, password.value);
  };
};

const start = () => {
  handleLogin();
  handleGotoCart();
};

start();
