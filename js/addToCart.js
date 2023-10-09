const API_USER_URL = "http://localhost:3000/users";

const saveCart = async (dataUser) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUser),
  };
  const result = await fetch(`${API_USER_URL}/${dataUser.id}`, options).then(
    (res) => res.json()
  );
};

const handleAddToCart = (id, name, image, price, quantity) => {
  const dataUser = JSON.parse(localStorage.getItem("user"));
  const productAdd = { id, name, image, price, quantity };
  if (dataUser.cart.length === 0) {
    dataUser.cart.push(productAdd);
    console.log("them moi vi rong");
  } else {
    let indexDuplicate;
    const duplicate = dataUser.cart.find((product, index) => {
      indexDuplicate = index;
      return Number(product.id) === Number(productAdd.id);
    });
    if (duplicate) {
      dataUser.cart[indexDuplicate].quantity += quantity;
    } else {
      dataUser.cart.push(productAdd);
    }
  }
  console.log('them');
  saveCart(dataUser);
  localStorage.setItem("user", JSON.stringify(dataUser))  ;
};

export default handleAddToCart;
