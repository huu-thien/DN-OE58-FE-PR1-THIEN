import {
  handleCheckLogin,
  handleLogout,
  handleGotoCart,
} from "./checkLogin.js";
import handleAddToCart from "./addToCart.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const productDetailBlock = $("#product-detail-block");
const productRelatedBlock = $("#related--product");

const API_PRODUCTS_URL = `http://localhost:3000/products`;

const renderDetailProduct = (procductDetail) => {
  const htmls = procductDetail.map((product) => {
    return `
    <div class="flex flex-col md:flex-row items-center">
    <div class="max-w-[100px] py-5 border hidden md:flex flex-col">
      <img src="../assets/images/products/1.jpg" alt="products" />
      <img src="../assets/images/products/2.jpg" alt="products" />
      <img src="../assets/images/products/3.jpg" alt="products" />
      <img src="../assets/images/products/4.jpg" alt="products" />
      <img src="../assets/images/products/5.jpg" alt="products" />
    </div>
    <div class="w-full h-full border py-12">
      <img src="${product.image}" alt="products" />
    </div>
    <div class="px-6">
      <div class="pb-4">
        <h2 class="uppercase text-2xl pb-2">${product.name}</h2>
        <img
          src="../assets/images/decorate/titleleft-dark.png"
          alt="titleleft"
        />
        <p class="text-4xl pt-4 text-red-500 font-thin">${product.price} đ</p>
      </div>
      <div class="border-b-2 border-t-2 py-2">
        <span>
          <i class="fa-solid fa-star text-[#feb207]"></i>
          <i class="fa-solid fa-star text-[#feb207]"></i>
          <i class="fa-solid fa-star text-[#feb207]"></i>
          <i class="fa-solid fa-star text-[#feb207]"></i>
          <i class="fa-solid fa-star"></i>
        </span>
        <span class="text-gray-500">| Review(5) | Add your review</span>
      </div>
      <div class="py-3">
        <p class="uppercase text-xl">Màu sắc</p>
        <div class="flex gap-2 py-1">
          <div
            class="w-7 h-7 m-1 hover:border-2 cursor-pointer bg-[#feb207]"
          ></div>
          <div
            class="w-7 h-7 m-1 hover:border-2 cursor-pointer bg-black"
          ></div>
          <div
            class="w-7 h-7 m-1 hover:border-2 cursor-pointer bg-red-600"
          ></div>
        </div>
      </div>
      <div>
        <p class="uppercase text-xl pb-1">Kích cỡ</p>
        <select
          class="border rounded-md py-1 px-4 min-w-[150px]"
          name="select-size"
          id="select-size"
        >
          <option value="sm">SM</option>
          <option value="md">MD</option>
          <option value="lg">LG</option>
        </select>
      </div>
      <div class="py-4">
        <p class="uppercase text-xl pb-2">Số Lượng</p>
        <span>
          <button class="bg-gray-200 px-3">-</button>
          <input
            class="max-w-[60px] text-center border"
            type="text"
            value="1"
          />
          <button class="bg-gray-200 px-3">+</button>
        </span>
        <button
        data-product-id="${product.id}"
        data-product-name="${product.name}"
        data-product-price="${product.price}"
        data-product-image="${product.image}"
          class="btn-add-to-cart bg-black text-white py-[2px] rounded-sm ml-3 px-4 text-sm focus:ring-4 focus:ring-blue-200"
        >
          Add to cart
        </button>
      </div>
      <div class="py-2">
        <span class="text-sm">
          <i class="fa-solid fa-heart text-[#f40177]"></i>
          Yêu thích
        </span>
        <span class="pl-3 text-sm">
          <i class="fa-solid fa-code-compare text-[#0a5a99]"></i>
          So Sánh
        </span>
        <span class="pl-3 text-sm">
          <i class="fa-solid fa-envelope text-[#ffd33b]"></i>
          Email
        </span>
      </div>
      <div class="py-2">
        <p class="uppercase text-xl pb-2">Mô tả</p>
        <p class="font-thin text-gray-400 min-w-full">
        ${product.description}
        </p>
      </div>
      <div class="">
        <p class="py-3 text-cyan-700 text-xl uppercase">Follow us</p>
        <div class="flex justify-center xl:justify-start gap-4">
          <i
            class="fa-brands fa-square-facebook text-xl text-[#0035bb]"
          ></i>
          <i class="fa-brands fa-instagram text-xl text-[#f30395]"></i>
          <i class="fa-brands fa-twitter text-xl text-[#1c9cea]"></i>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  productDetailBlock.innerHTML = htmls.join("\n");

  // Add event listener cho sự kiện add to cart
  const buttonAddToCart = $$(".btn-add-to-cart");
  buttonAddToCart.forEach((button) => {
    button.addEventListener("click", () => {
      if (localStorage.getItem("user")) {
        const name = button.getAttribute("data-product-name");
        const id = button.getAttribute("data-product-id");
        const price = button.getAttribute("data-product-price");
        const image = button.getAttribute("data-product-image");
        handleAddToCart(id, name, image, price);
      } else {
        alert("Bạn cần đăng nhập để quản lý giỏ hàng của mình !!");
      }
    });
  });
};

const getDetailProduct = () => {
  const productDetail = JSON.parse(localStorage.getItem("productDetail"));
  renderDetailProduct(productDetail);
};

const renderRelatedProduct = (productRelated) => {
  const htmls = productRelated.map((product) => {
    return `
      <div class="text-center flex flex-col shadow-md py-4 rounded-md">
      <img
        class="w-[200px] mx-auto"
        src="${product.image}"
        alt=""
      />
      <h4 class="py-3 uppercase">${product.name}</h4>
      <div class="py-4">
        <span class="text-[#f25e23] pr-2">${product.price} đ</span>
        <span class="line-through text-gray-600">${product.originalPrice} đ</span>
      </div>
      <button
        data-product-id="${product.id}"
        data-product-name="${product.name}"
        data-product-price="${product.price}"
        data-product-image="${product.image}"
        id="btn-add-to-cart"
        type="button"
        class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-thin rounded-lg text-sm px-5 py-2.5 mx-12 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Add to cart
      </button>
    </div>
    `;
  });
  productRelatedBlock.innerHTML = htmls.join("\n");

  // Add event listener cho sự kiện add to cart
  const buttonAddToCart = $$("#btn-add-to-cart");
  buttonAddToCart.forEach((button) => {
    button.addEventListener("click", () => {
      if (localStorage.getItem("user")) {
        const name = button.getAttribute("data-product-name");
        const id = button.getAttribute("data-product-id");
        const price = button.getAttribute("data-product-price");
        const image = button.getAttribute("data-product-image");
        handleAddToCart(id, name, image, price);
      } else {
        alert("Bạn cần đăng nhập để quản lý giỏ hàng của mình !!");
      }
    });
  });
};

const getRelatedProduct = async () => {
  const IdCategoryProductDetail = JSON.parse(
    localStorage.getItem("productDetail")
  )[0].categoryId;
  const productList = await fetch(API_PRODUCTS_URL).then((res) => res.json());
  const productsRelated = productList.filter(
    (product) => Number(product.categoryId) === Number(IdCategoryProductDetail)
  );
  renderRelatedProduct(productsRelated);
};

const start = () => {
  handleCheckLogin();
  handleLogout();
  handleGotoCart();
  getDetailProduct();
  getRelatedProduct();
};

start();
