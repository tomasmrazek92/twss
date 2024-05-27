import { initSwipers } from './utils/globalFunctions';
import { gridFade, imageReveal } from './utils/reusableAnimations';

// #region Menu
// BG Change

// Responsive
let scrollPosition;
let menuOpen;
let menuTimeout;
const disableScroll = () => {
  clearTimeout(menuTimeout);
  if (!menuOpen) {
    menuTimeout = setTimeout(() => {
      scrollPosition = $(window).scrollTop();
      $('html, body').scrollTop(0).addClass('overflow-hidden');
      $('.navbar_brand').css('color', 'white');
    }, 350);
  } else {
    $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
    $('.navbar_brand').css('color', 'inherit');
  }
  menuOpen = !menuOpen;
};

$('.nav_menu-icon').on('click', function () {
  if ($(window).width() <= 797) {
    disableScroll();
  }
});

// #endregion

// #region Swipers

// Base Swiper
const swiperInstances = [
  [
    '[data-swiper="section"]',
    '[data-swiper="wrap"]',
    'press-slider',
    {
      slidesPerView: 'auto',
      preventClicks: 'false',
      on: {
        init: (swiper) => {
          let total = $(swiper.wrapperEl).closest('.container').find(`[data-slides="total"]`);
          if (total.length) {
            total.text(String(swiper.slides.length).padStart(2, '0'));
          }
        },
        slideChange: (swiper) => {
          let current = $(swiper.wrapperEl).closest('.container').find(`[data-slides="current"]`);
          if (current.length) {
            current.text(String(swiper.activeIndex + 1).padStart(2, '0'));
          }
        },
      },
    },
    'all',
  ],
];

// Init
initSwipers(swiperInstances);

// #endregion

// #region Animations

// #region Image Parallax
// Outer = [image-parallax='outer'
// Inner = [image-parallax='inner']
function imageParallax() {
  $("[image-parallax='outer']").each(function (index) {
    let parallaxOuter = $(this);
    let parallaxInner = $("[image-parallax='inner']");

    let imageParallax = gsap.timeline({
      scrollTrigger: {
        trigger: parallaxOuter,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.75,
      },
    });
    imageParallax.fromTo(
      $(this).find(parallaxInner),
      {
        yPercent: 0,
      },
      {
        yPercent: -20,
        ease: 'none',
      }
    );
  });
}

// #endregion

// ____________ Full width Text
// Wrapper = [dynamic-text='wrapper']
// Text Item = [dynamic-text='text']
function adjustTextSize() {
  const dynamicContainers = document.querySelectorAll("[dynamic-text='wrapper']");
  const dynamicTexts = document.querySelectorAll("[dynamic-text='text']");

  dynamicContainers.forEach((dynamicContainer, index) => {
    console.log('Fire');
    const containerWidth = dynamicContainer.offsetWidth;
    const dynamicTextWidth = dynamicTexts[index].offsetWidth;

    const fontSize =
      (containerWidth / dynamicTextWidth) *
      parseFloat(window.getComputedStyle(dynamicTexts[index]).fontSize);

    dynamicTexts[index].style.fontSize = fontSize + 'px';
  });
}

/*// ____________ Footer Wipe
function footerSlide() {
  $("[footer-slide='main']").each(function (index) {
    let footerMain = $(this);
    let footerBase = $("[footer-slide='base']");

    let footerSlide = gsap.timeline({
      scrollTrigger: {
        trigger: footerMain,
        start: 'bottom bottom',
        end: () => `+=${document.querySelector('.footer_base').offsetHeight}`,
        scrub: true,
        markers: true,
      },
    });
    footerSlide.fromTo(
      $(this).find(footerBase),
      {
        yPercent: '-100',
      },
      {
        yPercent: '0',
      }
    );
  });
}
*/

// __________ Footer BC Link ___________
function footerBiz() {
  let footerBizTrigger = $('.footer_bc');

  footerBizTrigger.each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'bottom bottom',
        end: 'bottom bottom',
        toggleActions: 'none play none reverse',
      },
    });

    tl.from($(this).find('.shooting_star'), {
      width: '1rem',
      opacity: 0,
      ease: Power3.easeOut,
      duration: 0.75,
    });
    tl.from(
      $(this).find("[footer-bc-stagger='item']"),
      {
        opacity: 0,
        y: '2rem',
        stagger: { amount: 0.4 },
        delay: 0.2,
        duration: 0.6,
        ease: 'power3.out',
      },
      '<'
    );
  });
}

// ___________ Events
// Events
$(document).ready(function () {
  adjustTextSize();
  gridFade();
  imageParallax();
  /*footerSlide();*/
  footerBiz();
  imageReveal();
});

window.addEventListener('resize', () => {
  adjustTextSize();
});
