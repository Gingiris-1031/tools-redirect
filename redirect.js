(() => {
  const targetOrigin = "https://tools.gingiris.com";
  const redirectSeconds = 6;
  const defaultLanguage = "zh-CN";
  const translations = {
    "zh-CN": {
      title: "Growth Tools 搬家了 · Gingiris",
      description: "Gingiris Growth Tools 已迁移至 tools.gingiris.com。",
      brandAria: "前往 Gingiris Growth Tools",
      languageAria: "语言选择",
      status: "站点搬家通知",
      notice: "公告",
      date: "2026.09.05",
      kicker: "嗨，告诉你一件小事。",
      headline: "我们搬家了。",
      intro: "Growth Tools 换了一个新地址。其他都没变：熟悉的工具、实战手册和资源，都在那里等你。",
      oldAddress: "旧地址",
      newAddress: "新地址",
      button: "去新站看看",
      countPrefix: "将在 ",
      countSuffix: " 秒后带你前往新站。",
      redirectLabel: (seconds) => `将在 ${seconds} 秒后跳转`,
      footerStats: "100+ 款增长工具 · 40+ 个 AI Skills",
      footerBye: "新站见。",
    },
    en: {
      title: "Growth Tools has moved · Gingiris",
      description: "Gingiris Growth Tools now lives at tools.gingiris.com.",
      brandAria: "Go to Gingiris Growth Tools",
      languageAria: "Language selection",
      status: "A small change of address",
      notice: "NOTICE",
      date: "05 SEP 2026",
      kicker: "Hello — quick update.",
      headline: "We moved.",
      intro: "Growth Tools has a new home. Nothing else has changed: the same tools, playbooks, and resources are waiting for you there.",
      oldAddress: "OLD ADDRESS",
      newAddress: "NEW ADDRESS",
      button: "Take me there",
      countPrefix: "Taking you there in ",
      countSuffix: (seconds) => seconds === 1 ? " second." : " seconds.",
      redirectLabel: (seconds) => `Redirecting in ${seconds} seconds`,
      footerStats: "100+ growth tools · 40+ AI skills",
      footerBye: "See you over there.",
    },
  };

  const pagesPrefix = window.location.hostname.endsWith("github.io") ? "/tools-redirect" : "";
  const path = pagesPrefix && window.location.pathname.startsWith(pagesPrefix)
    ? window.location.pathname.slice(pagesPrefix.length) || "/"
    : window.location.pathname;
  const destination = `${targetOrigin}${path}${window.location.search}${window.location.hash}`;
  const countdown = document.querySelector("#countdown");
  const countPrefix = document.querySelector("#count-prefix");
  const countSuffix = document.querySelector("#count-suffix");
  const progress = document.querySelector(".progress");
  let seconds = redirectSeconds;
  let language = localStorage.getItem("tools-redirect-language") || defaultLanguage;
  if (!translations[language]) language = defaultLanguage;

  function value(entry, ...args) {
    return typeof entry === "function" ? entry(...args) : entry;
  }

  function setLanguage(nextLanguage) {
    language = translations[nextLanguage] ? nextLanguage : defaultLanguage;
    const copy = translations[language];
    document.documentElement.lang = language;
    document.title = copy.title;
    document.querySelector('meta[name="description"]').content = copy.description;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = copy[element.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", copy[element.dataset.i18nAria]);
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    countPrefix.textContent = copy.countPrefix;
    countSuffix.textContent = value(copy.countSuffix, seconds);
    progress.setAttribute("aria-label", copy.redirectLabel(seconds));
  }

  document.querySelectorAll(".destination-link").forEach((link) => { link.href = destination; });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem("tools-redirect-language", button.dataset.language);
      setLanguage(button.dataset.language);
    });
  });

  setLanguage(language);
  window.setInterval(() => {
    seconds = Math.max(0, seconds - 1);
    countdown.textContent = String(seconds);
    countSuffix.textContent = value(translations[language].countSuffix, seconds);
    progress.setAttribute("aria-label", translations[language].redirectLabel(seconds));
  }, 1000);

  window.setTimeout(() => window.location.replace(destination), redirectSeconds * 1000);
})();
