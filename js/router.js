const contentDiv = document.getElementById("content");

const getCurrentRoute = () => {
  // Remove leading slash if present, fallback to "home"
  const route = location.hash.slice(1).toLowerCase() || "home";
  return route.replace(/^\//, ""); // clean starting slash
};

const loadPage = async () => {
  const page = getCurrentRoute();
  const pageUrl = `pages/${page}.html`;

  console.log(`Routing to ${page}.`);

  try {
    const res = await fetch(pageUrl);
    if (!res.ok) throw new Error("Page not found");

    const html = await res.text();
    contentDiv.innerHTML = html;
  } catch (err) {
    contentDiv.innerHTML = `<h1>404 - Page Not Found</h1>
                            <p>The page "${page}" does not exist.</p>`;
  }

  if (typeof window.saturatePartials === "function") {
    await window.saturatePartials();
  }

  // Now run scripts inside #content (page + partials)
  await runScriptsInContent(contentDiv);

  setTimeout(() => {
    const route = getCurrentRoute();
    const scrollY = sessionStorage.getItem(`scroll-${route}`);
    if (scrollY !== null) {
      window.scrollTo(0, parseInt(scrollY, 10));
    } else {
      window.scrollTo(0, 0);
    }
  }, 0);
};

window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);

