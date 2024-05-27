$(document).ready(heroScroll);
$(document).ready(bookParallax);
$(document).ready(posterParallax);
$(document).ready(homeNavChange);
$(document).ready(heroTime);

// ________ Home Nav Transparent _____________________________
function homeNavChange() {
  let navTrigger = gsap.timeline({
    scrollTrigger: {
      trigger: 'body',
      start: () => innerHeight / 2,
      end: () => innerHeight / 2,
      toggleActions: 'none play none reverse',
    },
  });
  navTrigger.to(
    '.nav_dropdown-list',
    {
      backgroundColor: 'white',
      duration: 0.75,
    },
    '<'
  );
  navTrigger.to(
    '.navbar',
    {
      backgroundColor: 'white',
    },
    '<'
  );
  navTrigger.to(
    '.navbar_brand-star',
    {
      width: '25%',
      duration: 0.75,
      opacity: 0,
      ease: 'power4.inOut',
    },
    '<'
  ),
    navTrigger.to(
      '.s_logo-path',
      {
        y: '0%',
        duration: 0.5,
        ease: 'power4.inOut',
        stagger: { amount: 0.04 },
        delay: 0.2,
      },
      '<'
    );
}

// ________ Home Hero Scroll _____________________________
function heroScroll() {
  let heroScroll = gsap.timeline({
    scrollTrigger: {
      trigger: '.home_hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.25,
    },
  });
  heroScroll.to(
    '.home_hero-inner',
    {
      y: '10rem',
    },
    '<'
  );
  heroScroll.to(
    '.home_hero-swiper-sticky',
    {
      rotation: -8,
      scale: 0.6,
      /*width: "60svw",
      height: "75svh",*/
    },
    '<'
  );
}

// _______ Hero Time
function heroTime() {
  // Time
  var { DateTime } = luxon;

  function updateTime() {
    var userLocalTime = DateTime.local();
    var estTime = userLocalTime.setZone('America/New_York').toFormat('HH:mm');
    $('[data-real-time]').text(estTime);
  }

  // Load
  updateTime();

  // Real Time
  setInterval(updateTime, 1000);
}

// __________ Book sliding up on homepage _____________
function bookParallax() {
  let bookParallax = gsap.timeline({
    scrollTrigger: {
      trigger: '.home_book-inner',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.75,
    },
  });
  bookParallax.fromTo(
    '.home_book-cover',
    {
      yPercent: 100,
      rotation: 20,
    },
    {
      yPercent: -25,
      rotation: -5,
    }
  );
}

// __________ Netflix Poster sliding up on homepage _____________
function posterParallax() {
  let posterParallax = gsap.timeline({
    scrollTrigger: {
      trigger: '.home_netflix-inner',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.75,
    },
  });
  posterParallax.fromTo(
    '.netflix_poster',
    {
      yPercent: 20,
      rotation: -10,
    },
    {
      yPercent: -50,
      rotation: 20,
    }
  );
}

// _____________ Swiper Galleries _________________

//_______ Home Hero
const swiperHomeHero = new Swiper('.swiper.is-home-hero', {
  // Optional parameters
  effect: 'slide',
  loop: true,
  parallax: true,
  slidesPerView: 1,
  autoplay: {
    delay: 2000,
  },
  speed: 1000,
});

//_______ Home Press
const swiperHomePress = new Swiper('.swiper.is-press', {
  // Optional parameters
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 800,
  },
  speed: 10,
});

//_______ Home Trust Logos
const swiperHomeTrust = new Swiper('.swiper.trust-home-logos', {
  // Optional parameters
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 500,
  },
  speed: 10,
});
