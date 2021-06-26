(function($) {
'use strict';

// BURGER START
$(document).on('click', '.burger', function(){
    $('html').addClass('overflowHidden');
    $('.menu-top').addClass('opened')
});
$(document).on('click', '.menu-close', function(){
    $('html').removeClass('overflowHidden');
    $('.menu-top').removeClass('opened')
});
// BURGER END


$(function(){
    // MAIN SLIDER START
    if ( $('.top-slider').length ) {
        $('.top-slider .owl-carousel').owlCarousel({
            autoplay: false,
            autoWidth: true,
            center: true,
            loop: true,
            nav: true,
            dots: false,
            smartSpeed: 1000,
            responsive: {
                0: {
                    margin: 26
                },
                1024: {
                    margin: 10,
                    items: 5,
                    autoWidth: false
                },
                1350: {
                    margin: 37,
                    items: 5,
                    autoWidth: false
                }
            }
        })
    }
    // MAIN SLIDER END


    // PRODUCTS BLOCK START
    if ( $('.prods-block').length ) {
        $('.prods-block select').styler();
    }
    // PRODUCTS BLOCK END


    // REVIEWS START
    if ( $('.reviews-block').length ) {
        $('.reviews-block .owl-carousel').owlCarousel({
            autoplay: false,
            loop: true,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2,
                    margin: 20
                },
                1260: {
                    items: 3,
                    margin: 20
                },
                1350: {
                    items: 3,
                    margin: 50
                }
            }
        });
    }
    // REVIEWS END


    // HONEST REVIEWS START
    if ( $('.honest-reviews').length ) {
        $('.honest-reviews .owl-carousel').owlCarousel({
            autoplay: false,
            loop: true,
            nav: true,
            dots: true,
            items: 1
        });
    }
    // HONEST REVIEWS END


    // PRODUCT REVIEWS START
    if ( $('.product-slider').length ) {
        $('.product-slider .owl-carousel').owlCarousel({
            autoplay: false,
            loop: true,
            nav: true,
            dots: false,
            items: 1
        });
    }
    // PRODUCT REVIEWS END


    // POPUPFORM START
    $(document).on('keydown', function(event){
        if (event.which == 27) {
            hideForm();
        }
    });
    $(document).on('click', function(event){
        if( $(event.target).closest('.popupform-wrap').length || $(event.target).closest('.form-popup').length ) 
        return;
        hideForm();
        event.stopPropagation();
    });
    $(document).on('click', '.form-popup' , showForm);
    $(document).on('click', '.popupform-close' , hideForm);
    
    function showForm(){
        $('html').addClass('overflowHidden');
        $('.popupform').addClass('active');
    };
    function hideForm(){
        $('html').removeClass('overflowHidden');
        $('.popupform').removeClass('active');
    };
    // POPUPFORM END


    // CONTACTS POPUP START
    $(document).on('click', '.contacts2 .arrow', function(){
        $(this).closest('.contacts2').toggleClass('active');
    });
    $(document).on('click', function(event){
        if( $(event.target).closest('.contacts2__inner').length ) 
        return;
        $('.contacts2').removeClass('active');
        event.stopPropagation();
    });
    // CONTACTS POPUP END


    // PRODUCT PAGE SLIDER START
    if ( $('.product__image').length ) {
        var sync1 = $('.product__image .owl-carousel'),
            sync2 = $(".product__thumbs .owl-carousel"),
            syncedSecondary = true;

        $('.product__image').lightGallery({
            selector: 'a',
            thumbnails: true
        });
        sync1.owlCarousel({
            autoplay: false,
            loop: false,
            nav: true,
            dots: false,
            items: 1
        }).on('changed.owl.carousel', syncPosition);

        sync2
            .on('initialized.owl.carousel', function() {
                sync2.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                items: 4,
                dots: true,
                nav: true,
                margin: 10,
                dots: false,
                smartSpeed: 200,
                slideSpeed: 500,
                slideBy: 1, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                responsiveRefreshRate: 100,
                responsive: {
                    1024: {
                        nav: false
                    }
                }
            }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el){
            var current = el.item.index;

            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync2.find('.owl-item.active').length - 1;
            var start = sync2.find('.owl-item.active').first().index();
            var end = sync2.find('.owl-item.active').last().index();

            if (current > end) {
                sync2.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                sync2.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if (syncedSecondary) {
                var number = el.item.index;
                sync1.data('owl.carousel').to(number, 100, true);
            }
        }

        sync2.on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).index();
            sync1.data('owl.carousel').to(number, 300, true);
        });
    }
    // PRODUCT PAGE SLIDER END


    // CONTACTS POPUP START
    $(document).on('click', '.product__tabs > .titles > div:not(.active)', function(){
        var $this = $(this),
            index = $this.index(),
            $tabsWrap = $this.closest('.product__tabs'),
            $body = $tabsWrap.find('.body > div');
        
        $body.removeClass('active');
        $body.eq(index).addClass('active');

        $this.siblings().removeClass('active');
        $this.addClass('active');
    });
    // CONTACTS POPUP END
});

})(jQuery)