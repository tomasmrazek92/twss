$(document).ready(loadPageWipe);
$(document).ready(function () {
  $('a').on('click', pageWipe);
});

function pageWipe(e) {
  if (
    $(this).prop('hostname') === window.location.host &&
    $(this).attr('href').indexOf('#') === -1 &&
    $(this).attr('target') !== '_blank' &&
    !$(this).attr('href').startsWith('?')
  ) {
    e.preventDefault();
    let destination = $(this).attr('href');
    gsap.set('.page_wipe-wrapper', { display: 'block' });
    gsap.fromTo(
      '.page_wipe-top',
      { x: '-100vw' },
      {
        x: '0vw',
        duration: 1,
        ease: 'power2.inOut',
      }
    );
    gsap.fromTo(
      '.page_wipe-mid',
      { x: '-100vw' },
      {
        x: '0vw',
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.2,
      },
      '<'
    );
    gsap.fromTo(
      '.page_wipe-bottom',
      { x: '-100vw' },
      {
        x: '0vw',
        duration: 0.6,
        ease: 'power2.inOut',
        delay: 0.2,
        onComplete: () => {
          window.location = destination;
        },
      },
      '<'
    );
  }
}

// Page Wipe Entry on pageload
function loadPageWipe() {
  // Grid Wipe to end
  /*gsap.fromTo(
    ".load_starline-left",
    { width: "15rem" },
    {
      width: "2rem",
      duration: 1,
    },
  );*/
  gsap.fromTo(
    '.page_wipe-bottom',
    { x: '0vw' },
    {
      x: '100vw',
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set('.page_wipe-wrapper', { display: 'none' });
      },
    }
  );
  gsap.fromTo(
    '.page_wipe-mid',
    { x: '0vw' },
    {
      x: '100vw',
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.2,
    },
    '<'
  );
  gsap.fromTo(
    '.page_wipe-top',
    { x: '0vw' },
    {
      x: '100vw',
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.2,
    },
    '<'
  );
}
// Back Button Reset
// On click of the back button
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};
