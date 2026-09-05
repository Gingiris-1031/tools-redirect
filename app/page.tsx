"use client";

import { useEffect, useState } from "react";

const TARGET_ORIGIN = "https://tools.gingiris.com";
const REDIRECT_SECONDS = 3;

function getDestination() {
  if (typeof window === "undefined") return TARGET_ORIGIN;
  return `${TARGET_ORIGIN}${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export default function Home() {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
  const [destination, setDestination] = useState(TARGET_ORIGIN);

  useEffect(() => {
    setDestination(getDestination());
    const countdown = window.setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);
    const redirect = window.setTimeout(() => {
      window.location.replace(getDestination());
    }, REDIRECT_SECONDS * 1000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(redirect);
    };
  }, []);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href={destination} aria-label="Go to Gingiris Growth Tools">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="brand-name">Gingiris</span>
          <span className="brand-divider" />
          <span className="brand-product">Growth Tools</span>
        </a>
        <span className="move-status"><i /> New home</span>
      </header>

      <section className="hero">
        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Gingiris · Growth Tools</p>
          <h1>Growth Tools<br />has <em>moved.</em></h1>
          <p className="lede">
            The same curated growth library now lives at a clearer address.
            You’ll be there in {seconds} {seconds === 1 ? "second" : "seconds"}.
          </p>

          <a className="redirect-card" href={destination}>
            <span className="redirect-label">Continue to</span>
            <strong>tools.gingiris.com</strong>
            <span className="arrow" aria-hidden="true">↗</span>
          </a>

          <div className="progress" aria-label={`Redirecting in ${seconds} seconds`} role="status">
            <span style={{ animationDuration: `${REDIRECT_SECONDS}s` }} />
          </div>
          <p className="fine-print">Redirecting securely · Your current page and links are preserved</p>
        </div>

        <div className="visual" aria-hidden="true">
          <div className="orbit orbit-one"><span /></div>
          <div className="orbit orbit-two"><span /></div>
          <div className="orbit orbit-three"><span /></div>
          <div className="destination-node">
            <span className="node-icon">↗</span>
            <span className="node-copy"><small>NEW DOMAIN</small><b>tools.gingiris.com</b></span>
          </div>
          <span className="tool-chip chip-one">SEO</span>
          <span className="tool-chip chip-two">KOL</span>
          <span className="tool-chip chip-three">GEO</span>
        </div>
      </section>

      <footer>
        <span>100+ growth tools</span>
        <span>40+ AI skills</span>
        <span>Free playbooks</span>
      </footer>
    </main>
  );
}
