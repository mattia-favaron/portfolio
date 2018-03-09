$(document).ready(function() {
  var windowHeight = window.innerHeight;
  var homeArrow, projectArrow, aboutArrow;

  $('#fullpage').fullpage({
    //Navigation
    anchors:['home','project','about','contacts'],
    //Scrolling
    scrollingSpeed: 1000,
    controlArrows: true,
    sectionsColor : ['#1d71b8', '#fff', '#fff', '#1d71b8'],
    //events
    afterRender: function(){
      homeArrow = (window.innerHeight - ($('#homeDown').offset().top)) - 100;
      projectArrow = (window.innerHeight*2 - ($('#projectDown').offset().top)) - 100;
      aboutArrow = (window.innerHeight*3 - ($('#aboutDown').offset().top)) - 100;
      $('#homeDown').css({top: homeArrow});
      $('#projectDown').css({top: projectArrow});
      $('#aboutDown').css({top: aboutArrow});
      $('#homeDown img').addClass("fadeInAnimation");
      resizeProjectImage();
    },
    onLeave: function(index, nextIndex) {
      if(index == 1) {
        $('#presentationSubtitle').remove();
        $('#presentation .hidden').removeClass('hidden');
        $('.typed-cursor').remove();
        $('#homeDown img').addClass("fadeInAnimation");
      }
      if (nextIndex == 3 || nextIndex == 2) {
        $('ul li a span').css({"transition" : "all 0.5s ease", "background" : "#1d71b8"});
      } else {
        $('ul li a span').css({"transition" : "all 0.5s ease", "background" : "#fff"});
      }
    },
    afterSlideLoad: function(anchorLink, index) {
      if(index == 1 || index == 2) {
        $('.active .active .imageProject .deviceImage').addClass("deviceAnimate");
      }
    },
    afterResize: function(){
      resizeProjectImage();
      var resizeDimension = (window.innerHeight - windowHeight)/2;
      homeArrow += resizeDimension;
      projectArrow += resizeDimension;
      aboutArrow += resizeDimension;
      $('#homeDown').css({top: homeArrow});
      $('#projectDown').css({top: projectArrow});
      $('#aboutDown').css({top: aboutArrow});
      windowHeight = window.innerHeight;
    }
  });

  $('#presentationSubtitle').typed({
    strings: ["a tech enthusiast and a...", "an amazing...","a big idiot","a...","a front-end web developer!"],
    stringsElement: null,
    startDelay: 3000,
    backDelay: 750,
    showCursor: true,
    cursorChar: "|",
    contentType: 'html',
    callback: function() {
    }
  });

  function resizeProjectImage(){
    if(window.innerHeight < 720) {
      $('.imageProject .pcImage').css({"width" : "30%"});
      $('.imageProject .deviceImage').css({"width" : "30%"});
    } else {
      $('.imageProject .pcImage').css({"width" : "42%"});
      $('.imageProject .deviceImage').css({"width" : "42%"});
    }
  };


  //svg inline converter
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');
      // Add replaced image's ID to the new SVG
      if(typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
      }
      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');
      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');
  });
});
