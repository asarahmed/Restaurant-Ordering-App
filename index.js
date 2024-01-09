import { menuArray } from "/data.js";

const orderDetailsContainerEl = document.getElementById(
  "order-details-container"
);
const totalPriceEl = document.getElementById("total-price");
const orderSectionEl = document.getElementById("order-section");
const paymentModalEl = document.getElementById("payment-modal");
const paymentFormEl = document.getElementById("payment-form");
const successMessageEl = document.getElementById("success-message");

document.addEventListener("click", handleClicks);
paymentFormEl.addEventListener("submit", payOrderMoney);

function handleClicks(e) {
  if (e.target.dataset.item) {
    renderOrder(e.target.dataset.item);
  } else if (e.target.dataset.removeitem) {
    removeOrder(e, e.target.dataset.removeitem);
  } else if (e.target.id === "complete-order-btn") {
    openPaymentModal();
  }
}

function renderOrder(orderId) {
  const order = menuArray.filter((item) => item.id == orderId);
  const { name, ingredients, id, price, emoji } = order[0];

  orderDetailsContainerEl.innerHTML += `
  <div class="order-details">
    <h2>${name}</h2>
    <button class="remove-item-btn verdana-font" data-removeItem="${id}">remove</button>
    <p class="item-price">$ ${price}</p>
  </div>
  `;

  totalPriceEl.textContent = `${Number(totalPriceEl.textContent) + price}`;
  orderSectionEl.style.display = "block";
  successMessageEl.innerHTML = "";
}

function removeOrder(e, orderId) {
  const order = menuArray.filter((item) => item.id == orderId);
  const price = order[0].price;

  e.target.parentElement.remove();

  if (orderDetailsContainerEl.children.length === 0) {
    orderSectionEl.style.display = "none";
  }

  totalPriceEl.textContent = `${Number(totalPriceEl.textContent) - price}`;
}

function openPaymentModal() {
  paymentModalEl.style.display = "block";
}

function payOrderMoney(e) {
  e.preventDefault();
  const formData = new FormData(paymentFormEl);
  const name = formData.get("user-name");
  orderSuccessMessage(name);
}

function orderSuccessMessage(name) {
  successMessageEl.innerHTML = `
  <div class="message">
    Thanks, ${name}! Your order is on its way!
  </div>
  `;
  paymentModalEl.style.display = "none";
  orderSectionEl.style.display = "none";
  orderDetailsContainerEl.innerHTML = "";
}

function renderItem() {
  const itemsHtml = menuArray
    .map((item) => {
      const { name, ingredients, id, price, emoji } = item;
      return `
        <div class="item-container">
          <div class="emoji">${emoji}</div>
          <div class="item-details">
            <h2>${name}</h2>
            <p class="item-desc">${ingredients.join(", ")}</p>
            <p class="item-price">$ ${price}</p>
          </div>
          <button class="item-plus-btn" data-item="${id}">+</button>
        </div>
        `;
    })
    .join("");
  document.getElementById("items-section").innerHTML = itemsHtml;
}

renderItem();
