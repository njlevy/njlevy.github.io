$(function() {
    var h0 = 0,
        h1 = 0,
        h2 = 0,
        h3 = 0
    openSection = $('body')
    openModal = $('body')
    thisScroll = 0;


    msieversion();

    function general() {
        $(window).on('scroll', function() {
            thisScroll = $(window).scrollTop();
        });
        $('.video-img a').unbind('click').click(function() {
            thisScroll = $(window).scrollTop();

        });
        $('body').on('click', '.layout-box', function(e) {
            $('.layout .yfb-slickTrigger').triggerHandler('click');
            e.preventDefault();


        });

        $('section:not(.yfb-sectionBackground):not(.yfb-noPadding) + section:not(.yfb-sectionBackground):not(.yfb-noPadding)').addClass('yfb-paddingRemoved');
        //Check to see if the window is top if not then display button
        $(window).scroll(function() {
            if ($(this).scrollTop() > navheight) {
                $('.scrollToTop').removeClass('hideScroll');
            } else {
                $('.scrollToTop').addClass('hideScroll');
            }
        });

        //Click event to scroll to top
        $('.scrollToTop').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });

        //Nav
        //Check to see if the window is top if not then display button
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.navbar').addClass('nav-active');
            } else {
                $('.navbar').removeClass('nav-active');
            }
        });

       
        $(window).on("orientationchange", function(event) {

            location.reload();

        });

        function closeModal() {


            var slick1 = $('.slick-initialized.firstSlick');
            var slick2 = $('.slick-initialized.secondSlick');

            $('.modal.in').modal('hide');

            $(window).scrollTop(thisScroll);
            $('html').removeClass('modal-open');
            $('body').removeClass('modal-open');
            slick1.removeClass('slick-initialized');
            slick2.removeClass('slick-initialized');
            slick1.slick("unslick");
            slick2.slick("unslick");

        


            $('iframe').attr('src', $('iframe').attr('src'));

            $("html").removeAttr('class');
        }


        $('.exit').unbind('click').click(function() {

            closeModal();


        });

        $(document).keyup(function(e) {

            if (e.keyCode === 27) {

                closeModal();



            }
        });

    }


    function closeMenu() {
        // Closes menu and reverts hamburger when menu item is clicked on
        $('button.navbar-toggle').unbind('click').click(function() {
            $(this).toggleClass('is-active');
        });
        $('nav.navbar .navbar-nav li a').unbind('click').click(function() {
            $('.hamburger').removeClass('is-active');
            $('.hamburger').addClass('collapsed');
            $('.navbar-collapse').removeClass('in');
        });
        //Closes menu and reverts hamburger menu when user clicks outside of menu
        $(document).click(function(event) {
            if (!$(event.target).closest('.navbar-collapse').length) {
                if ($('.navbar-collapse').hasClass('in')) {

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
        // $(window).on('load', function () {
        //collapses content section, adds arrow or see more

        section.find($('.expandable:not(.collapsedHeight):not(.yfb-mobileCollapsed):not(.key-features)')).each(function() {
           

        
           
            var lineThreshold = 7;


            var height = $(this).innerHeight();

            var lineHeight = measureLineHeight($(this));
     

            if (height / lineThreshold > lineHeight) {

                $(this).addClass('collapsedHeight');

                if ((!$(this).parent().find('a.expand').length) && (!$(this).parent().find('a.expandArrow').length)) {
                    if ($(this).hasClass('arrow')) {
                        $(this).after('<a href="#!" class="expandArrow yfb-highlight"><i class="fa fa-caret-down" aria-hidden="true"></i></a>');

                    } else {
                        $(this).after('<a href="#!" class="expand yfb-highlight">see more</a>');


                    }
                }


            }

       
        keyFeaturesHeight();
        // });

        collapseHandler();
        });

    }

    function scrollTo(to, speed, delay) {
        var bool = false;

        var fromOff = openSection.offset().top;
      
        var toOff = to.offset().top;



        setTimeout(function(f) {
            if ((fromOff < toOff) && (fromOff != 0)) {

                bool = true;
            }


            if ($('.ipad-pro-indicator').is(':visible')) {
                $('html:not(:animated),body:not(:animated)').animate({
                    scrollTop: (toOff - $('.navbar-header').height())
                }, speed);

            } else if ($('.mobile-indicator').is(':visible')) {
                if (openSection == to) {
                    $('html:not(:animated),body:not(:animated)').animate({
                        scrollTop: (toOff + 1)
                    }, speed);
                } else {

                    if (bool) {
                        console.log('scrolling down');

                        if (openSection == $('body')){
                                 $('html:not(:animated),body:not(:animated)').animate({

                            scrollTop: (toOff - 19)
                        }, speed);
                        }
                        else
                                 $('html:not(:animated),body:not(:animated)').animate({

                            scrollTop: (toOff - 39)
                        }, speed);
                   


                    } else {
                        //console.log('scrolling up');

                        $('html:not(:animated),body:not(:animated)').animate({

                            scrollTop: (toOff - 19)
                        }, 150);
                    }

                }



            } else {
                $('html:not(:animated),body:not(:animated)').animate({
                    scrollTop: (toOff - $('.navbar-header').height())
                }, speed);
            }


        }, delay);


    }

    function collapseHandler() {
        //Collapse Handler

        $('.expand').unbind('click').click(function() {

            if (!$(this).hasClass('seeLess')) {
                if ($(this).parents().hasClass('key-list')){
                              $(this).parent().fadeOut(50).fadeIn(500);
                }
      
                //expands/contracts  expandable elements
                $(this).prevAll('.expandable').removeClass("collapsedHeight");
                keyFeaturesHeight();
                setTimeout(function() {
                    $(window).trigger('resize');

                }, 150);

                $(this).addClass("seeLess");
                $(this).text("See Less");
                keyFeaturesHeight();


            } else {
               if ($(this).parents().hasClass('key-list')){
                              $(this).parent().fadeOut(50).fadeIn(500);
                }
      

                $(this).prevAll('.expandable').addClass("collapsedHeight");

                if ($('.mobile-indicator').is(':visible')) {
                    scrollTo(openSection, 300, 250);
                } else
                    scrollTo($(this).closest('section'), 300, 250);

                keyFeaturesHeight();
                $(this).removeClass("seeLess");
                $(this).text("See More");

            }



        });



        $('.expandArrow').unbind('click').click(function() {
            if (!$(this).hasClass('rotate')) {
                //expands/contracts  expandable elements with arrow
                $(this).prevAll().removeClass("collapsedHeight");
                $(this).addClass("rotate");
                $(this).css('height', $(this).prop("scrollHeight"));
            } else {
if ($('.mobile-indicator').is(':visible')) {
                    scrollTo(openSection, 300, 250);
                } else
                    scrollTo($(this).closest('section'), 300, 250);
                $(this).prevAll().addClass("collapsedHeight");
                $(this).removeClass("rotate");

            }
        });

    }



    function handleModals() {
        var buttonleft = '<button type="button" class="slick-prev pull-left"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 168"><title>22Artboard 1</title><image width="96" height="168" transform="matrix(-1, 0, 0, 1, 96, 0)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACoCAYAAAAfI+vhAAAACXBIWXMAAAsSAAALEgHS3X78AAAFhklEQVR4Xu3Z8ZHbNhDFYZeQElhCSkAJLoEluAR0kBJcQkpgCSnBJaSEl8N4xpmRT/iJIna5C3Jnvv+ehB1L5uHdfZH05XYeDNxsYeBmCwM3Wxi42cLAzRYGbrYwcLOFAWfLC5mpYMBR/fCvLvYhYMDBnx/+0f+zvfCaaWDA2Df9/NY/Tn3htVPAgJE/9POb3pv2P4PeJz0MGPiqz7/1j9MeS+2DovdLDQMDtX/M79o3f4nfNzUMDFI+/NB7015L758WBgaoOjbtcTXtowgDBzxeL4/M3+LzUsLAm55dL4/MKj43HQzs9Mr18t2ZsiVjYIei8d/6x9nEe6SCgR2KfKaKd0kDAzu1e7vHTNOSMbBT+xkw6ubTm2laMgbe0L6dHjNFS8bAm6p8poh3CQ0DB2yyn/QtGQMHLLK/lrZJ3ZIxcNAqn2nn0C4hYWCA9g21nrQtGQMDtGe0x6NoE+8SDgYGKfKZKt4lFAwMdLfkT2BgoLslfwIDg90t+QEGDFT5TBHvcjoMGNlkPylaMgaMLPK5moZvyRgwtMpn2jm0y2kwYOzyLRkDxi7fkjHgoMhnqngXdxhwctmWjAEnl23JGHB0yZaMAWdVPlPEu7jAwAk22U+YloyBEyzyuZqGaMkYOMkqn2nn0C6mMHCiS7RkDJzoEi0ZAycr8pkq3sUEBgKYuiVjIICpWzIGgpi2JWMgkCqfKeJdhsFAMJvsx7UlYyCYRT5XU7eWjIGAVvlMO4d2OQwDQU3TkjEQ1DQtGQOBFflMFe/yNgwEl74lYyC49C0ZAwmkbskYSKLKZ4p4l10wkMgm+xnekjGQyCKfq+nQloyBZFb5TDuHdnkJBhJK1ZIxkFCqloyBpIp8pop36cJAYilaMgYSS9GSMZBc+JaMgQlU+UwR7/IbDExik/281ZIxMIlFPlfT3S0ZAxNZ5TPtHNrlFwxMJlxLxsBkwrVkDEyoyGeqeJdLfgBNmJZMi84qTEumRWcWoiXTkrOr8pmiJzvQglewyX6etmRa7go22c/9ATxR5TNFT3agBWd2/xA+0X0NPdldxE5U5DNVvMvlPoD7l3Enu38dfaJVPtPOoV1+wcAkFvk8eu4/ST6xyX7uP8o/UeUzRbzLbzCQXIi224OBxMK03R4MJBam7fZgIKkin6niXbowkFC4ttuDgYTCtd0eDCSzymfaObTLSzCQyCKfR8/uttuDgUQ22c9bbbcHA0lU+UwR77ILBhII33Z7MBBcirbbg4HgUrTdHgwEVuQzVbzL2zAQVKq224OBoFK13R4MBLTKZ9o5tMthGAhmkc+jZ2jb7cFAMJvsZ3jb7cFAIFU+U8S7DIOBIFK33R4MBJC+7fZgIID0bbcHAycr8pkq3sUEBk40TdvtwcCJpmm7PRg4ySqfaefQLqYwcIJFPo8et7bbg4ETbLIf17bbgwFnVT5TxLu4wICjadtuDwacTN12ezDgZOq224MBB0U+U8W7uMOAsUu03R4MGLtE2+3BgKFVPtPOoV1OgwEji3wePSHabg8GjGyynzBttwcDBqp8poh3OR0GBrtk2+3BwECXbbs9GBjosm23BwODFPlMFe8SCgYGuHzb7cHAAJdvuz0YOGiVz7RzaJeQMHDAIp9HT/i224OBAzbZT4q224OBN1X5TBHvEhoG3nC33R0wsNPddnfCwE53290JAzsU+UwV75IGBnYosr92buI9UsHATu25vMlm0rbdHgy86ZvG/29Yxeemg4ED2g/KUTei1G23BwMDVB2b9G23BwODlA8/9N6019L7p4WBgdq3+Lv2zRRttwcDBr7qtR/Q07TdHgwYeeW6Ok3b7cGAsWfX1frCa6eAAQeP19XthddMAwOOqiZtuz0YcLa8kJkKBm62MHCz9R9j5sb7VRq24AAAAABJRU5ErkJggg=="/></svg></button>';
        var buttonright = '<button type="button" class="slick-next pull-right"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 168"><title>Artboard 1</title><image width="96" height="168" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACoCAYAAAAfI+vhAAAACXBIWXMAAAsSAAALEgHS3X78AAAFhklEQVR4Xu3Z8ZHbNhDFYZeQElhCSkAJLoEluAR0kBJcQkpgCSnBJaSEl8N4xpmRT/iJIna5C3Jnvv+ehB1L5uHdfZH05XYeDNxsYeBmCwM3Wxi42cLAzRYGbrYwcLOFAWfLC5mpYMBR/fCvLvYhYMDBnx/+0f+zvfCaaWDA2Df9/NY/Tn3htVPAgJE/9POb3pv2P4PeJz0MGPiqz7/1j9MeS+2DovdLDQMDtX/M79o3f4nfNzUMDFI+/NB7015L758WBgaoOjbtcTXtowgDBzxeL4/M3+LzUsLAm55dL4/MKj43HQzs9Mr18t2ZsiVjYIei8d/6x9nEe6SCgR2KfKaKd0kDAzu1e7vHTNOSMbBT+xkw6ubTm2laMgbe0L6dHjNFS8bAm6p8poh3CQ0DB2yyn/QtGQMHLLK/lrZJ3ZIxcNAqn2nn0C4hYWCA9g21nrQtGQMDtGe0x6NoE+8SDgYGKfKZKt4lFAwMdLfkT2BgoLslfwIDg90t+QEGDFT5TBHvcjoMGNlkPylaMgaMLPK5moZvyRgwtMpn2jm0y2kwYOzyLRkDxi7fkjHgoMhnqngXdxhwctmWjAEnl23JGHB0yZaMAWdVPlPEu7jAwAk22U+YloyBEyzyuZqGaMkYOMkqn2nn0C6mMHCiS7RkDJzoEi0ZAycr8pkq3sUEBgKYuiVjIICpWzIGgpi2JWMgkCqfKeJdhsFAMJvsx7UlYyCYRT5XU7eWjIGAVvlMO4d2OQwDQU3TkjEQ1DQtGQOBFflMFe/yNgwEl74lYyC49C0ZAwmkbskYSKLKZ4p4l10wkMgm+xnekjGQyCKfq+nQloyBZFb5TDuHdnkJBhJK1ZIxkFCqloyBpIp8pop36cJAYilaMgYSS9GSMZBc+JaMgQlU+UwR7/IbDExik/281ZIxMIlFPlfT3S0ZAxNZ5TPtHNrlFwxMJlxLxsBkwrVkDEyoyGeqeJdLfgBNmJZMi84qTEumRWcWoiXTkrOr8pmiJzvQglewyX6etmRa7go22c/9ATxR5TNFT3agBWd2/xA+0X0NPdldxE5U5DNVvMvlPoD7l3Enu38dfaJVPtPOoV1+wcAkFvk8eu4/ST6xyX7uP8o/UeUzRbzLbzCQXIi224OBxMK03R4MJBam7fZgIKkin6niXbowkFC4ttuDgYTCtd0eDCSzymfaObTLSzCQyCKfR8/uttuDgUQ22c9bbbcHA0lU+UwR77ILBhII33Z7MBBcirbbg4HgUrTdHgwEVuQzVbzL2zAQVKq224OBoFK13R4MBLTKZ9o5tMthGAhmkc+jZ2jb7cFAMJvsZ3jb7cFAIFU+U8S7DIOBIFK33R4MBJC+7fZgIID0bbcHAycr8pkq3sUEBk40TdvtwcCJpmm7PRg4ySqfaefQLqYwcIJFPo8et7bbg4ETbLIf17bbgwFnVT5TxLu4wICjadtuDwacTN12ezDgZOq224MBB0U+U8W7uMOAsUu03R4MGLtE2+3BgKFVPtPOoV1OgwEji3wePSHabg8GjGyynzBttwcDBqp8poh3OR0GBrtk2+3BwECXbbs9GBjosm23BwODFPlMFe8SCgYGuHzb7cHAAJdvuz0YOGiVz7RzaJeQMHDAIp9HT/i224OBAzbZT4q224OBN1X5TBHvEhoG3nC33R0wsNPddnfCwE53290JAzsU+UwV75IGBnYosr92buI9UsHATu25vMlm0rbdHgy86ZvG/29Yxeemg4ED2g/KUTei1G23BwMDVB2b9G23BwODlA8/9N6019L7p4WBgdq3+Lv2zRRttwcDBr7qtR/Q07TdHgwYeeW6Ok3b7cGAsWfX1frCa6eAAQeP19XthddMAwOOqiZtuz0YcLa8kJkKBm62MHCz9R9j5sb7VRq24AAAAABJRU5ErkJggg=="/></svg></button>';


        if ('objectFit' in document.documentElement.style === false) {
            //Browser Compatibility
            $('.firstSlick img').each(function() {
                $(this).wrap("<div class='incompatible'><div class='incompatibleBackground'></div></div>");
            });

            $('.incompatible').each(function() {
                var src = $(this).find('img').attr('src');
                var wd = ($(this).find('img').naturalWidth) * 93 / ($(this).find('img').naturalHeight);



                $(this).children('.incompatibleBackground').css('background-image', 'url("' + src + '")');
                $(this).children('.incompatibleBackground').css('width', wd + 'vw');


            });

        }

        $('div.yfb-slickTrigger').unbind('click').click(function() {

            // thisScroll = $(window).scrollTop();
         

            var modalContainer = $(this).parent();
            openModal = $(this).find('.modal-dialog');
            var slick1 = modalContainer.find('.firstSlick');
            var slick2 = modalContainer.find('.secondSlick');


            modalContainer.on('shown.bs.modal', function(e) {
                openModal = modalContainer;

                if (!$(slick1).hasClass('slick-initialized')) {


                    slick1.slick({
                        autoplay: false,
                        //  lazyLoad: 'ondemand',
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        centerPadding: '0',
                        accessibility: true,
                        pauseOnHover: false,
                        centerMode: true,
                        asNavFor: slick2,
                        prevArrow: buttonleft,
                        nextArrow: buttonright

                    });

                    var count = slick2.find("img").length;
                    var c = 0;
                    // console.log(count);
                    if (count % 2 === 0) {
                        c = count - 1;
                    } else c = count - 2;

                    slick2.slick({
                        variableWidth: true,

                        lazyLoad: 'ondemand',
                        slidesToShow: c,
                        infinite: false,
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '0',
                        draggable: true,
                        swipe: true,
                        asNavFor: slick1,
                        focusOnSelect: true
                    });

                }
                slick1.find('img').css('opacity', 1, 'important');
                slick2.find('img').css('opacity', 1, 'important');
                slick1.find('.incompatible').css('opacity', 1, 'important');
                slick2.find('.incompatible').css('opacity', 1, 'important');

                if ($('body').hasClass('ie')) {
                    $('html').addClass('modal-open');
                    var desc = document.querySelector('.slick-active img').getAttribute('data-description');
                    modalContainer.find('.yfb-populateSlideDescription').html(desc);

                } else {
                    modalContainer.find('.yfb-populateSlideDescription').html(slick1.find('img.slick-active').attr('data-description'));
                }
            });


   



            


            slick1.on("afterChange", function() {
                if ($('body').hasClass('ie')) {
                    var desc = document.querySelector('.slick-active img').getAttribute('data-description');
                    modalContainer.find('.yfb-populateSlideDescription').html(desc);

                } else {
                    modalContainer.find('.yfb-populateSlideDescription').html($('.in .firstSlick img.slick-active').attr('data-description'));

                }


            });


        });



        $(".modal").on('shown', function() {
            $(window).trigger('resize');

        });
    }

    function collapseMobileSections() {
        var pagePosition = 0,
            target;
        //Collapses sections to titles only, expanding on click. On narrow screen sizes only
        function collapse() {
            if ($('.mobile-indicator').is(':visible') && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
                $('body').addClass('yfb-mobileDevice');
                $('.yfb-collapseContainer').hide();
                $('section.yfb-collapseOnMobile .title').closest('.container').children('.yfb-collapseContainer').hide();
                $('section.yfb-collapseOnMobile .title').closest('section.yfb-collapseOnMobile').addClass('yfb-mobileCollapsable');
                $('section.yfb-collapseOnMobile .title').closest('section.yfb-collapseOnMobile').addClass('yfb-mobileCollapsed');



                $('.yfb-mobileCollapsable .title').unbind('click').click(function() {

                    //alert('fjofj');

                    if ($(this).closest('.yfb-mobileCollapsable').hasClass('yfb-mobileCollapsed')) {

                        target = $(this).closest('section');
                        $(this).closest('.container').children('.yfb-collapseContainer').slideDown(200, function() {
                            //Get the current position of the page
                            pagePosition = $(window).scrollTop();
                            var that = $(this);

                            setTimeout(function() {
                                collapseText(that.closest('section'));
                            }, 300);



                        });

                        $('section.yfb-mobileCollapsable:not(.yfb-mobileCollapsed) .container .yfb-collapseContainer').slideUp(0, function() {
                            //Set page position after `.slideUp()` called
                            $("html,body").scrollTop(pagePosition);
                            $(this).closest('section.yfb-collapseOnMobile').addClass('yfb-mobileCollapsed');
                            $(this).find('.expandArrow').removeClass('rotate');
                            $(this).find('.expand').text("See More");
                        });
                        scrollTo($(this), 300, 0);
                        openSection = $(this).closest('section');
                        $(this).closest('section.yfb-collapseOnMobile').removeClass('yfb-mobileCollapsed');


                    } else {

                        $(this).closest('.container').children('.yfb-collapseContainer').slideUp(200, function() {
                            //alert('hello');
                            $(this).find('.expandArrow').removeClass('rotate');
                            $(this).find('.expand').text("See More");
                            openSection = $('body');


                        });

                        $(this).closest('section.yfb-collapseOnMobile').addClass('yfb-mobileCollapsed');
                    }
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


    $('.yfb-collapseDescription').unbind('click').click(function() {
        $(this).find('div').toggleClass('rotate');
        $(this).closest('.modal-dialog').toggleClass('yfb-descriptionCollapsed');

        $(this).closest('.modal-dialog').find('.secondSlick').slideToggle(100).slick("setPosition");

    });
    $('.yfb-thumbnail').unbind('click').click(function(event) {
        event.preventDefault();
    });

    function handleBootstrap() {
        $(function() {
            $('.carousel').each(function() {
                $(this).carousel({
                    interval: false
                });
            });
        });
    }

    function crewMemberCarousel() {


        $('.yfb-populateName').html($('.overlayActive .yfb-crewMemberName').html());
        $('.yfb-populateTitle').html($('.overlayActive .yfb-crewMemberTitle').html());
        $('.yfb-populateText').html($('.overlayActive .yfb-crewMemberText').html());
        $('.yfb-populateImage').html($('.overlayActive div.crew-member-img img').clone());

        collapseText($('section.crew'));

        $('.crew-member-box ').unbind('click').click(function() {
            if (!($(this).hasClass('overlayActive'))) {
                if ($('.ipad-pro-indicator').is(':visible')) {

                    $("html, body").animate({
                        scrollTop: ($('#crew').offset().top - $('.navbar-header').height())
                    });

                } else if (!($('.mobile-indicator').is(':visible'))) {
                    $("html, body").animate({
                        scrollTop: ($('#crew').offset().top - $('.navbar-header').height())
                    });

                } else {
                    $("html, body").animate({
                        scrollTop: ($('#crew').offset().top + 1)
                    });
                }
                $('.yfb-populate').fadeTo(200, 0);
                $('.crew-member-box ').removeClass('overlayActive');
                $(this).addClass('overlayActive');

                $('.yfb-populateText').removeClass("collapsedHeight");
                $('.yfb-populate .expand').remove();


                setTimeout(function() {
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


    }

    function keyFeaturesHeight() {

        h1 = 0;
        h2 = 0;
        h3 = 0;
        h2 = ($('ol.expandable li:nth-child(1)').outerHeight(true) + $('ol.expandable li:nth-child(2)').outerHeight(true));
        // console.log(h2);

        h3 = ($('ol.expandable li:nth-child(3)').outerHeight(true) + $('ol.expandable li:nth-child(4)').outerHeight(true));
        // console.log(h3);
        // console.log(h1);

        $('ol.expandable li').each(function() {
            // console.log(this);
            h1 = h1 + ($(this).outerHeight(true));
            //console.log(h1);

        });


        if (!($('.mobile-indicator').is(':visible'))) {

            if ($('ol.expandable').hasClass('collapsedHeight')) {


                if (h2 >= h3) {

                    $('ol.expandable').css('max-height', h2, 'important');

                } else {
                    $('ol').css('max-height', h3, 'important');

                }


            } else {
                $('ol.expandable').css('max-height', (h1 / 2), 'important');
            }


        }


    }



    function browserCompatibility() {
        // Detect objectFit support

        if ('objectFit' in document.documentElement.style === false) {



            $('div.crew-member-img').each(function() {

                var src = $(this).find('img').attr('src');
                $(this).addClass('incompatible');

                $(this).css('background-image', 'url("' + src + '")');

            });
        }


    }

    function msieversion() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
        {
            $('ol').removeClass('expandable');
            $('ol li').css('margin-bottom', '40px');
            $('ol li').css('overflow', 'visible');
            $('ol li').css('width', '100%');
            $('body').addClass('ie');
        } else // If another browser, return 0
        {

        }

        return false;
    }

    var navheight = (($('.navbar').innerHeight()));
    $('section.heroBanner').css('max-height', '100vh').css('max-height', '-=' + navheight);
    if ($('.navbar').hasClass('.navbar-fixed-top')) {
        $('section.heroBanner').css('margin-top', navheight);
    } else $('section.heroBanner').css('margin-top', 0);



    $('nav.navbar .navbar-nav li, .secondNav ul li').on("click", "a", function(event) {

        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();

                //  if (target.attr('id') == 'layout') {

                //   $('html, body').animate({
                //           scrollTop: target.offset().top - navheight - 250
                //         }, 1000, function() {


                //           // Callback after animation
                //           // Must change focus!
                //           var $target = $(target);
                //           $target.focus();
                //           if ($target.is(":focus")) { // Checking if the target was focused
                //             return false;
                //           } else {
                //             $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                //             $target.focus(); // Set focus again
                //           };
                //         });
                // }
                //     else 
                if (target.hasClass('yfb-paddingRemoved')) {

                    $('html, body').animate({
                        scrollTop: target.offset().top - navheight - 50
                    }, 1000, function() {


                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });

                } else {
                    $('html, body').animate({
                        scrollTop: target.offset().top - navheight
                    }, 1000, function() {


                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });

                }

            }
        }
    });
    // function watchForHover() {
    //     var hasHoverClass = false;
    //     var container = document.body;
    //     var lastTouchTime = 0;

    //     function enableHover() {
    //         // filter emulated events coming from touch events
    //         if (new Date() - lastTouchTime < 500) return;
    //         if (hasHoverClass) return;

    //         container.className += ' hasHover';
    //         hasHoverClass = true;
    //     }

    //     function disableHover() {
    //         if (!hasHoverClass) return;

    //         container.className = container.className.replace(' hasHover', '');
    //         hasHoverClass = false;
    //     }

    //     function updateLastTouchTime() {
    //         lastTouchTime = new Date();
    //     }

    //     document.addEventListener('touchstart', updateLastTouchTime, true);
    //     document.addEventListener('touchstart', disableHover, true);
    //     document.addEventListener('mousemove', enableHover, true);

    //     enableHover();
    // }

    // watchForHover();

    general();

    browserCompatibility();

    handleModals();

    closeMenu();

    crewMemberCarousel();

    handleBootstrap();

    collapseHandler();


    collapseMobileSections();
 if (!($('.mobile-indicator').is(':visible') && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))) {
            // $(window).on('load', function() {

            collapseText($('body'));

            //   });


        }


});