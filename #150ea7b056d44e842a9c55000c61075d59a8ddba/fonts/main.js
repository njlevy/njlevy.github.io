$(function () {
      var h = 0, h2 = 0, h3 = 0;

        h2 = ($('ol.expandable li:nth-child(1)').outerHeight(true) + $('ol.expandable li:nth-child(2)').outerHeight(true));
        h3 = ($('ol.expandable li:nth-child(3)').outerHeight(true) + $('ol.expandable li:nth-child(4)').outerHeight(true));
         $('ol.expandable li').each(function(){
       
            h = h + ($(this).outerHeight(true));

        });

    $.fn.clickToggle = function (func1, func2) {
        //clickToggle
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function () {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };

    function closeMenu() {
        // Closes menu and reverts hamburger when menu item is clicked on
        $('button.navbar-toggle').unbind('click').click(function () {
            $(this).toggleClass('is-active');
        });
        $('nav.navbar .navbar-nav li a').unbind('click').click(function () {
            $('.hamburger').removeClass('is-active');
            $('.hamburger').addClass('collapsed');
            $('.navbar-collapse').removeClass('in');
        });
//Closes menu and reverts hamburger menu when user clicks outside of menu
$(document).click(function(event) { 
    if(!$(event.target).closest('.navbar-collapse').length) {
        if($('.navbar-collapse').hasClass('in')) {

               $('.hamburger').removeClass('is-active');
            $('.hamburger').addClass('collapsed');
                  $('.navbar-collapse').removeClass('in');
        }
    }        
});
    }
 function measureLineHeight(element) {
        element.append('<div class="test">')
    var temp = element.children('div.test')
        temp.css({
        margin: 0,
      padding: 0,
      fontFamily: 'inherit',
      fontSize: 'inherit',
    })
    temp.html('check')
    var height = temp.height()
    temp.remove()
        return height
  }

    function collapseText(section) {
        //collapses content section, adds arrow or see more

        $(section).find($('.expandable:not(.collapsedHeight):not(.yfb-mobileCollapsed)')).each(function () {
               var lineThreshold = 7
      var height = $(this).height()
      var lineHeight = measureLineHeight($(this))

      if (height / lineThreshold > lineHeight) {
       
                $(this).addClass('collapsedHeight');
                     
                  keyFeaturesHeight();
                if ((!$(this).parent().find('a.expand').length) && (!$(this).parent().find('a.expandArrow').length)) {

                    if ($(this).hasClass('arrow')) {
                        $(this).after('<a href="#!" class="expandArrow yfb-highlight"><i class="fa fa-caret-down" aria-hidden="true"></i></a>');

                    } else {
                        $(this).after('<a href="#!" class="expand yfb-highlight">see more</a>');


                    }
      }


            }
});
        collapseHandler();

    }


    function collapseHandler() {
        //Collapse Handler
        $('.expand').unbind('click').clickToggle(function () {

            //expands/contracts  expandable elements
            $(this).prevAll('.expandable').removeClass("collapsedHeight");
            keyFeaturesHeight();
            $(this).text("See Less");

        }, function () {
            $(this).prevAll('.expandable').addClass("collapsedHeight");
            keyFeaturesHeight();
            $(this).text("See More");
        });

        $('.expandArrow').unbind('click').clickToggle(function () {
            //expands/contracts  expandable elements with arrow
            $(this).prevAll().removeClass("collapsedHeight");
            $(this).addClass("rotate");
            $(this).css('height', $(this).prop("scrollHeight"));
        }, function () {
            $(this).prevAll().addClass("collapsedHeight");
            $(this).removeClass("rotate");
        });

     }

     
  function slickStarter(){
           $(window).trigger('resize');
      $('div.yfb-slickTrigger').unbind('click').click(function () {
            $(window).trigger('resize');
            $('.yfb-populateSlideDescription').each(function () {

                $(this).html($(this).closest('.modal-dialog').find('.firstSlick img.slick-active').attr('data-description'));
            });
        });
  }
    function handleSlick() {
        
  slickStarter();

        $('.firstSlick').slick({
            autoplay: false,
            lazyLoad: 'ondemand',
            //            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            pauseOnHover: false,

            asNavFor: '.secondSlick',


            prevArrow: '<button type="button" class="slick-prev pull-left"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 168"><title>22Artboard 1</title><image width="96" height="168" transform="matrix(-1, 0, 0, 1, 96, 0)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACoCAYAAAAfI+vhAAAACXBIWXMAAAsSAAALEgHS3X78AAAFhklEQVR4Xu3Z8ZHbNhDFYZeQElhCSkAJLoEluAR0kBJcQkpgCSnBJaSEl8N4xpmRT/iJIna5C3Jnvv+ehB1L5uHdfZH05XYeDNxsYeBmCwM3Wxi42cLAzRYGbrYwcLOFAWfLC5mpYMBR/fCvLvYhYMDBnx/+0f+zvfCaaWDA2Df9/NY/Tn3htVPAgJE/9POb3pv2P4PeJz0MGPiqz7/1j9MeS+2DovdLDQMDtX/M79o3f4nfNzUMDFI+/NB7015L758WBgaoOjbtcTXtowgDBzxeL4/M3+LzUsLAm55dL4/MKj43HQzs9Mr18t2ZsiVjYIei8d/6x9nEe6SCgR2KfKaKd0kDAzu1e7vHTNOSMbBT+xkw6ubTm2laMgbe0L6dHjNFS8bAm6p8poh3CQ0DB2yyn/QtGQMHLLK/lrZJ3ZIxcNAqn2nn0C4hYWCA9g21nrQtGQMDtGe0x6NoE+8SDgYGKfKZKt4lFAwMdLfkT2BgoLslfwIDg90t+QEGDFT5TBHvcjoMGNlkPylaMgaMLPK5moZvyRgwtMpn2jm0y2kwYOzyLRkDxi7fkjHgoMhnqngXdxhwctmWjAEnl23JGHB0yZaMAWdVPlPEu7jAwAk22U+YloyBEyzyuZqGaMkYOMkqn2nn0C6mMHCiS7RkDJzoEi0ZAycr8pkq3sUEBgKYuiVjIICpWzIGgpi2JWMgkCqfKeJdhsFAMJvsx7UlYyCYRT5XU7eWjIGAVvlMO4d2OQwDQU3TkjEQ1DQtGQOBFflMFe/yNgwEl74lYyC49C0ZAwmkbskYSKLKZ4p4l10wkMgm+xnekjGQyCKfq+nQloyBZFb5TDuHdnkJBhJK1ZIxkFCqloyBpIp8pop36cJAYilaMgYSS9GSMZBc+JaMgQlU+UwR7/IbDExik/281ZIxMIlFPlfT3S0ZAxNZ5TPtHNrlFwxMJlxLxsBkwrVkDEyoyGeqeJdLfgBNmJZMi84qTEumRWcWoiXTkrOr8pmiJzvQglewyX6etmRa7go22c/9ATxR5TNFT3agBWd2/xA+0X0NPdldxE5U5DNVvMvlPoD7l3Enu38dfaJVPtPOoV1+wcAkFvk8eu4/ST6xyX7uP8o/UeUzRbzLbzCQXIi224OBxMK03R4MJBam7fZgIKkin6niXbowkFC4ttuDgYTCtd0eDCSzymfaObTLSzCQyCKfR8/uttuDgUQ22c9bbbcHA0lU+UwR77ILBhII33Z7MBBcirbbg4HgUrTdHgwEVuQzVbzL2zAQVKq224OBoFK13R4MBLTKZ9o5tMthGAhmkc+jZ2jb7cFAMJvsZ3jb7cFAIFU+U8S7DIOBIFK33R4MBJC+7fZgIID0bbcHAycr8pkq3sUEBk40TdvtwcCJpmm7PRg4ySqfaefQLqYwcIJFPo8et7bbg4ETbLIf17bbgwFnVT5TxLu4wICjadtuDwacTN12ezDgZOq224MBB0U+U8W7uMOAsUu03R4MGLtE2+3BgKFVPtPOoV1OgwEji3wePSHabg8GjGyynzBttwcDBqp8poh3OR0GBrtk2+3BwECXbbs9GBjosm23BwODFPlMFe8SCgYGuHzb7cHAAJdvuz0YOGiVz7RzaJeQMHDAIp9HT/i224OBAzbZT4q224OBN1X5TBHvEhoG3nC33R0wsNPddnfCwE53290JAzsU+UwV75IGBnYosr92buI9UsHATu25vMlm0rbdHgy86ZvG/29Yxeemg4ED2g/KUTei1G23BwMDVB2b9G23BwODlA8/9N6019L7p4WBgdq3+Lv2zRRttwcDBr7qtR/Q07TdHgwYeeW6Ok3b7cGAsWfX1frCa6eAAQeP19XthddMAwOOqiZtuz0YcLa8kJkKBm62MHCz9R9j5sb7VRq24AAAAABJRU5ErkJggg=="/></svg></button>',
            nextArrow: '<button type="button" class="slick-next pull-right"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 168"><title>Artboard 1</title><image width="96" height="168" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACoCAYAAAAfI+vhAAAACXBIWXMAAAsSAAALEgHS3X78AAAFhklEQVR4Xu3Z8ZHbNhDFYZeQElhCSkAJLoEluAR0kBJcQkpgCSnBJaSEl8N4xpmRT/iJIna5C3Jnvv+ehB1L5uHdfZH05XYeDNxsYeBmCwM3Wxi42cLAzRYGbrYwcLOFAWfLC5mpYMBR/fCvLvYhYMDBnx/+0f+zvfCaaWDA2Df9/NY/Tn3htVPAgJE/9POb3pv2P4PeJz0MGPiqz7/1j9MeS+2DovdLDQMDtX/M79o3f4nfNzUMDFI+/NB7015L758WBgaoOjbtcTXtowgDBzxeL4/M3+LzUsLAm55dL4/MKj43HQzs9Mr18t2ZsiVjYIei8d/6x9nEe6SCgR2KfKaKd0kDAzu1e7vHTNOSMbBT+xkw6ubTm2laMgbe0L6dHjNFS8bAm6p8poh3CQ0DB2yyn/QtGQMHLLK/lrZJ3ZIxcNAqn2nn0C4hYWCA9g21nrQtGQMDtGe0x6NoE+8SDgYGKfKZKt4lFAwMdLfkT2BgoLslfwIDg90t+QEGDFT5TBHvcjoMGNlkPylaMgaMLPK5moZvyRgwtMpn2jm0y2kwYOzyLRkDxi7fkjHgoMhnqngXdxhwctmWjAEnl23JGHB0yZaMAWdVPlPEu7jAwAk22U+YloyBEyzyuZqGaMkYOMkqn2nn0C6mMHCiS7RkDJzoEi0ZAycr8pkq3sUEBgKYuiVjIICpWzIGgpi2JWMgkCqfKeJdhsFAMJvsx7UlYyCYRT5XU7eWjIGAVvlMO4d2OQwDQU3TkjEQ1DQtGQOBFflMFe/yNgwEl74lYyC49C0ZAwmkbskYSKLKZ4p4l10wkMgm+xnekjGQyCKfq+nQloyBZFb5TDuHdnkJBhJK1ZIxkFCqloyBpIp8pop36cJAYilaMgYSS9GSMZBc+JaMgQlU+UwR7/IbDExik/281ZIxMIlFPlfT3S0ZAxNZ5TPtHNrlFwxMJlxLxsBkwrVkDEyoyGeqeJdLfgBNmJZMi84qTEumRWcWoiXTkrOr8pmiJzvQglewyX6etmRa7go22c/9ATxR5TNFT3agBWd2/xA+0X0NPdldxE5U5DNVvMvlPoD7l3Enu38dfaJVPtPOoV1+wcAkFvk8eu4/ST6xyX7uP8o/UeUzRbzLbzCQXIi224OBxMK03R4MJBam7fZgIKkin6niXbowkFC4ttuDgYTCtd0eDCSzymfaObTLSzCQyCKfR8/uttuDgUQ22c9bbbcHA0lU+UwR77ILBhII33Z7MBBcirbbg4HgUrTdHgwEVuQzVbzL2zAQVKq224OBoFK13R4MBLTKZ9o5tMthGAhmkc+jZ2jb7cFAMJvsZ3jb7cFAIFU+U8S7DIOBIFK33R4MBJC+7fZgIID0bbcHAycr8pkq3sUEBk40TdvtwcCJpmm7PRg4ySqfaefQLqYwcIJFPo8et7bbg4ETbLIf17bbgwFnVT5TxLu4wICjadtuDwacTN12ezDgZOq224MBB0U+U8W7uMOAsUu03R4MGLtE2+3BgKFVPtPOoV1OgwEji3wePSHabg8GjGyynzBttwcDBqp8poh3OR0GBrtk2+3BwECXbbs9GBjosm23BwODFPlMFe8SCgYGuHzb7cHAAJdvuz0YOGiVz7RzaJeQMHDAIp9HT/i224OBAzbZT4q224OBN1X5TBHvEhoG3nC33R0wsNPddnfCwE53290JAzsU+UwV75IGBnYosr92buI9UsHATu25vMlm0rbdHgy86ZvG/29Yxeemg4ED2g/KUTei1G23BwMDVB2b9G23BwODlA8/9N6019L7p4WBgdq3+Lv2zRRttwcDBr7qtR/Q07TdHgwYeeW6Ok3b7cGAsWfX1frCa6eAAQeP19XthddMAwOOqiZtuz0YcLa8kJkKBm62MHCz9R9j5sb7VRq24AAAAABJRU5ErkJggg=="/></svg></button>'
        });

        $('.secondSlick').each(function () {


            var count = $("img", this);

            $(this).slick({
                variableWidth: true,
                lazyLoad: 'ondemand',
                slidesToShow: count.length - 1,
                slidesToScroll: 1,
                infinite: false,
                centerMode: true,
                draggable: true,
                asNavFor: '.firstSlick',
                pauseOnHover: false,
                focusOnSelect: true
            });
        });


        $(".firstSlick").on("afterChange", function () {

            $('.yfb-populateSlideDescription').html($('.in .firstSlick img.slick-active').attr('data-description'));


        });


        $('.pause').on('click', function () {
            $('.firstSlick').slick('slickPause');
            $('.secondSlick').slick('slickPause');
            $(this).find('i').removeClass('fa-pause').addClass('fa-play');
            $(this).removeClass('pause').addClass('play');
        });
        $('.play').on('click', function () {
            $('.secondSlick').slick('slickPlay');
            $('.firstSlick').slick('slickPlay');
            $(this).find('i').removeClass('fa-play').addClass('fa-pause');
            $(this).removeClass('play').addClass('pause');
        });
        $('.exit').unbind('click').click(function () {
            var that = $(this);
            that.closest('.modal').fadeOut(300);
            setTimeout(function () {


                that.closest('.modal').modal('hide');

            }, 400);


        });
        $(".modal").on('shown', function () {
            $(window).trigger('resize');

        });
    }

    function collapseMobileSections() {
        //Collapses sections to titles only, expanding on click. On narrow screen sizes only
        function collapse() {
            if ($('.mobile-indicator').is(':visible') || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
                $('body').addClass('yfb-mobileDevice');
                $('.yfb-collapseContainer').hide();
                $('section.yfb-collapseOnMobile .title').closest('.container').children('.yfb-collapseContainer').hide();
                $('section.yfb-collapseOnMobile .title').closest('section.yfb-collapseOnMobile').addClass('yfb-mobileCollapsable');
                $('section.yfb-collapseOnMobile .title').closest('section.yfb-collapseOnMobile').addClass('yfb-mobileCollapsed');
                $('.yfb-mobileCollapsable .title').clickToggle(function () {
             
                    $(this).closest('.container').children('.yfb-collapseContainer').slideDown(200, function () {
                 
collapseText($(this).closest('section'));
        //    handleSlick();
                  
                    
                    });

                    $(this).closest('section.yfb-collapseOnMobile').removeClass('yfb-mobileCollapsed');
               
                   
                },function () {
                 
                    $(this).closest('.container').children('.yfb-collapseContainer').slideUp(200, function () {
                 //alert('hello');
$(this).find('.expandArrow').removeClass('rotate');
$(this).find('.expand').text("See More");


         
                  
                    
                    });

                    $(this).closest('section.yfb-collapseOnMobile').addClass('yfb-mobileCollapsed');
               
                   
                });
                
              
            } else {
                $('section.yfb-collapseOnMobile .title').closest('.container').children('.yfb-collapseContainer').show();
                $('section.yfb-collapseOnMobile .title').closest('section').removeClass('yfb-mobileCollapsable');
                $('section.yfb-collapseOnMobile .title').closest('section').removeClass('yfb-mobileCollapsed');
                $(this).closest('section.yfb-collapseOnMobile').removeClass('yfb-mobileCollapsed');
            }
        }
        collapse();
 
    }

    $('.yfb-collapseDescription').unbind('click').click(function () {
        $(this).find('div').toggleClass('rotate');

        $(this).closest('.modal-dialog').find('.secondSlick').slideToggle();
    });
    $('.yfb-thumbnail').unbind('click').click(function (event) {
        event.preventDefault();
    });

    function handleBootstrap() {
        $(function () {
            $('.carousel').each(function () {
                $(this).carousel({
                    interval: false
                });
            });
        });
    }

    function crewMemberCarousel() {
        $(function () {

            $('.yfb-populateName').html($('.overlayActive .yfb-crewMemberName').html());
            $('.yfb-populateTitle').html($('.overlayActive .yfb-crewMemberTitle').html());
            $('.yfb-populateText').html($('.overlayActive .yfb-crewMemberText').html());
            $('.yfb-populateImage').html($('.overlayActive div.crew-member-img img').clone());

            collapseText($('section.crew'));
            $('.crew-member-box ').unbind('click').click(function () {
                if (!$(this).hasClass('overlayActive')) {
   $('.yfb-populate').fadeTo(200, 0);
                    $('.crew-member-box ').removeClass('overlayActive');
                    $(this).addClass('overlayActive');

                    $('.yfb-populateText').removeClass("collapsedHeight");
                    $('.yfb-populate .expand').remove();
                 
                  
                    setTimeout(function () {
                          $('.yfb-populateText').html($('.overlayActive .yfb-crewMemberText').html());
                    $('.yfb-populateName').html($('.overlayActive .yfb-crewMemberName').html());
                    $('.yfb-populateTitle').html($('.overlayActive .yfb-crewMemberTitle').html());
                    $('.yfb-populateImage').html($('.overlayActive .crew-member-image').html());
                    $('.yfb-populateImage').html($('.overlayActive div.crew-member-img img').clone());
                        collapseText($('section.crew'));
                        collapseHandler();
                    }, 300);
                    $('.yfb-populate').fadeTo("slow", 1);
                }
            });
        });
    }

    function keyFeaturesHeight() {
        
   if (!($('.mobile-indicator').is(':visible'))) {

        if ($('ol').hasClass('collapsedHeight')){
             
      
        if (h2 >= h3) {

            $('ol.expandable').css('max-height', h2,'important');
        }
        else   {
            $('ol').css('max-height', h3,'important');

 }


        } else{
          
                $('ol.expandable').css('max-height', (h/2), 'important');
        }
     

  }



    }
   
    

  function browserCompatibility(){
    // Detect objectFit support

if('objectFit' in document.documentElement.style === false) {

    $('div.gallery-img').each(function(){

        var src = $(this).find('img').attr('src');
        $(this).addClass('incompatible');
        $(this).css('background', 'linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url("'+src+'")');


    });
       $('div.crew-member-img').each(function(){

        var src = $(this).find('img').attr('src');
        $(this).addClass('incompatible');

        $(this).css('background-image', 'url("'+src+'")');

    });
 }




  }
function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
       $('ol').removeClass('expandable');
       $('ol li').css('margin-bottom', '40px');
       $('ol li').css('overflow', 'visible');
    }
    else  // If another browser, return 0
    {
      
    }

    return false;
}

    var navheight = (($('.navbar').innerHeight()));
   $('section.heroBanner').css('max-height', '100vh').css('max-height', '-=' + navheight);
      $('section.heroBanner').css('margin-top', navheight );

 
$(function () {
    $('a.smooth-scroll[href*="\\#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - $('.navbar-header').height()
                }, 600);
                return false;
            }
        }
    });
});


     

    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    //Nav
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('nav-active');
        } else {
            $('.navbar').removeClass('nav-active');
        }
    });

            if (!($('.mobile-indicator').is(':visible') || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))) {
                    collapseText($('body'));
                       handleSlick();

            }

// jQuery(function($){
//   var windowWidth = $(window).width();
//   var windowHeight = $(window).height();

//   $(window).resize(function() {
//     if(windowWidth != $(window).width() || windowHeight != $(window).height()) {
//       location.reload();
//       return;
//     }
//   });
// });

   // activeSectionScroll();
    msieversion(); 
    closeMenu();
    crewMemberCarousel();
    handleBootstrap();
    collapseHandler();

 
    collapseMobileSections();
    browserCompatibility();
 
});