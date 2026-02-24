/*=============== INITIALIZATION CHECK ===============*/
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio scripts initializing...');

  if (typeof anime === 'undefined') {
    console.error('Animation error: Anime.js V4 not loaded. Check CDN.');
  }

  if (typeof ScrollReveal === 'undefined') {
    console.error('Animation error: ScrollReveal not loaded. Check path.');
  }

  if (typeof anime !== 'undefined') {
    const { animate, text, stagger } = anime;

    /*=============== HOME SPLIT TEXT ===============*/
    try {
      const { chars: chars1 } = text.split('.home__profession-1', { chars: true });
      const { chars: chars2 } = text.split('.home__profession-2', { chars: true });

      animate(chars1, {
        y: [
          { to: ['100%', '0%'] },
          { to: '-100%', delay: 4000, ease: 'in(3)' }
        ],
        duration: 900,
        ease: 'out(3)',
        delay: stagger(80),
        loop: true,
      });

      animate(chars2, {
        y: [
          { to: ['100%', '0%'] },
          { to: '-100%', delay: 4000, ease: 'in(3)' }
        ],
        duration: 900,
        ease: 'out(3)',
        delay: stagger(80),
        loop: true,
      });
    } catch (e) {
      console.warn('Split text animation skipped or failed:', e);
    }
  }

  /*=============== SWIPER PROJECTS ===============*/
  if (typeof Swiper !== 'undefined' && document.querySelector('.projects__swiper')) {
    const swiperProjects = new Swiper('.projects__swiper', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 'auto',
      grabCursor: true,
      speed: 600,


      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
    });
  }


  /*=============== WORK TABS ===============*/
  const tabs = document.querySelectorAll('[data-target]');
  const tabContents = document.querySelectorAll('[id="experience"], [id="education"]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetSelector = tab.dataset.target;
      const targetContent = document.querySelector(targetSelector);

      // Disable all content and active tabs
      tabContents.forEach((content) => {
        content.classList.remove('work-active');
      });
      tabs.forEach((t) => {
        t.classList.remove('work-active');
      });

      // Active the tab and corresponding content
      tab.classList.add('work-active');
      if (targetContent) {
        targetContent.classList.add('work-active');
      }
    });
  });




  /*=============== SERVICES ACCORDION ===============*/
  const servicesButtons = document.querySelectorAll('.services__button')
  const servicesCards = document.querySelectorAll('.services__card')

  servicesButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentCard = button.parentNode
      const currentInfo = currentCard.querySelector('.services__info')
      const isCardOpen = currentCard.classList.contains('services-open')

      // Close all cards
      servicesCards.forEach(card => {
        card.classList.remove('services-open')
        card.classList.add('services-close')

        const info = card.querySelector('.services__info')
        if (info) info.style.height = '0'
      })

      // Open clicked card if it was closed
      if (!isCardOpen) {
        currentCard.classList.remove('services-close')
        currentCard.classList.add('services-open')
        currentInfo.style.height = currentInfo.scrollHeight + 'px'
      }
    })
  })


  /*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/


  /*=============== COPY EMAIL IN CONTACT ===============*/


  /*=============== CURRENT YEAR OF THE FOOTER ===============*/


  /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


  /*=============== CUSTOM CURSOR ===============*/


  /* Hide custom cursor on links */


  /*=============== SCROLL REVEAL ANIMATION ===============*/
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
    })

    sr.reveal(`.home__data, .home__image, .about__data, .about__image, .services__card, .projects__container, .work__container, .testimonials__card, .contact__container, .footer__container`)
    sr.reveal(`.home__info`, { origin: 'bottom' })
    sr.reveal(`.home__social-link`, { interval: 100 })
    sr.reveal(`.about__description, .about__perfil`, { origin: 'right' })
    sr.reveal(`.about__data, .about__img`, { origin: 'left' })
    sr.reveal(`.services__card`, { interval: 100 })
  }
});
