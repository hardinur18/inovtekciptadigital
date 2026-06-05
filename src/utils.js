export function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

export function getStoredCart() {
  try {
    return JSON.parse(localStorage.getItem("inovtek-cart") || "[]");
  } catch {
    return [];
  }
}

export function saveStoredCart(cart) {
  localStorage.setItem("inovtek-cart", JSON.stringify(cart));
}

export function navGroupFor(route, view) {
  if (route === "cart" || view === "cart") return "cart";
  if (route.startsWith("product-") || view === "products") return "products";
  if (route.startsWith("service-") || view === "service") return "services";
  if (view === "portfolio") return "portfolio";
  return "home";
}

export function getRouteFromHash() {
  return (window.location.hash || "#home").replace("#", "") || "home";
}
