async function includeHTML() {
  let hasPartials = true;

  while (hasPartials) {
    hasPartials = false;
    const elements = document.querySelectorAll('[partial]');

    for (const el of elements) {
      const file = el.getAttribute('partial');
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to load: ${file}`);
        el.innerHTML = await res.text();
      } catch (err) {
        el.innerHTML = `<p>${err.message}</p>`;
      }
      el.removeAttribute('partial');
      hasPartials = true; // We found and processed at least one partial
    }
  }
}

document.addEventListener('DOMContentLoaded', includeHTML);
