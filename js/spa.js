const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: () => fetch("views/home.html").then(res => res.text()) },
        { path: "/about", view: () => fetch("views/about.html").then(res => res.text()) },
        { path: "/contact", view: () => fetch("views/contact.html").then(res => res.text()) },
    ];

    const potentialMatches = routes.map(route => ({
        route,
        isMatch: location.pathname === route.path
    }));

    let match = potentialMatches.find(p => p.isMatch);

    if (!match) {
        match = {
            route: { view: () => Promise.resolve("<h1>404 Not Found</h1>") }
        };
    }

    const html = await match.route.view();
    document.getElementById("app").innerHTML = html;
};

// Listen for back/forward browser events
window.addEventListener("popstate", router);

// Delegate link clicks
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});
