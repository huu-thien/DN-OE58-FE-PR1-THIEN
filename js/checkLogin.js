const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnLogin = $(".btn-login");
const btnRegister = $(".btn-register");
const btnLogout = $(".btn-logout");
const btnGotoCart = $(".btn-goto-cart");

const isLogin = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};
const handleGotoCart = () => {
  btnGotoCart.onclick = () => {
    console.log(123);
    if (!isLogin()) {
      alert("Đăng nhập để đến trang giỏ hàng !");
    } else {
      window.location.href =
        window.location.href === "http://localhost:5173/"
          ? "./views/cart.html"
          : "./cart.html";
    }
  };
};

// handle button login logout
const handleCheckLogin = () => {
  if (isLogin()) {
    btnLogin.classList.add("hidden");
    btnRegister.classList.add("hidden");
  } else {
    btnLogout.classList.add("hidden");
  }
};
// handle logout
const handleLogout = () => {
  btnLogout.onclick = (e) => {
    localStorage.removeItem("user");
  };
};

export { handleCheckLogin, handleLogout, handleGotoCart };
