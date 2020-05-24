// "use strict";



function pagination() {
  var $wrap = $(".wrapper"),
    pages = $(".page").length,
    scrolling = false,
    currentPage = 1,
    $navPanel = $(".nav-panel"),
    $scrollBtn = $(".scroll-btn"),
    $navBtn = $(".nav-btn");

  /*****************************
   ***** NAVIGATE FUNCTIONS *****
   *****************************/
  function manageClasses() {
    $wrap.removeClass(function(index, css) {
      return (css.match(/(^|\s)active-page\S+/g) || []).join(" ");
    });
    $wrap.addClass("active-page" + currentPage);
    $navBtn.removeClass("active");
    $(".nav-btn.nav-page" + currentPage).addClass("active");
    $navPanel.addClass("invisible");
    scrolling = true;
    setTimeout(function() {
      $navPanel.removeClass("invisible");
      scrolling = false;
    }, 1200);
  }
  function navigateUp() {
    if (currentPage > 1) {
      currentPage--;
      if (Modernizr.csstransforms) {
        manageClasses();
      } else {
        $wrap.animate({ top: "-" + (currentPage - 1) * 100 + "%" }, 1000);
      }
    }
  }

  function navigateDown() {
    if (currentPage < pages) {
      currentPage++;
      if (Modernizr.csstransforms) {
        manageClasses();
      } else {
        $wrap.animate({ top: "-" + (currentPage - 1) * 100 + "%" }, 1000);
      }
    }
  }

  /*********************
   ***** MOUSEWHEEL *****
   *********************/
  $(document).on("mousewheel DOMMouseScroll", function(e) {
    if (!scrolling) {
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ) {
        navigateUp();
        // console.log(e.originalEvent);
      } else {
        navigateDown();
      }
    }
  });

  var ts;
  $(document).bind('touchstart', function (e){
     ts = e.originalEvent.touches[0].clientY;
  });

  $(document).bind('touchend', function (e){
     var te = e.originalEvent.changedTouches[0].clientY;
     if(ts > te+5){
        navigateDown();
     }else if(ts < te-5){
        navigateUp();
     }
  });

  /**************************
   ***** RIGHT NAVIGATION ****
   **************************/

  /* NAV UP/DOWN BTN PAGE NAVIGATION */
  $(document).on("click", ".scroll-btn", function() {
    if ($(this).hasClass("up")) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  /* NAV CIRCLE DIRECT PAGE BTN */
  $(document).on("click", ".nav-btn:not(.active)", function() {
    if (!scrolling) {
      var target = $(this).attr("data-target");
      if (Modernizr.csstransforms) {
        $wrap.removeClass(function(index, css) {
          return (css.match(/(^|\s)active-page\S+/g) || []).join(" ");
        });
        $wrap.addClass("active-page" + target);
        $navBtn.removeClass("active");
        $(this).addClass("active");
        $navPanel.addClass("invisible");
        currentPage = target;
        scrolling = true;
        setTimeout(function() {
          $navPanel.removeClass("invisible");
          scrolling = false;
        }, 1000);
      } else {
        $wrap.animate({ top: "-" + (target - 1) * 100 + "%" }, 1000);
      }
    }
  });
};

function test(){

  $("#button").click(function(){
    $.ajax({
      url: "https://mizarnevelli.github.io/pages/test.html",
      success: function(result){
        console.log(result);
       $("#div1").html(result);
    }});
  });

}

function init() {
  // test()
  test();
  pagination();

}

$(document).ready(init);
