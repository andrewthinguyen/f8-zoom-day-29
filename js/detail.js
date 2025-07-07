const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("Không tìm thấy sản phẩm này");
  window.location.href = "index.html";
}

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const product = JSON.parse(this.responseText);
    renderProductDetail(product);
  }
};
xhttp.open("GET", `https://dummyjson.com/products/${id}`);
xhttp.send();

function renderProductDetail(product) {
  const container = document.querySelector("#product-detail");

  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.alt = product.title;

  const productDetail = document.createElement("div");
  productDetail.classList.add("product-info");
  productDetail.innerHTML = `
  <h1>${product.title}</h1>
  <h2>Mô tả sản phẩm: ${product.description}</h2>
  <p>Chế độ bảo hành: ${product.warrantyInformation}</p>
  <p>Thời gian giao hàng: ${product.shippingInformation}</p>
  <p class="price">Giá: ${product.price}</p>
  <p>Cân nặng: ${product.weight}</p>
  `;

  container.appendChild(img);
  container.appendChild(productDetail);
}
