const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const data = JSON.parse(this.responseText);

    //Xử lý sản phẩm đưa vào html
    const productList = document.querySelector(".product-list");
    data.products.forEach((product) => {
      let averageRating = "Chưa có đánh giá nào";
      if (Array.isArray(product.reviews) && product.reviews.length > 0) {
        const totalRating = product.reviews.reduce((sum, review) => {
          return (sum += review.rating);
        }, 0);
        averageRating = (totalRating / product.reviews.length).toFixed(1);
      }
      //tạo phần tử product card và phần tử product card content

      const li = document.createElement("li");
      li.classList.add("product-card");

      const productContent = document.createElement("div");
      productContent.classList.add("product-card-content");

      //gán nội dung vào các phần tử đã tạo

      productContent.innerHTML = `<h3>${product.title}</h3>
      <span>${product.description}</span>
      <p>Giá: $${product.price}</p>
      <p>Đánh giá trung bình: ${averageRating} ⭐</p>
      `;

      const img = document.createElement("img");
      img.src = product.thumbnail;
      img.alt = product.title;

      const imgLink = document.createElement("a");
      imgLink.href = `detail.html?id=${product.id}`;
      imgLink.appendChild(img);

      const link = document.createElement("a");
      link.classList.add("custom-link");
      link.href = `detail.html?id=${product.id}`;
      link.textContent = "Xem sản phẩm này";
      // đưa img và content vào li
      li.appendChild(imgLink);
      li.appendChild(productContent);
      li.appendChild(link);
      //đưa thẻ li vào html
      productList.appendChild(li);
    });
  }
};
xhttp.open("GET", "https://dummyjson.com/products", true);
xhttp.send();
