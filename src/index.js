import { initSwipers } from './utils/globalFunctions';
import { gridFade, imageReveal } from './utils/reusableAnimations';

gsap.defaults({ ease: Power1.easeOut, duration: 0.8 });
$(document).ready(() => {
  // #region Nav

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  let isFixed = false;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $('.nav_wrapper'),
      start: () => '10px top',
      end: 'bottom top',
      markers: true,
      onEnter: debounce(() => {
        if (!isFixed) {
          isFixed = true;
          $('.nav').addClass('fixed');
        }
      }, 200), // Adjust the debounce delay as needed
      onLeaveBack: debounce(() => {
        if (isFixed) {
          isFixed = false;
          $('.nav').removeClass('fixed');
        }
      }, 200), // Adjust the debounce delay as needed
    },
  });

  // #endregion

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
        autoHeight: true,
      },
      'all',
    ],
  ];

  // Init
  $(document).ready(function () {
    initSwipers(swiperInstances);
  });

  // #endregion

  // #region Transition
  function resetWebflow(data) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(data.next.html, 'text/html');
    let webflowPageId = $(dom).find('html').attr('data-wf-page');
    $('html').attr('data-wf-page', webflowPageId);
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();
  }

  function initFsAttributes() {
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      'cmsload',
      (listInstances) => {
        console.log('cmsload Successfully loaded!');

        // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
        const [listInstance] = listInstances;

        // The `renderitems` event runs whenever the list renders items after switching pages.
        listInstance.on('renderitems', (renderedItems) => {
          console.log(renderedItems);
        });
      },
    ]);
  }

  /*
  barba.init({
    transitions: [
      {
        name: 'opacity-transition',
        leave(data) {
          let tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
          tl.set('.nav_transition', { opacity: 1 });
          tl.to('.nav_transition', { height: '100vh', duration: 0.8 });
          return tl;
        },
        enter(data) {
          // Reset Webflow interactions
          resetWebflow(data);
        },
        after(data) {
          gsapReset();

          // Initialize fsAttributes
          initFsAttributes();

          // Animate the nav_transition element
          let tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
          tl.set('.nav_transition', { opacity: 0 });
          tl.to('.nav_transition', { height: '100%', duration: 0.8 });
          return tl;
        },
      },
    ],
  });
  */

  // #endregion

  // #region Animations
  function gsapReset() {
    let isDesktop = $(window).width() > 991;

    $('[data-animation="section"]').each(function () {
      // els
      let trigger = $(this);
      let heading = $(this).find('[data-animation="heading"]');
      let items = $(this).find('[data-animation="item"]');
      let itemsStart = $(this).find('[data-animation="item-start"]'); // since we have the position parameters set, we need to use this if we want to animate the items on start
      let itemsStagger = $(this).find('[data-animation="stagger"]'); // childs = [data-animation="stagger-item"]
      let imgScale = $(this).find('[data-animation="img-scale"]');
      let verticalReveal = $(this).find('[data-animation="vertical-reveal"]');
      let horizontalReveal = $(this).find('[data-animation="horizontal-reveal"]');
      let signature = $(this).find('[data-animation="signature"]');
      let fade = $(this).find('[data-animation="fade"]');

      // properties
      let realIndex = $(this).eq(0).index();
      let stagger = trigger.attr('data-stagger') || 0.2;
      let start = trigger.attr('data-start') || isDesktop ? '50% bottom' : '20% bottom';

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: realIndex === 0 ? 'body' : trigger,
          start: realIndex === 0 ? '-10 top' : start,
        },
      });

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
          previousTweens.length > 0 ? '<' : '<'
        );
      }
      if (itemsStagger.length) {
        itemsStagger.each(function () {
          let items = $(this).find('[data-animation="stagger-item"]');
          let stagger = $(this).attr('data-stagger') || 0.1;

          tl.from(items, { y: '1rem', opacity: 0, stagger: stagger }, '<');
        });
      }
      if (fade.length) {
        fade.each(function () {
          tl.from($(this), { opacity: 0 }, '<');
        });
      }
      if (signature.length) {
        let directionAttr = signature.attr('data-direction');
        let direction = directionAttr === 'left' ? -15 : directionAttr === 'right' ? 15 : 0;

        tl.from(signature, { opacity: 0, rotate: direction, duration: 0.4 }, '<0.2');
      }
    });

    $('.rotate-text_circle').each(function (index, element) {
      let rotationDirection = index % 2 === 0 ? 30 : -30;
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        rotation: rotationDirection,
        ease: 'none',
      });
    });
  }

  gsapReset();

  // #endregion

  // #region Helpers
  $(document).ready(function () {
    $('[data-copy]').on('click', function () {
      let type = $(this).attr('data-copy');
      console.log(type);

      if (type === 'url') {
        copyClipboard($(this), $(location).attr('href'));
      } else {
        copyClipboard($(this), type);
      }
    });

    function copyClipboard(el, val) {
      // Paste here
      var $temp = $('<input>');
      var ogIcon = $(el).find('.w-embed:first-child');
      var label = $(el).find('.w-embed:last-child');
      let timeOut;

      // Click
      $('body').append($temp);
      $temp.val(val).select();
      document.execCommand('copy');
      $temp.remove();

      clearTimeout(timeOut); // Corrected the function name and variable consistency
      label.hide();
      ogIcon.hide();
      label.css('display', 'flex');
      timeOut = setTimeout(() => {
        label.hide();
        ogIcon.css('display', 'flex');
      }, 2000);
    }
  });
  // #endregion
});
