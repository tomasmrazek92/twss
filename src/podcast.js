$(document).ready(cardParallax);
$(document).ready(hostedParallax);
$(document).ready(notesParallax);

function cardParallax() {
  let heroParallax = gsap.timeline({
    scrollTrigger: {
      trigger: '.podcast_hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.75,
    },
  });
  heroParallax.fromTo(
    '.podcast_hero-art',
    {
      yPercent: -10,
      rotation: 10,
    },
    {
      yPercent: 50,
      rotation: -10,
    }
  );
}

function hostedParallax() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.podcast_hosted',
      start: 'top bottom',
      end: 'bottom center',
      scrub: 0.75,
    },
  });
  tl.fromTo(
    '.podcast_hosted-img-box',
    {
      yPercent: 20,
      rotation: 15,
    },
    {
      yPercent: -20,
      rotation: 5,
    }
  );
}

function notesParallax() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.podcast-ep_info-cover',
      start: 'top bottom',
      end: 'bottom center',
      scrub: 0.75,
    },
  });
  tl.fromTo(
    '.podcast-ep_info-cover',
    {
      rotation: 0,
    },
    { rotation: 7 }
  );
}
