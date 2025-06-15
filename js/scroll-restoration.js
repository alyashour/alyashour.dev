function saveScrollPosition() {
  const route = getCurrentRoute();
  sessionStorage.setItem(`scroll-${route}`, window.scrollY);
}

window.addEventListener("hashchange", saveScrollPosition);
window.addEventListener("pagehide", saveScrollPosition); // For YouTube-style nav
