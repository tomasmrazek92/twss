$(document).ready(function () {
  $('.cc-hp-hero').each(function () {
    let mainTl = gsap.timeline();
    let heading = $(this).find('h1');
    let items = $(this).find('[data-animation="item"]');
    let horizontalReveal = $(this).find('[data-animation="horizontal-reveal"]');
    console.log(horizontalReveal);

    let initDelay = sessionStorage.getItem('navbarState') === 'true' ? 0.3 : 0;

    mainTl.to('.page-wrapper', { opacity: 1, delay: initDelay });

    if (heading.length) {
      let type = heading.attr('data-split-type') || 'line';
      let typeSplit = new SplitType(heading, {
        types: 'lines, words, chars',
        tagName: 'span',
      });

      mainTl.from(
        heading.find(`.${type}`),
        {
          y: '2rem',
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '<'
      );
    }
    if (items.length) {
      mainTl.from(items, { y: '2rem', opacity: 0, stagger: 0.2 }, '<');
    }
    if (horizontalReveal.length) {
      horizontalReveal.each(function () {
        let tlSmall = gsap.timeline();

        let mask = $(this).find('.horizontal-mask');

        let directionAttr = mask.attr('data-direction');
        let direction = directionAttr === 'left' ? 100 : directionAttr === 'right' ? -100 : 0;

        let img = $(this).find('img');

        gsap.set(mask, { x: 0, xPercent: 0 });

        tlSmall.to(
          mask,
          {
            xPercent: -100,
            duration: 2.2,
            ease: 'power3.inOut',
            force3D: true,
          },
          '<'
        );

        tlSmall.from(img, { scale: 1.2, duration: 2 }, '<');

        mainTl.add(tlSmall, '<');
      });
    }
  });

  $('.podcast-illu').each(function () {
    // Els
    let starBox = $('.podcast-illu_stars');
    let stars = starBox.find('path');
    let label = $('.podcast-illu_label');
    let phoneBg = $('.podcast-illu_phone-bg');
    let thumb = $('.podcast-illu_thumb');
    let circle = $('.podcast-illu_circle');
    let logo = $('.podcast-illu_logo');

    let tl = gsap.timeline({
      defaults: { ease: 'power2.out', duration: 1 },
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
      },
    });

    tl.from(phoneBg, { yPercent: 10, opacity: 0, duration: 1 });
    tl.from(thumb, { scale: 0.9, opacity: 0 }, '-=0.3');
    tl.from(circle, { rotate: 45, opacity: 0 }, '<');
    tl.from(logo, { scale: 0.8, opacity: 0 }, '<');
    tl.from(starBox, { yPercent: 50, rotate: 5, opacity: 0 }, '-=0.5');
    tl.from(stars, { scale: 0, stagger: 0.1 }, '<');
    tl.from(label, { yPercent: 50, rotate: 5, opacity: 0 }, '<');
  });

  $('.socials-illu').each(function () {
    // Els
    let phoneBg = $('.socials-illu_bg');
    let label = $('.socials-illu_label');
    let sign = $('.socials-illu_sign');

    let tl = gsap.timeline({
      defaults: { ease: 'power2.out', duration: 1 },
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
      },
      delay: 0.5,
    });

    tl.from(phoneBg, { yPercent: 10, opacity: 0, duration: 1 });
    tl.from(label, { yPercent: 15, rotate: 5, opacity: 0, stagger: 0.3 }, '<');
    tl.from(sign, { rotate: 15, opacity: 0 }, '-=0.8');
  });
});
