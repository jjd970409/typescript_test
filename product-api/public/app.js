// 상품 등록 함수
async function addProduct() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  if (!name || !price) {
    alert("상품 이름과 가격은 필수입니다.");
    return;
  }

  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      price: parseFloat(price),
    }),
  });

  if (response.ok) {
    alert("상품 등록 성공!");
    clearTextbox();
    getProducts();  // 등록 후 목록을 새로 고침
  } else {
    alert("상품 등록 실패!");
  }
}

async function clearTextbox(){
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
}

// 상품 목록 가져오기 함수
async function getProducts() {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();

    if (!Array.isArray(products)) {
      throw new Error("서버 응답이 배열이 아닙니다.");
    }

    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // 기존 목록 초기화

    products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `상품명: ${product.name}, 가격: ${product.price} `;

      // 삭제 버튼 생성
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.style.marginLeft = "10px";

      // 버튼 클릭 시 삭제 API 호출
      deleteBtn.addEventListener("click", async () => {
        const confirmed = confirm(`정말로 "${product.name}"을 삭제하시겠습니까?`);
        if (!confirmed) return;

        try {
          const res = await fetch(`/api/products/${product.id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            alert("삭제 성공");
            getProducts(); // 목록 새로고침
          } else {
            alert("삭제 실패");
          }
        } catch (err) {
          console.error("삭제 중 오류:", err);
          alert("삭제 중 오류 발생");
        }
      });

      li.appendChild(deleteBtn);
      productList.appendChild(li);
    });
  } catch (error) {
    console.error("상품 목록 불러오기 실패:", error);
    alert("상품 목록을 불러오는 데 실패했습니다.");
  }
}

// 페이지 로드 시 상품 목록 불러오기
document.addEventListener("DOMContentLoaded", () => {
  getProducts();  // 페이지가 로드되면 목록 불러오기
});

// 등록 버튼 이벤트 리스너
document.getElementById("add-product-btn").addEventListener("click", addProduct);