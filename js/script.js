(function() {
  navScroll();
  scrollAnimation();

  // Calculate the ofsett of an element from top
  function offset(el) {
    var rect = el.getBoundingClientRect();
    return { top: rect.top };
  }

  // when user clicks on navigation..
  function navScroll() {
    var nav = document.querySelectorAll(".nav li a");

    nav.forEach(el => {
      el.addEventListener("click", function(ev) {
        ev.preventDefault();

        // .. smoothscroll animation to section
        document.querySelector(this.getAttribute("href")).scrollIntoView({behavior: "smooth"});
      });
    });
  }

  // animate things from the aside
  function scrollAnimation() {
    var scrollticker; // - don't need to set this in every scroll

    var backgrounds = document.querySelectorAll(".bg-img .section-name h2");
    var animatedText = document.querySelectorAll("aside .animated.up");

    document.querySelector(".bg-img").addEventListener('scroll', function(e) {
      // Clear Timeout if one is pending
      if (scrollticker) {
        window.clearTimeout(scrollticker);
        scrollticker = null;
      }

      // Fade Out Up everytime scroll is activated regardless
      animatedText.forEach(function(el) {
        el.classList.add('fadeOutUp');
      });

      scrollticker = window.setTimeout(function() {
        // Fade In From Bottom the active title
        animatedText.forEach(function(el) {
          el.classList.remove('fadeOutUp');
          el.classList.add('fadeInUp');
        });

        backgrounds.forEach(function(el) {

          var attrOfAside = el.closest('.section-name').getAttribute('id');
          document.querySelector('a[href="#' + attrOfAside + '"]').closest('li').classList.remove('active');

          // The Active Section:
          if (el.getBoundingClientRect().top === 0) {

            document.querySelector('aside h1:first-of-type').innerHTML = el.innerHTML; // change title on the aside
            document.querySelector('aside h1 span').innerHTML = el.innerHTML; // change background of title 
            document.querySelector('aside p').innerHTML = el.parentNode.querySelector( "p" ).innerHTML; // sectionDescriptiorn

            document.querySelector('aside h1 span').setAttribute('class' , 'animated up first fadeInUp ' +  el.closest('.section-name').getAttribute('id')); 
            document.querySelector('aside button').setAttribute('class' , 'animated up first fadeInUp ' +  el.closest('.section-name').getAttribute('id')); 

            el.parentNode.classList.add('active'); // add active class to section

            document.querySelector('a[href="#' + el.closest('.section-name').getAttribute('id') + '"]').closest('li').classList.add('active'); // add active class to background image on the left
          }

        });
      }, 150);

    });
  }
  
})();
