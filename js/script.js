(function() {
  var section1 = '#13B0CC'; //blue
  var section2 = '#DF5028'; //orange
  var section3 = '#CD1330'; //red
  var section4 = '#ECAF2A'; // yellow
  var section5 = '#1342AF'; // blueish

  // letterIndicator();
  navScroll();
  scrollAnimate();

  // Calculate the ofsett of an element from top
  function offset(el) {
    var rect = el.getBoundingClientRect();
    return { top: rect.top };
  }

  // There is a CSS version that works in some browser
  // but it doenst give control to the speed of animation
  function navScroll() {
    var nav = document.querySelectorAll(".nav li a");

    nav.forEach(el => {
      el.addEventListener("click", function(ev) {
        ev.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
        // document.querySelector('#'+ el.getAttribute('href').slice(1)).scrollIntoView();
      });
    });
  }

  function scrollAnimate() {
    var scrollPixels = 0; // variable to store scroll delta
    var scrollticker; // - don't need to set this in every scroll

    var backgrounds = $(".bg-img .section-name h2");
    var animatedTexzt = $("aside .animated.up");

    $(".bg-img").on("scroll", function(e) {
      // Clear Timeout if one is pending
      if (scrollticker) {
        window.clearTimeout(scrollticker);
        scrollticker = null;
      }

      // Fade Out Up
      animatedTexzt.each(function(i, el) {
        $(el).addClass("fadeOutUp");
      });

      scrollticker = window.setTimeout(function() {
        // console.log("SKRRTTTTT", $(".bg-img").scrollTop());

        // Fade In From Bottom
        animatedTexzt.each(function(i, el) {
          $(el).removeClass("fadeOutUp");
          $(el).addClass("fadeInUp");
        });

        backgrounds.each(function(i, el) {
          $(el).parent().removeClass('active');
          $('a[href="#' + $(this).closest('.section-name').attr('id') + '"]').closest('li').removeClass('active');

          // The Active Section:
          if ($(el).offset().top === 0) {
            console.log( $(this).closest('.section-name').attr('id') );

            $('aside h1:first-of-type').html($(this).html()); // change title on the aside
            $('aside h1 span').html($(this).html()); 
            $('aside h1 span').attr('class' , 'animated up first fadeInUp ' +  $(this).closest('.section-name').attr('id')); 
            $('aside button').attr('class' , 'animated up first fadeInUp ' +  $(this).closest('.section-name').attr('id')); 

            $(this).parent().addClass('active'); // add active class to section

            // console.log($(this).closest('.section-name').attr('id'));

            $('a[href="#' + $(this).closest('.section-name').attr('id') + '"]').closest('li').addClass('active');
          }
        });

      }, 150);

    });
  }

  function smoothScroll(toElement, speed) {
    var pointer = toElement.getAttribute("href").slice(1);
    var elem = document.getElementById(pointer);
    var elemOffset = elem.offsetTop;

    // console.log(event.target.getAttribute('href').slice(1)) // Works also need testing in IE

    var counter = setInterval(function() {
      //  returns the number of pixels that the document is currently scrolled vertically
      document.querySelector("bg-img").pageYOffset;

      if (document.querySelector("bg-img").pageYOffset > elemOffset) {
        document
          .querySelector("bg-img")
          .scrollTo(0, document.querySelector("bg-img").pageYOffset);
        document.querySelector("bg-img").pageYOffset -= speed;

        if (document.querySelector("bg-img").pageYOffset <= elemOffset) {
          clearInterval(counter);
          document.querySelector("bg-img").scrollTo(0, elemOffset);
        }
      } else {
        document
          .querySelector("bg-img")
          .scrollTo(0, document.querySelector("bg-img").pageYOffset);
        document.querySelector("bg-img").pageYOffset += speed;

        if (document.querySelector("bg-img").pageYOffset >= elemOffset) {
          clearInterval(counter);
          document.querySelector("bg-img").scrollTo(0, elemOffset);
        }
      }
    }, 1);
  }
  
})();
