/* Mother's Day tribute — light interactions */

(function () {
  "use strict";

  // ----- Mobile nav -----
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true }
  );

  // ----- Floating petals / hearts in hero -----
  const petalsEl = document.getElementById("heroPetals");
  const symbols = ["♥", "♡", "❀", "✿", "🌸"];

  function spawnPetal() {
    const el = document.createElement("span");
    el.className = "petal";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = 0.8 + Math.random() * 1.1 + "rem";
    el.style.animationDuration = 8 + Math.random() * 10 + "s";
    el.style.animationDelay = Math.random() * 2 + "s";
    petalsEl.appendChild(el);
    setTimeout(() => el.remove(), 20000);
  }

  for (let i = 0; i < 14; i++) spawnPetal();
  setInterval(spawnPetal, 1600);

  // ----- Fade-in on scroll -----
  const fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    fadeEls.forEach((el) => io.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("visible"));
  }

  // Hero content is above the fold — show immediately
  const heroFade = document.querySelector(".hero-content.fade-in");
  if (heroFade) {
    requestAnimationFrame(() => heroFade.classList.add("visible"));
  }

  // ----- Lightbox -----
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const caption = item.querySelector("figcaption");
      lightboxImg.src = item.dataset.full || img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  // ----- Send a hug — heart burst -----
  const hugBtn = document.getElementById("hugBtn");
  const heartBurst = document.getElementById("heartBurst");
  const hearts = ["💕", "💗", "💖", "💓", "❤️", "💝"];

  hugBtn.addEventListener("click", () => {
    for (let i = 0; i < 16; i++) {
      const h = document.createElement("span");
      h.className = "burst-heart";
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      const dx = (Math.random() - 0.5) * 220;
      h.style.setProperty("--dx", dx + "px");
      h.style.left = 50 + (Math.random() - 0.5) * 10 + "%";
      h.style.bottom = 25 + Math.random() * 15 + "%";
      h.style.animationDelay = Math.random() * 0.35 + "s";
      h.style.fontSize = 1 + Math.random() * 1.2 + "rem";
      heartBurst.appendChild(h);
      setTimeout(() => h.remove(), 1800);
    }
  });
})();
