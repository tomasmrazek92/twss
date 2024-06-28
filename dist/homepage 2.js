"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/homepage.js
  $(".podcast-illu").each(function() {
    let starBox = $(".podcast-illu_stars");
    let stars = starBox.find("path");
    let label = $(".podcast-illu_label");
    let phoneBg = $(".podcast-illu_phone-bg");
    let thumb = $(".podcast-illu_thumb");
    let circle = $(".podcast-illu_circle");
    let logo = $(".podcast-illu_logo");
    let tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1 },
      scrollTrigger: {
        trigger: $(this),
        start: "center bottom"
      }
    });
    tl.from(phoneBg, { yPercent: 50, opacity: 0, duration: 1 });
    tl.from(thumb, { scale: 0.9, opacity: 0 }, "-=0.3");
    tl.from(circle, { rotate: 45, opacity: 0 }, "<");
    tl.from(logo, { scale: 0.8, opacity: 0 }, "<");
    tl.from(starBox, { yPercent: 50, rotate: 5, opacity: 0 }, "-=0.5");
    tl.from(stars, { scale: 0, stagger: 0.1 }, "<");
    tl.from(label, { yPercent: 50, rotate: 5, opacity: 0 }, "<");
  });
  $(".socials-illu").each(function() {
    let phoneBg = $(".socials-illu_bg");
    let label = $(".socials-illu_label");
    let sign = $(".socials-illu_sign");
    let tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1 },
      scrollTrigger: {
        trigger: $(this),
        start: "center bottom"
      },
      delay: 0.5
    });
    tl.from(phoneBg, { yPercent: 50, opacity: 0, duration: 1 });
    tl.from(label, { yPercent: 15, rotate: 5, opacity: 0, stagger: 0.3 }, "<");
    tl.from(sign, { rotate: 15, opacity: 0 }, "-=0.8");
  });
})();
//# sourceMappingURL=homepage.js.map
