import { handleCheckLogin, handleLogout } from "./checkLogin.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const API_CART_URL = "http://localhost:3000/users";
const IdUserLogin = JSON.parse(localStorage.getItem("user")).id;

const cartblock = $("#cart-list");

const renderCart = (listCart) => {
  const htmls = listCart.map((cart) => {
    return `
      <tr class="bg-white border-b">
      <td class="px-6 py-4">
        <img
          class="w-[100px]"
          src="${cart.image}"
          alt=""
        />
      </td>
      <td
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
      >
        ${cart.name}
      </td>
      <td class="px-6 py-4 text-[#feb207]">${cart.price}</td>
      <td class="px-6 py-4">${cart.quantity}</td>
      <td class="px-6 py-4 text-[#feb207]">${Number(
        cart.quantity * cart.price
      )}</td>
      <td class="px-6 py-4">
        <p
          data-cart-id="${cart.id}"
          class="btn-delete-cart font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
        >
          <span class="p-3 hover:bg-gray-100 rounded-full"
            ><i class="fa-solid fa-trash"></i
          ></span>
        </p>
      </td>
    </tr>
    `;
  });
  cartblock.innerHTML = htmls.join("\n");

  // Add event click cho button delete
  const buttonDeleteCart = $$(".btn-delete-cart");
  buttonDeleteCart.forEach((button) => {
    button.addEventListener("click", () => {
      const idCart = button.getAttribute("data-cart-id");
      handleDeleteCart(IdUserLogin, idCart);
    });
  });
};

const getCart = async () => {
  const data = await fetch(API_CART_URL).then((res) => res.json());
  const DataUserLogin = data.find(
    (user) => Number(user.id) === Number(IdUserLogin)
  );
  // console.log(DataUserLogin);
  renderCart(DataUserLogin.cart);
};
const handleDeleteCart = async (IdUserLogin, idCart) => {
  // Lấy thông tin người dùng từ local storage
  const userData = JSON.parse(localStorage.getItem("user"));
  // Tìm sản phẩm cần xóa trong giỏ hàng
  const updateCart = userData.cart.filter((product) => product.id !== idCart);
  // Cập nhật lại giỏ hàng ở db
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData, cart: updateCart }),
  };
  const resultUpdate = await fetch(
    `${API_CART_URL}/${IdUserLogin}`,
    options
  ).then((res) => res.json());
  // Cập nhật giỏ hàng trog localstorage
  localStorage.setItem("user", JSON.stringify(resultUpdate));
  // render lại giỏ hàng
  renderCart(JSON.parse(localStorage.getItem("user")).cart);
};

const start = () => {
  handleCheckLogin();
  handleLogout();
  getCart();
};

start();
