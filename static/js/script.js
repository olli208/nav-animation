(function () {
  
  letterIndicator();
  navScroll();
  scrollAnimate();

  // Calculate the ofsett of an element from top
  function offset(el) {
    var rect = el.getBoundingClientRect();
    return { top: rect.top }
  }

  // Check which name section is at the top of the page
  function letterIndicator() {
    var sectionBegin = document.querySelectorAll('main section h2');
    var sideNav = document.querySelector('aside');

    window.addEventListener('scroll', function (e) {
      for (i = 0; i < sectionBegin.length; i++) {
        var divOffset = offset(sectionBegin[i]);
        var currentLetter = sectionBegin[i].innerHTML;

        if (divOffset.top > -100 && divOffset.top <= 50) {
          // console.log(el , 'IS BOVEN');

          var letterNav = document.querySelector('aside #nav-' + currentLetter);
          letterNav.className = ' nav big';
        } else {
          var letterNav = document.querySelector('aside #nav-' + currentLetter);
          letterNav.className = ' nav';
        }
      }

    })
  }

  // There is a CSS version that works in some browser 
  // but it doenst give control to the speed of animation
  function navScroll() {
    var nav = document.querySelectorAll('.nav li a');

    nav.forEach(el => {
      el.addEventListener('click', function (ev) {
        ev.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // document.querySelector('#'+ el.getAttribute('href').slice(1)).scrollIntoView();
      })
    })
  }

  function scrollAnimate() {
    var scrollPixels = 0; // variable to store scroll delta
    var scrolling; // timeout function var

    document.querySelector('aside').addEventListener('mousewheel', function (e) {
      // increment/decrement scroll delta
      scrollPixels += e.deltaY;

      clearTimeout(scrolling);

      scrolling = setTimeout(function () {

        console.log('stop wheeling! ', scrollPixels);
        scrolling = undefined;
        var backgrounds = document.querySelectorAll('.bg-img section')

        if (scrollPixels <= -500) {
          scrollPixels = 0; // clear scroll delta

          // console.log(document.querySelector('.bg-img section'));

          backgrounds.forEach(el => {
            const slide = (window.scrollY + window.innerHeight) - el.offsetHeight;
            const elBottom = el.offsetTop + el.offsetHeight
            console.log(elBottom);

            var isElementInView = Utils.isElementInView(el, false);

            // if (isElementInView) {
            //   console.log(el , 'is in view');
            //   el.className = 'section-name active'
            // } else {
            //   console.log(el , 'is out of view');
            //   el.className = 'section-name'
            // }
          })

        }
        else if (scrollPixels >= 500) {
          scrollPixels = 0; // clear scroll delta

          console.log('DOWN');

          // var isElementInView = Utils.isElementInView($('.bg-img section'), false);

          // if (isElementInView) {
          //   console.log('in view');
          // } else {
          //   console.log('out of view');
          // }
        }

      }, 250);
    });
  }

  function smoothScroll(toElement, speed) {
    var pointer = toElement.getAttribute('href').slice(1);
    var elem = document.getElementById(pointer);
    var elemOffset = elem.offsetTop; 
  
    // console.log(event.target.getAttribute('href').slice(1)) // Works also need testing in IE
  
    var counter = setInterval(function() {
      //  returns the number of pixels that the document is currently scrolled vertically
      document.querySelector('bg-img').pageYOffset;
  
      if (document.querySelector('bg-img').pageYOffset > elemOffset) { 
          document.querySelector('bg-img').scrollTo(0, document.querySelector('bg-img').pageYOffset);
          document.querySelector('bg-img').pageYOffset -= speed;
  
          if (document.querySelector('bg-img').pageYOffset <= elemOffset) {
              clearInterval(counter);
              document.querySelector('bg-img').scrollTo(0, elemOffset);
          }
      } else { 
          document.querySelector('bg-img').scrollTo(0, document.querySelector('bg-img').pageYOffset);
          document.querySelector('bg-img').pageYOffset += speed;
  
          if (document.querySelector('bg-img').pageYOffset >= elemOffset) { 
              clearInterval(counter);
              document.querySelector('bg-img').scrollTo(0, elemOffset);
          }
      }
    }, 1);
  }

function Utils() {

}

Utils.prototype = {
  constructor: Utils,
  isElementInView: function (element, fullyInView) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
      return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
      return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
  }
};

var Utils = new Utils();

}())