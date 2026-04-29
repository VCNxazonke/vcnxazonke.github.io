/**
* Template Name: iPortfolio - v3.3.0 (thank you from Vuyi iPortfolio)
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element and triggers zoom-in effect (replaces smooth scroll)
   */
  const ZOOM_DURATION_MS = 800
  const scrollto = (el) => {
    const target = select(el)
    if (!target) return
    let elementPos = target.offsetTop
    // Remove zoom class from any section that had it
    document.querySelectorAll('section.section-zoom-in').forEach(s => s.classList.remove('section-zoom-in'))
    // Scroll to section first
    window.scrollTo({ top: elementPos, left: 0, behavior: 'auto' })
    // Trigger zoom-in after paint so the section is in view when it animates
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.classList.add('section-zoom-in')
        setTimeout(() => target.classList.remove('section-zoom-in'), ZOOM_DURATION_MS)
      })
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (this.hash && select(this.hash)) {
      e.preventDefault()
      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Dynamic Content: Age, Experience and Copyright Year
   */
  window.addEventListener('load', () => {
    // Age Calculation
    const ageElement = document.getElementById('age');
    if (ageElement) {
      const birthDate = new Date('1990-01-12');
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      ageElement.textContent = age;
    }

    // Dynamic Years of Experience (from April 2013)
    const experienceElement = document.getElementById('years-experience');
    if (experienceElement) {
      const startDate = new Date('2013-04-01');
      const today = new Date();
      let years = today.getFullYear() - startDate.getFullYear();
      const mExp = today.getMonth() - startDate.getMonth();
      if (mExp < 0 || (mExp === 0 && today.getDate() < startDate.getDate())) {
        years--;
      }
      if (years < 0) years = 0;
      experienceElement.setAttribute('data-purecounter-end', years.toString());
      experienceElement.textContent = years.toString();
    }

    // Copyright Year
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  });

  /**
   * Service worker registration & basic notification setup (PWA)
   */
  let deferredInstallPrompt;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
          // Request notification permission and show a welcome notification once
          if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                registration.showNotification('Vuyisile\'s iResume ready for offline use', {
                  body: 'Thank you for allowing notifications. Please note that this CV can now be accessed even when you are offline🛜.',
                  icon: 'assets/img/favicon.png',
                  badge: 'assets/img/favicon.png'
                });
              }
            });
          }
        })
        .catch((err) => {
          console.error('Service worker registration failed:', err);
        });
    });
  }

  // Capture beforeinstallprompt so we can show our own Install button
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'inline-flex';
    }
  });

  // Wire up Install button click
  window.addEventListener('load', () => {
    const installButton = document.getElementById('pwa-install-button');
    if (!installButton) return;

    installButton.addEventListener('click', async () => {
      if (!deferredInstallPrompt) {
        alert('Install is not available in this browser or context yet.');
        return;
      }
      deferredInstallPrompt.prompt();
      const { outcome } = await deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        installButton.style.display = 'none';
      }
      deferredInstallPrompt = null;
    });
  });

})()


/*
// FROM INDEX.JS Code

//VC Nxazonke's iResume FIREBASE 🔥 CONNECTION: Configuration

var firebaseConfig = {
    apiKey: "AIzaSyCAdolseetSsQ-rnr9LQoSQQgoDRnHqx1s",
    authDomain: "nxazonkevc-iresum.firebaseapp.com",
    projectId: "nxazonkevc-iresum",
    storageBucket: "nxazonkevc-iresum.appspot.com",
    messagingSenderId: "543253471759",
    appId: "1:543253471759:web:f562b7e67cc6e1f6dcb97a",
    measurementId: "G-SPSG16MY7E"
  };

  
  // INITIALIZE FIREBASE 🔥
  firebase.initializeApp(firebaseConfig);
  
  // Reference clientInfo collections
  let clientInfo = firebase.database().ref("Infos");
  
  // Listen for form submit
  
  document.querySelector('.php-email-form').addEventListener(submit, submitFormFunc);
  
  document.getElementById('submit-button').addEventListener(submit, submitFormFunc);
  
  document.getElementById('form').addEventListener(submit, submitFormFunc);
  
  
  // submitFormFunc Function
  function submitFormFunc(e){
  e.preventDefault();
  
  // getActualInputs Values
  
  let name = querySelector('.name').value;
  let email = querySelector('.email').value;
  let subject = querySelector('.subject').value;
  let number = querySelector('.number').value;
  let company = querySelector('.company').value;
  let message = querySelector('.message').value;
  
  saveContactInfo(name, email, subject, number, company, message);
  
  document.querySelector(".php-email-form").reset();
  
  sendEmail(name, email, subject, number, company, message);
  }
  
  //Save data to FIREBASE 🔥
  function saveContactInfo(name, email, subject, number, company, message) {
     let newContactInfo = contactInfo.push();
     newContactInfo.set({
        name = name, 
        email = email, 
        subject = subject, 
        number = number, 
        company = company, 
        message = message,
     });
  retrieveInfos();
  }
  
  // retrieveInfos function
  function retrieveInfos() {
     let ref = firebase.database().ref("infos");
     ref.on("value", gotData);
  }
  
  // gotData function
  function gotData(data) {
     let info = data.val();
     let keys = Object.keys(info);
  
  for (let i= 0; i < keys.length; i++) {
     let infoData = keys[i];
     let name = info[infoData].name;
     let email = info[infoData].email;
     let subject = info[infoData].subject;
     let number = info[infoData].number;
     let company = info[infoData].company;
     let message = info[infoData].message;
     console.log(name, email, subject, number, company, message)
  
     let infosResults = document.querySelector(".infosResults");
  
     infosResults.innerHTML += `<div>
     <p><strong>Name: <strong/>${name} <br/>
     <a><strong>eMail: <strong/>${email} </a><br/>
     <a><strong>Subject: <strong/>${subject} </a><br/>
     <a><strong>Number: <strong/>${number} </a><br/>
     <a><strong>Company: <strong/>${company} </a><br/>
     <a><strong>Message: <strong/>${message} </a><br/>
     </p>  
     </div>`;
     }
  }
  
  retrieveInfos();
  
  // Send e-Mail function
     
  function sendEmail(name, email, subject, number, company, message) {
  Email.send({
     Host: "smtp.gmail.com",
     Username: "vcnxazonke@gmail.com",
     Password: "123456789",
     To: "vcnxazonke@gmail.com",
     CC: "vcnxazonke@yahoo.com",
     From: "vcnxazonke@gmail.com",
     Subject: `${name} sent you a message`,
     Body: `Name: ${name} <br/>
     Subject: ${subject} <br/>
     Number: ${number} <br/>
     Company: ${company} <br/>
     Message: ${message}`,
     }).then((message)=> alert("Mail to Vuyisile has been successfully sent! Thank you...🙂"))
  }
  
  
  
  // getInputValues Function
  
  // function getInputValueFunc(id){
     //return document.getElementById('id').value;
  
      //}
*/