import { handleCheckLogin, handleLogout } from "./checkLogin.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ordersBlock = $("#orders-block");
const statusAllOrder = $('.all-orders')

const API_ORDERS_URL = "http://localhost:3000/orders";
const IdUserLogin = JSON.parse(localStorage.getItem("user")).id;

const renderOrders = (listOrders) => {
  const htmls = listOrders.map((order) => {
    return `
      <tr class="bg-white border-b">
        <td class="px-6 py-4">${order.id}</td>
        <td
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
        >
          ${order.createdAt}
        </td>
        <td class="px-6 py-4 text-[#feb207]">${order.wareHouse}</td>
        <td class="px-6 py-4 text-[#feb207]">${order.totalMoney}</td>
        <td class="px-6 py-4 text-[#feb207]">${order.cardHolders}</td>
        <td class="px-6 py-4 text-[#feb207]">${order.cardDescriptors}</td>
        <td class="px-6 py-4 underline">Chi tiết</td>
    </tr>
    `;
  });
  ordersBlock.innerHTML = htmls.join("\n");
  statusAllOrder.textContent = `Trạng thái tất cả (${listOrders.length})`
};

const getAllOrders = async () => {
  const listOrders = await fetch(API_ORDERS_URL).then((res) => res.json());
  const allOrdersOfCurrentUser = listOrders.filter(
    (order) => order.userId === IdUserLogin
  );
  renderOrders(allOrdersOfCurrentUser);
};

const start = () => {
  handleCheckLogin();
  handleLogout();
  getAllOrders();
};

start();
