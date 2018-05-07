(function() {
  // letterIndicator();
  navScroll();
  scrollAnimate();

  // Calculate the ofsett of an element from top
  function offset(el) {
    var rect = el.getBoundingClientRect();
    return { top: rect.top };
  }

  // Check which name section is at the top of the page
  // function letterIndicator() {
  //   var sectionBegin = document.querySelectorAll("main section h2");
  //   var sideNav = document.querySelector("aside");

  //   window.addEventListener("scroll", function(e) {
  //     for (i = 0; i < sectionBegin.length; i++) {
  //       var divOffset = offset(sectionBegin[i]);
  //       var currentLetter = sectionBegin[i].innerHTML;

  //       if (divOffset.top > -100 && divOffset.top <= 50) {
  //         // console.log(el , 'IS BOVEN');

  //         var letterNav = document.querySelector("aside #nav-" + currentLetter);
  //         letterNav.className = " nav big";
  //       } else {
  //         var letterNav = document.querySelector("aside #nav-" + currentLetter);
  //         letterNav.className = " nav";
  //       }
  //     }
  //   });
  // }

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
          $('a[href="#' + $(this).closest('.section-name').attr('id') + '"]').removeClass('active');

          // The Active Section:
          if ($(el).offset().top === 0) {

            $('aside h1').html($(this).html()); // change title on the aside
            $(this).parent().addClass('active'); // add active class to section

            console.log($(this).closest('.section-name').attr('id'));

            $('a[href="#' + $(this).closest('.section-name').attr('id') + '"]').addClass('active');

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

  // function Utils() {

  // }

  // Utils.prototype = {
  //   constructor: Utils,
  //   isElementInView: function (element, fullyInView) {
  //     var pageTop = $(window).scrollTop();
  //     var pageBottom = pageTop + $(window).height();
  //     var elementTop = $(element).offset().top;
  //     var elementBottom = elementTop + $(element).height();

  //     if (fullyInView === true) {
  //       return ((pageTop < elementTop) && (pageBottom > elementBottom));
  //     } else {
  //       return ((elementTop   <= pageBottom) && (elementBottom >= pageTop));
  //     }
  //   }
  // };

  // var Utils = new Utils();

  $.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: "animationend",
          OAnimation: "oAnimationEnd",
          MozAnimation: "mozAnimationEnd",
          WebkitAnimation: "webkitAnimationEnd"
        };

        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement("div"));

      this.addClass("animated " + animationName).one(animationEnd, function() {
        $(this).removeClass("animated " + animationName);

        if (typeof callback === "function") callback();
      });

      return this;
    }
  });
})();
