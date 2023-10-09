import {
  handleCheckLogin,
  handleLogout,
  handleGotoCart,
} from "./checkLogin.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const API_BLOG_URL = "http://localhost:3000/blogs";

const sectionBlogs = $("#section-blogs");

const renderBlog = (listBlogs) => {
  const htmls = listBlogs.map((blog) => {
    console.log(blog.image);
    return `
    <div class="flex flex-col items-center p-3 shadow-md rounded-md">
          <img
            class="w-[400px] h-[230px] object-cover"
            src="${blog.image}"
            alt="blog1"
          />
          <h4 class="uppercase py-2 font-bold text-[#f25e23] text-center">
            ${blog.title}
          </h4>
          <p class="py-4 text-gray-400 font-thin text-sm">
            Đăng bởi Thien Nguyen | 12/10/2023 | 102 bình luận
          </p>
          <p class="max-w-[400px] text-center text-gray-500 font-thin">
            ${blog.description}
          </p>
          <a
            class="my-3 bg-[#1f2937] text-white py-2 text-center rounded-md w-[80%] font-thin"
            href="#"
            >Read more</a
          >
        </div>
    `;
  });
  sectionBlogs.innerHTML = htmls.join('\n')
};

const getAllBlogs = async () => {
  const listBlogs = await fetch(API_BLOG_URL).then((res) => res.json());
  renderBlog(listBlogs);
};

const start = () => {
  handleCheckLogin();
  handleLogout();
  handleGotoCart();

  getAllBlogs();
};

start();
