window.saturatePartials = async function() {
  console.log('Saturating partials for page.');
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
};

window.runScriptsInContent = async function(container) {
  const scripts = container.querySelectorAll("script");
  console.log(scripts);
  for (const oldScript of scripts) {
    const newScript = document.createElement("script");

    // Copy attributes
    for (const attr of oldScript.attributes) {
      newScript.setAttribute(attr.name, attr.value);
    }

    // Inline script content
    if (oldScript.textContent) {
      newScript.textContent = oldScript.textContent;
    }

    // Replace old script with new script to trigger execution
    oldScript.parentNode.replaceChild(newScript, oldScript);

    // Wait for external scripts to load
    if (newScript.src) {
      await new Promise((resolve, reject) => {
        newScript.onload = resolve;
        newScript.onerror = reject;
      });
    }
  }
}

// currently fixing script load issue.
// to see nav to a page then go back.
// the load page function is being called and the array above does have the script
// it's just not running lmao