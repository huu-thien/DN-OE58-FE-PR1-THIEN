import { handleGotoCart } from "./checkLogin.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const API_URL = "http://localhost:3000/users";

const fullName = $("#fullName");
const username = $("#username");
const email = $("#email");
const password = $("#password");
const confirmPassword = $("#confirmPassword");
const btnRegister = $("#btn-register");

// Handle post api register
const createUserAccount = async (fullName, username, email, password) => {
  const newAccount = {
    fullName,
    username,
    email,
    password,
    cart: [],
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAccount),
  };
  const result = await fetch(API_URL, options).then((res) => res.json());
  console.log(result);
};

const handleRegister = () => {
  btnRegister.onclick = (e) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
      alert("Mật khẩu xác nhận không trùng khớp");
    } else {
      createUserAccount(
        fullName.value,
        username.value,
        email.value,
        password.value
      );
      alert("Đăng kí tài khoản thành công");
      window.location.href = "./login.html";
    }
  };
};

const start = () => {
  handleGotoCart();
  handleRegister();
};

start();
