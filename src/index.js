import { initSwipers } from './utils/globalFunctions';
import { gridFade, imageReveal } from './utils/reusableAnimations';

gsap.defaults({ ease: Power1.easeOut, duration: 0.8 });

// #region Swipers

// Base Swiper
const swiperInstances = [
  [
    '.swiper-box.cc-youtube',
    '.swiper-box_inner',
    'videos',
    {
      slidesPerView: 'auto',
    },
    'all',
  ],
  [
    '.swiper-box.cc-articles',
    '.swiper-box_inner',
    'articles',
    {
      slidesPerView: 1,
    },
    'all',
  ],
  [
    '.swiper-box.cc-podcast',
    '.swiper-box_inner',
    'podcast',
    {
      slidesPerView: 'auto',
    },
    'all',
  ],
  [
    '.swiper-box.cc-testimonials',
    '.swiper-box_inner',
    'testimonials',
    {
      slidesPerView: '1',
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
    },
    'all',
  ],
];

// Init
$(document).ready(function () {
  initSwipers(swiperInstances);
});

// #endregion

// Section Animation
const splitTextAnimation = (element, type = 'words', duration, stagger) => {
  let tl = gsap.timeline({
    onStart: () => {
      self.css('opacity', '1');
    },
    onComplete: () => {
      self.addClass('loaded');
    },
  });

  let self = $(element);
  self.css('opacity', '0');

  let split = new SplitType(element, { type: type });
  tl.from(
    split[type],
    { duration: duration, ease: 'linear', visibility: 'hidden', stagger: stagger },
    '<-=0.3'
  );
  if ($(element).find('.w-embed').length) {
    tl.from(
      $(element).find('.w-embed'),
      { duration: duration, y: '0.5em', opacity: 0, stagger: stagger * 10 },
      '<'
    );
  }

  return tl;
};
$('[data-animation="section"]').each(function () {
  // els
  let trigger = $(this);
  let label = $(this).find('[data-animation="label"]');
  let heading = $(this).find('[data-animation="heading"]');
  let items = $(this).find('[data-animation="item"]');
  let itemsStart = $(this).find('[data-animation="item-start"]'); // since we have the position parameters set, we need to use this if we want to animate the items on start
  let itemsStagger = $(this).find('[data-animation="stagger"]'); // childs = [data-animation="stagger-item"]
  let texts = $(this).find('[data-animation="text"]');
  let imgScale = $(this).find('[data-animation="img-scale"]');
  let verticalReveal = $(this).find('[data-animation="vertical-reveal"]');
  let horizontalReveal = $(this).find('[data-animation="horizontal-reveal"]');
  let signature = $(this).find('[data-animation="signature"]');

  // properties
  let realIndex = $(this).eq(0).index();
  let stagger = trigger.attr('data-stagger') || 0.2;
  let start = trigger.attr('data-start') || '50% bottom';

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: realIndex === 0 ? 'body' : trigger,
      start: realIndex === 0 ? '-10 top' : start,
      markers: true,
    },
  });

  if (label.length) {
    label.each(function () {
      tl.add(splitTextAnimation($(this), 'chars', 0.1, 0.05), '<');
    });
  }
  if (heading.length) {
    let type = heading.attr('data-split-type') || 'line';
    let typeSplit = new SplitType(heading, {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    tl.from(
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
  if (itemsStart.length) {
    tl.from(itemsStart, { y: '2rem', opacity: 0, stagger: stagger }, '<');
  }
  if (imgScale.length) {
    tl.from(imgScale, { scale: 1.2 }, '<');
  }
  if (verticalReveal.length) {
    verticalReveal.each(function () {
      let tlSmall = gsap.timeline();

      let masks = $(this).find('.vertical-mask');
      let img = $(this).find('img');

      tlSmall.from(masks.eq(0), { yPercent: 100, duration: 1, ease: Power2.easeOut }, '<');
      tlSmall.from(masks.eq(1), { yPercent: -100, duration: 1, ease: Power2.easeOut }, '<');
      tlSmall.from(img, { scale: 1.2 }, '<');

      tl.add(tlSmall, '<');
    });
  }
  if (horizontalReveal.length) {
    horizontalReveal.each(function () {
      let tlSmall = gsap.timeline();

      let mask = $(this).find('.horizontal-mask');

      let directionAttr = mask.attr('data-direction');
      let direction = directionAttr === 'left' ? 100 : directionAttr === 'right' ? -100 : 0;

      let img = $(this).find('img');

      tlSmall.from(mask, { xPercent: 100, duration: 2, ease: Power2.easeOut }, '<');
      tlSmall.from(img, { scale: 1.2, duration: 2 }, '<');

      tl.add(tlSmall, '<');
    });
  }
  if (items.length) {
    const previousTweens = tl.getChildren(); // Get all tweens in the timeline
    tl.from(
      items,
      { y: '2rem', opacity: 0, stagger: stagger },
      previousTweens.length > 0 ? '-=0.9' : '<'
    );
  }
  if (texts.length) {
    texts.each(function () {
      let tlSmall = splitTextAnimation($(this), 'chars', 0.1, 0.02);
      tl.add(tlSmall, 0); // Ensure this is properly nested
    });
  }
  if (itemsStagger.length) {
    itemsStagger.each(function () {
      let items = $(this).find('[data-animation="stagger-item"]');
      let stagger = $(this).attr('data-stagger') || 0.1;

      tl.from(items, { y: '1rem', opacity: 0, stagger: stagger }, '<');
    });
  }
  if (signature.length) {
    let directionAttr = signature.attr('data-direction');
    let direction = directionAttr === 'left' ? -15 : directionAttr === 'right' ? 15 : 0;

    tl.from(signature, { opacity: 0, rotate: direction, duration: 0.4 }, '<0.2');
  }
});
