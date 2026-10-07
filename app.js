import { Store } from "./Store.js";

const startingProducts = [
  { id: "product-1", name: "Notebook", price: 4.5, qty: 12 },
  { id: "product-2", name: "Desk lamp", price: 24.99, qty: 5 },
  { id: "product-3", name: "Water bottle", price: 12, qty: 8 }
];

const store = new Store(startingProducts);
const productList = document.querySelector("#product-list");
const productForm = document.querySelector("#product-form");
const productCount = document.querySelector("#product-count");
const liveTotal = document.querySelector("#live-total");
const nameInput = document.querySelector("#product-name");
const priceInput = document.querySelector("#product-price");
const quantityInput = document.querySelector("#product-quantity");
const errorElements = {
  name: document.querySelector("#name-error"),
  price: document.querySelector("#price-error"),
  quantity: document.querySelector("#quantity-error")
};
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

let nextProductId = 4;

function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

// Build each product row from the Store instead of keeping a separate DOM data list.
function renderProducts() {
  const products = store.items;
  productList.replaceChildren();

  if (products.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = "empty-row";
    cell.textContent = "No products yet. Add one using the form above.";
    row.append(cell);
    productList.append(row);
  }

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.dataset.id = product.id;

    const nameCell = document.createElement("td");
    nameCell.className = "product-name";
    nameCell.textContent = product.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = formatCurrency(product.price);

    const quantityCell = document.createElement("td");
    const quantityControls = document.createElement("div");
    quantityControls.className = "quantity-controls";

    const decreaseButton = document.createElement("button");
    decreaseButton.type = "button";
    decreaseButton.className = "quantity-button";
    decreaseButton.dataset.action = "decrease";
    decreaseButton.setAttribute("aria-label", `Decrease ${product.name} quantity`);
    decreaseButton.textContent = "−";
    decreaseButton.disabled = product.qty <= 1;

    const quantityValue = document.createElement("span");
    quantityValue.textContent = product.qty;

    const increaseButton = document.createElement("button");
    increaseButton.type = "button";
    increaseButton.className = "quantity-button";
    increaseButton.dataset.action = "increase";
    increaseButton.setAttribute("aria-label", `Increase ${product.name} quantity`);
    increaseButton.textContent = "+";
    increaseButton.disabled = product.qty >= 9999;

    quantityControls.append(decreaseButton, quantityValue, increaseButton);
    quantityCell.append(quantityControls);

    const valueCell = document.createElement("td");
    valueCell.textContent = formatCurrency(product.price * product.qty);

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button-delete";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Delete";
    actionsCell.append(deleteButton);

    row.append(nameCell, priceCell, quantityCell, valueCell, actionsCell);
    productList.append(row);
  });

  productCount.textContent = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.qty,
    0
  );
  liveTotal.textContent = formatCurrency(totalValue);
}

function clearErrors() {
  Object.values(errorElements).forEach((errorElement) => {
    errorElement.textContent = "";
  });
}

function validateProduct(name, price, quantity) {
  clearErrors();
  let isValid = true;

  if (!name.trim()) {
    errorElements.name.textContent = "Enter a product name.";
    isValid = false;
  }

  if (!Number.isFinite(price) || price <= 0) {
    errorElements.price.textContent = "Enter a price greater than 0.";
    isValid = false;
  }

  if (!Number.isFinite(quantity) || !Number.isInteger(quantity)) {
    errorElements.quantity.textContent = "Enter a whole-number quantity.";
    isValid = false;
  } else if (quantity < 1 || quantity > 9999) {
    errorElements.quantity.textContent = "Quantity must be between 1 and 9,999.";
    isValid = false;
  }

  return isValid;
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const price = Number(priceInput.value);
  const quantityText = quantityInput.value.trim();
  const quantity = quantityText === "" ? Number.NaN : Number(quantityText);

  if (!validateProduct(name, price, quantity)) {
    return;
  }

  store.add({
    id: `product-${nextProductId}`,
    name: name.trim(),
    price,
    qty: quantity
  });
  nextProductId += 1;

  productForm.reset();
  clearErrors();
  renderProducts();
});

// One click listener handles every current and future product action.
productList.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (!(clickedElement instanceof Element)) {
    return;
  }

  const actionButton = clickedElement.closest("button[data-action]");
  if (!actionButton) {
    return;
  }

  const row = actionButton.closest("tr[data-id]");
  if (!row) {
    return;
  }

  const product = store.find(row.dataset.id);
  if (!product) {
    return;
  }

  if (actionButton.dataset.action === "delete") {
    store.remove(product.id);
  } else if (actionButton.dataset.action === "increase" && product.qty < 9999) {
    product.qty += 1;
  } else if (actionButton.dataset.action === "decrease" && product.qty > 1) {
    product.qty -= 1;
  } else {
    return;
  }

  renderProducts();
});

renderProducts();
