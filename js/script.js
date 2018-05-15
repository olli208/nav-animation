(function() {
  navScroll();
  scrollAnimate();
  introScroll();
  showGrid();

  function showGrid() {
    $('.grid').on('click' , function() {
      $('.gridModal').addClass('active');

      $('.gridItem').each(function (i , el) {
        $(el).addClass('fadeInLeft');
      })
    })

    $('.closeGrid').on('click' , function() {
      $('.gridModal').removeClass('active');
    })

    $('.gridItem').each(function(i ,el) {
      $(el).on('click' , function() {
        $('.gridModal').removeClass('active');
      })
    })
  }


  function introScroll() {
    var scrollPixels = 0; // variable to store scroll delta
    var scrollticker; // - don't need to set this in every scroll
    
    document.querySelector('.intro').addEventListener( 'DOMMouseScroll', function( e ) {
      // detect direction logic
      handleMouseWheelDirection( detectMouseWheelDirection(e) )
    });
  }

  function detectMouseWheelDirection( e )
{
    var delta = null,
        direction = false
    ;
    if ( !e ) { // if the event is not provided, we get it from the window object
        e = window.event;
    }
    if ( e.wheelDelta ) { // will work in most cases
        delta = e.wheelDelta / 60;
    } else if ( e.detail ) { // fallback for Firefox
        delta = -e.detail / 2;
    }
    if ( delta !== null ) {
        direction = delta > 0 ? 'up' : 'down';
    }

    return direction;
}

function handleMouseWheelDirection( direction )
{

    var scrollPixels = 0; // variable to store scroll delta
    var scrollticker; // - don't need to set this in every scroll
    if ( direction == 'down' ) {
        // do something, like show the next page
        console.log('down')

        if (scrollticker) {
          window.clearTimeout(scrollticker);
          scrollticker = null;
        }
        
        scrollticker = window.setTimeout(function() {
          $('.intro').addClass('fadeOutUpBig');
          $('aside h1 span').attr('class' , 'animated up first fadeInUp section1 special'); 
          $('aside button').attr('class' , 'animated up first fadeInUp section1 special'); 
        },500);
    } else if ( direction == 'up' ) {
        // do something, like show the previous page
    } else {
        // this means the direction of the mouse wheel could not be determined
    }
}

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

            $('aside h1:first-of-type').html($(this).html()); // change title on the aside
            $('aside h1 span').html($(this).html()); 
            $('aside p').html($(this).siblings( "p" ).html()); 
            $('aside h1 span').attr('class' , 'animated up first fadeInUp ' +  $(this).closest('.section-name').attr('id')); 
            $('aside button').attr('class' , 'animated up first fadeInUp ' +  $(this).closest('.section-name').attr('id')); 

            $(this).parent().addClass('active'); // add active class to section

            // console.log($(this).closest('.section-name').attr('id'));

            $('a[href="#' + $(this).closest('.section-name').attr('id') + '"]').closest('li').addClass('active');
          }

        });

        if ($('.section-name').last().offset().top <= -400 ) {
          $('a[href="#section1"]').closest('li').addClass('active');
          $('#section1 .bg-img-content').addClass('active');

          $('aside h1 span').html($('#section1 h2').html()); 
          $('aside h1 span').attr('class', 'animated up first fadeInUp section1'); 
          $('aside button').attr('class', 'animated up first fadeInUp section1'); 

          $('.main-content').append($('.bg-img'))

        }
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
