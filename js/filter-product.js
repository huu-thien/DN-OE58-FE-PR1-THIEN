import {
  handleCheckLogin,
  handleLogout,
  handleGotoCart,
} from "./checkLogin.js";
import handleAddToCart from "./addToCart.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const API_CATEGORIES_URL = "http://localhost:3000/categories";
const API_PRODUCTS_URL = "http://localhost:3000/products";

const categoryBlock = $("#category-block");
const productBlock = $("#product-block");

const btnDisplayGrid = $("#display--grid");
const btnDisplayList = $("#display--list");

const countProductByCategory = (products) => {
  const productCounts = {};
  products.forEach((product) => {
    const categoryId = product.categoryId;
    // Kiểm tra xem category này đã được thêm vào đối tượng productCounts chưa
    if (productCounts[categoryId]) {
      // Nếu đã tồn tại, tăng giá trị lên 1
      productCounts[categoryId]++;
    } else {
      // Nếu chưa tồn tại, tạo mới với giá trị là 1
      productCounts[categoryId] = 1;
    }
  });
  return productCounts;
};

const renderCategory = (categories, products) => {
  const objCount = countProductByCategory(products);
  const listID = Object.keys(objCount);
  const htmls = categories.map((category) => {
    const IdCategory = listID.filter((item) => category.id === Number(item));
    return `
    <li 
      id="filter-product"
      data-category-id="${category.id}"
      class="py-1 cursor-pointer hover:text-[#feb207] hover:list-disc duration-200 transition-all font-thin"
    >
      <span>${category.name}</span>
      <span>(${objCount[IdCategory]})</span>
    </li>
    `;
  });
  categoryBlock.innerHTML = htmls.join("\n");

  // Add event listener cho sự kiện filter
  const buttonFilter = $$("#filter-product");
  buttonFilter.forEach((button) => {
    button.addEventListener("click", () => {
      const categoryId = button.getAttribute("data-category-id");
      handleFilterProduct(categoryId);
      // Xóa class của tất cả button khác
      buttonFilter.forEach((btn) => {
        btn.classList.remove("text-[#feb207]");
      });
      // thêm class đổi màu cho button được click
      button.classList.add("text-[#feb207]");
    });
  });
};

const handleDetailProduct = async (idProductDetail) => {
  const listProduct = await fetch(API_PRODUCTS_URL).then((res) => res.json());
  const productDetail = listProduct.filter(
    (product) => Number(product.id) === Number(idProductDetail)
  );
  localStorage.setItem("productDetail", JSON.stringify(productDetail));
  window.location.href = "./detail-product.html";
};

const renderProductsGrid = (products) => {
  const htmls = products.map((product) => {
    return `
    <div class="text-center flex flex-col shadow-md py-4 rounded-md">
      <img
        class="w-[200px] mx-auto"
        src="${product.image}"
        alt=""
      />
      <h4 
        data-product-id="${product.id}"
        class="btn-procduct-deltail py-3 uppercase cursor-pointer hover:text-[#feb207]">${product.name}</h4>
      <div class="py-4">
        <span class="text-[#f25e23] pr-2">${product.price}đ</span>
        <span class="line-through text-gray-600">${product.originalPrice}đ</span>
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
  productBlock.innerHTML = htmls.join("\n");

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
  // Add event listener cho sự kiện xem chi tiết
  const buttonDetail = $$(".btn-procduct-deltail");
  buttonDetail.forEach((button) => {
    button.addEventListener("click", () => {
      const idProductDetail = button.getAttribute("data-product-id");
      handleDetailProduct(idProductDetail);
    });
  });
};
const renderProductsList = (products) => {
  const htmls = products.map((product) => {
    return `
    <div class="flex flex-col md:flex-row shadow-md py-4 rounded-md">
              <img
                class="w-[200px]"
                src="${product.image}"
                alt=""
              />
              <div class="p-6">
                <h4 
                  data-product-id="${product.id}"
                  class="btn-procduct-deltail uppercase text-xl cursor-pointer">${product.name}</h4>
                <div class="py-2">
                  <p class="text-3xl text-[#f25e23] py-3">${product.price} đ</p>
                  <p class="pb-2 text-gray-500 font-thin">
                    ${product.description}
                  </p>
                </div>
                <div class="flex items-center gap-2 md:gap-6">
                  <button
                    id="btn-add-to-cart"
                    data-product-id="${product.id}"
                    data-product-name="${product.name}"
                    data-product-price="${product.price}"
                    data-product-image="${product.image}"
                    type="button"
                    class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 float-left"
                  >
                    Add to cart
                  </button>
                  <span class="text-sm text-gray-500">
                    <i class="fa-solid fa-heart text-[#f40177]"></i>
                    Yêu thích
                  </span>
                  <span class="pl-3 text-sm text-gray-500">
                    <i class="fa-solid fa-code-compare text-[#0a5a99]"></i>
                    So Sánh
                  </span>
                </div>
              </div>
            </div>
    `;
  });
  productBlock.innerHTML = htmls.join("\n");

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
  // Add event listener cho sự kiện xem chi tiết
  const buttonDetail = $$(".btn-procduct-deltail");
  buttonDetail.forEach((button) => {
    button.addEventListener("click", () => {
      const idProductDetail = button.getAttribute("data-product-id");
      handleDetailProduct(idProductDetail);
    });
  });
};

const getAllCategories = async () => {
  const categories = await fetch(API_CATEGORIES_URL).then((res) => res.json());
  const products = await fetch(API_PRODUCTS_URL).then((res) => res.json());
  renderCategory(categories, products);
};

const getAllProducts = async () => {
  const products = await fetch(API_PRODUCTS_URL).then((res) => res.json());
  renderProductsGrid(products);
};
const handleFilterProduct = async (categoryId) => {
  const listProductFilter = await fetch(
    `${API_PRODUCTS_URL}?categoryId=${categoryId}`
  ).then((res) => res.json());
  if(productBlock.getAttribute("class") === 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 mt-12') {
    renderProductsGrid(listProductFilter);
  } else {
    renderProductsList(listProductFilter);

  }
};
const handleChangeDisplayProduct = async () => {
  const products = await fetch(API_PRODUCTS_URL).then((res) => res.json());
  btnDisplayGrid.addEventListener("click", () => {
    btnDisplayGrid.classList.add("text-[#feb207]")
    btnDisplayList.classList.remove('text-[#feb207]')
    productBlock.setAttribute(
      "class",
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 mt-12"
    );
    renderProductsGrid(products);
  });
  btnDisplayList.addEventListener("click", () => {
    btnDisplayList.classList.add("text-[#feb207]")
    btnDisplayGrid.classList.remove('text-[#feb207]')
    productBlock.setAttribute("class", "grid grid-cols-1 gap-6 mt-12");
    renderProductsList(products);
  });
};

const start = () => {
  handleCheckLogin();
  handleLogout();
  handleGotoCart();
  getAllCategories();
  getAllProducts();
  handleChangeDisplayProduct();
};
start();
