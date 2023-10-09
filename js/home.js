import {
  handleCheckLogin,
  handleLogout,
  handleGotoCart,
} from "./checkLogin.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const API_PRODUCT_URL = "http://localhost:3000/products";
const API_BLOG_URL = "http://localhost:3000/blogs";

const newProductBlock = $("#new-product__block");
const sellingProductBlock = $("#selling-product__block");
const blogBlock = $("#blogs-block");


const renderNewAndSellingProduct = (sectionBlock, listProducts) => {
  const htmls = listProducts.map((product) => {
    const configUrlImage = product.image.slice(1);
    return `
      <div class="text-center flex flex-col shadow-md py-4 rounded-md">
          <img
            class="w-[200px] mx-auto"
            src="${configUrlImage}"
            alt="image-product"
          />
          <h4 class="py-3 uppercase">${product.name}</h4>
          <div class="py-4">
            <span class="text-[#f25e23] pr-2">${product.price}</span>
            <span class="line-through text-gray-600">${product.originalPrice}</span>
          </div>
          <button
            id="btn-add-to-cart"
            type="button"
            class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-thin rounded-lg text-sm px-5 py-2.5 mx-12 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add to cart
          </button>
        </div>
    `;
  });
  sectionBlock.innerHTML = htmls.join("\n");
};

const renderBlogs = (blogs) => {
  const listShowBlogs = blogs.filter((blog) => blog.isShow);
  const htmls = listShowBlogs.map((blog) => {
    const configImageUrl = blog.image.slice(1);
    return `
    <div class="flex flex-col">
      <img
        class="w-[420px] h-[230px] object-cover"
        src="${configImageUrl}"
        alt="blog-img"
      />
      <h4 class="uppercase py-2 font-bold text-[#f25e23]">
        ${blog.title}
      </h4>
      <p class="py-4 text-gray-400 font-thin">
        Đăng bởi Thien Nguyen | 12/10/2023 | 102 bình luận
      </p>
      <p class="text-gray-500 font-thin">
        ${blog.description}
      </p>
      <a
        class="my-3 bg-[#1f2937] text-white py-2 text-center rounded-md w-[90%] font-thin"
        href="./views/blog.html"
        >Read more</a
      >
  </div>
    `;
  });
  blogBlock.innerHTML = htmls.join("\n");
};

const getNewAndSellingProduct = async () => {
  const listProduct = await fetch(API_PRODUCT_URL).then((res) => res.json());
  const listNewProduct = listProduct.filter((product) => product.isNew);
  const listSellingProduct = listProduct.filter((product) => product.isSelling);

  renderNewAndSellingProduct(newProductBlock, listNewProduct);
  renderNewAndSellingProduct(sellingProductBlock, listSellingProduct);
};

const getShowBlog = async () => {
  const blogs = await fetch(API_BLOG_URL).then((res) => res.json());
  renderBlogs(blogs);
};

const start = () => {
  handleCheckLogin();
  handleLogout();
  handleGotoCart();
  getNewAndSellingProduct();
  getShowBlog();
};

start();
