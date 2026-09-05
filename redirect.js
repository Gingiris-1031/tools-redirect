(() => {
  const targetOrigin = "https://tools.gingiris.com";
  const redirectSeconds = 3;
  const pagesPrefix = window.location.hostname.endsWith("github.io") ? "/tools-redirect" : "";
  const path = pagesPrefix && window.location.pathname.startsWith(pagesPrefix)
    ? window.location.pathname.slice(pagesPrefix.length) || "/"
    : window.location.pathname;
  const destination = `${targetOrigin}${path}${window.location.search}${window.location.hash}`;
  const countdown = document.querySelector("#countdown");
  const unit = document.querySelector("#unit");
  const progress = document.querySelector(".progress");
  let seconds = redirectSeconds;

  document.querySelectorAll(".destination-link").forEach((link) => {
    link.href = destination;
  });

  window.setInterval(() => {
    seconds = Math.max(0, seconds - 1);
    countdown.textContent = String(seconds);
    unit.textContent = seconds === 1 ? "second" : "seconds";
    progress.setAttribute("aria-label", `Redirecting in ${seconds} seconds`);
  }, 1000);

  window.setTimeout(() => window.location.replace(destination), redirectSeconds * 1000);
})();
