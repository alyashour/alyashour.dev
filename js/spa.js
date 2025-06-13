const navigateTo = url => {
    location.hash = url;
};

const getCurrentPath = () => location.hash.slice(1) || "/";

const router = async () => {
    const routes = {
        "/": "/views/home.html",
        "/admin": "/views/admin.html",
        "/startup": "/views/startup.html",
        "/roadmap": "/views/roadmap.html",
        "/projects": "/views/roadmap.html",
    };

    const path = getCurrentPath();
    const view = routes[path];

    if (!view) {
        document.getElementById("app").innerHTML = "<h1>404 Not Found</h1>";
        return;
    }

    await loadViewWithScripts(view);
};


window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.getAttribute("href"));
        }
    });
    router();
});

async function loadViewWithScripts(url) {
  const html = await fetch(url).then(res => res.text());
  
  const container = document.getElementById("app");
  container.innerHTML = html;

  // Find any scripts in the loaded HTML
  const scripts = container.querySelectorAll("script");

  scripts.forEach(oldScript => {
    const newScript = document.createElement("script");

    // Copy attributes like src, type, defer, etc.
    Array.from(oldScript.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });

    if (oldScript.src) {
      // External script — just append to body to load & run
      document.body.appendChild(newScript);
    } else {
      // Inline script — copy the text and execute
      newScript.textContent = oldScript.textContent;
      document.body.appendChild(newScript);
    }

    // Remove old script from container so it's not duplicated
    oldScript.remove();
  });
}
