$(document).ready(heroParallax);
$(document).ready(timelineMove);

gsap.registerPlugin(ScrollTrigger);

function heroParallax() {
  let heroParallax = gsap.timeline({
    scrollTrigger: {
      trigger: '.story_hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
  heroParallax.fromTo(
    '.story_hero-image',
    {
      yPercent: 10,
      rotation: 2,
    },
    {
      yPercent: -50,
      rotation: -3,
    }
  );
}

function timelineMove() {
  let timelineTrigger = $("[timeline-move='trigger']");

  timelineTrigger.each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top bottom',
        end: 'top, 60%',
        toggleActions: 'none play none reset',
      },
    });

    tl.from($(this).find('.timeline_image-mask'), {
      x: '0%',
      duration: 1.25,
      ease: 'power3.inOut',
    });

    tl.to(
      $(this).find('.timeline-img'),
      {
        scale: 1.15,
        duration: 1.5,
        ease: 'power3.inout',
      },
      '<'
    );

    tl.from(
      $(this).find("[timeline-move='fade']"),
      {
        y: '2rem',
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power1.out',
        stagger: { amount: 0.4 },
      },
      '<'
    );
  });
}
