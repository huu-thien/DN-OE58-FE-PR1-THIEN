import { handleCheckLogin, handleLogout } from "./checkLogin.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const productBlock = $("#product-checkout-block");
const productMoney = $("#product-money");
const totalMoney = $("#total-money");

const email = $("#email");
const cardHolders = $("#card-holder");
const cardDescriptors = $("#card-desc");
const address = $("#address");
const buttonPayment = $(".btn-payment");

const listProductCheckout = JSON.parse(localStorage.getItem("user")).cart;
const IdUserLogin = JSON.parse(localStorage.getItem("user")).id;


const API_CART_URL = "http://localhost:3000/users";
const API_ORDERS_URL = "http://localhost:3000/orders";

const getCurrentDateTime = () => {
  const currentDate = new Date();
  const day = currentDate.getDate(); //
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const getTotalPayment = (listProductCheckout) => {
  const totalPayment = listProductCheckout.reduce(
    (totalMoney, currentProduct, index) => {
      const payment = currentProduct.price * currentProduct.quantity;
      return (totalMoney += payment);
    },
    0
  );
  return totalPayment;
};

const renderProductCheckout = (listProductCheckout) => {
  const htmls = listProductCheckout.map((product) => {
    return `
      <div class="flex flex-col rounded-lg bg-white sm:flex-row">
      <img
        class="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src="${product.image}"
        alt=""
      />
      <div class="flex w-full flex-col px-4 py-4">
        <span class="text-cyan-700 font-semibold text-lg">${product.name}</span>
        <p class="text-sm font-thin text-gray-500 py-2">Số lượng: ${
          product.quantity
        }</p>
        <p class="text-lg font-thin text-red-500">${Number(
          product.price * product.quantity
        )} đ</p>
      </div>
    </div>
    `;
  });
  productBlock.innerHTML = htmls.join("\n");
};
const renderTotalPayment = (listProductCheckout) => {
  const totalPayment = getTotalPayment(listProductCheckout);
  productMoney.innerText = `${totalPayment} đ`;
  totalMoney.innerText = `${Number(totalPayment + 20000)} đ`;
};

const getProductCheckout = () => {
  renderProductCheckout(listProductCheckout);
  renderTotalPayment(listProductCheckout);
};
// Khi thanh toán thành công thì xóa toàn bộ giỏ hàng
const handleDeleteAllCart = async (IdUserLogin) => {
  // Lấy thông tin người dùng từ local storage
  const userData = JSON.parse(localStorage.getItem("user"));
  // Cập nhật lại giỏ hàng rỗng ở db
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData, cart: [] }),
  };
  const resultUpdate = await fetch(
    `${API_CART_URL}/${IdUserLogin}`,
    options
  ).then((res) => res.json());
  // Cập nhật giỏ hàng trog localstorage
  localStorage.setItem("user", JSON.stringify(resultUpdate));
};

// handle Checkout and save to server
const createOrders = async (email, cardHolders, cardDescriptors, address) => {
  // Lấy thông tin ID người dùng từ local storage
  const userDataID = JSON.parse(localStorage.getItem("user")).id;
  // Tạo mới 1 orders gắn với userID đang login
  const newOrder = {
    userId: userDataID,
    email,
    cardHolders,
    cardDescriptors,
    address,
    createdAt: getCurrentDateTime(),
    wareHouse: "Da Nang",
    totalMoney: Number(getTotalPayment(listProductCheckout) + 20000),
  };

  //Tạo mới  1 orders gắn với userID đang login trên server
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  };
  const orderCreated = await fetch(API_ORDERS_URL, options).then((res) =>
    res.json()
  );
  // Xóa tất cả sản phẩm trong giỏ hàng
  handleDeleteAllCart(IdUserLogin)
  // Chuyển hướng người dùng sao trang done~~
  alert("Bạn đã thanh toán thành công !!" );
  window.location.href = "./checkout-done.html";
};

const handleCheckout = () => {
  buttonPayment.addEventListener("click", () => {
    createOrders(
      email.value,
      cardHolders.value,
      cardDescriptors.value,
      address.value
    );
  });
};

const start = () => {
  handleCheckLogin();
  handleLogout();
  getProductCheckout();
  handleCheckout();
};
start();
