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

//

// Check validate email exist
const isEmailExist = async (username, email) => {
  const listAccount = await fetch(API_URL).then((res) => res.json());
  const emailExist = listAccount.find((account) => {
    
    return account.email === email || account.username === username
  });
  return emailExist;
};

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
};

const handleRegister = () => {
  btnRegister.onclick = async (e) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
      alert("Mật khẩu xác nhận không trùng khớp");
    } else if (!isValidEmail(email.value)) {
      alert("Email không hợp lệ");
    } else {
      const emailExist = await isEmailExist(username.value, email.value);
      if (emailExist) {
        alert("Tài khoản hoặc email đã tồn tại");
      } else {
        createUserAccount(
          fullName.value,
          username.value,
          email.value,
          password.value
        );
        alert("Đăng ký tài khoản thành công");
        window.location.href = "./login.html";
      }
    }
  };
};

// Kiểm tra tính hợp lệ của email sử dụng biểu thức chính quy
function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

const start = () => {
  handleGotoCart();
  handleRegister();
};

start();
