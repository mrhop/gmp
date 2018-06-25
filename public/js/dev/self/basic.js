/**
 * Created by Donghui Huo on 2016/3/15.
 */
var $ = jQuery = require('jquery');
require("imageMapResizer");
require("maphilight");
require("bootstrap");
var Swiper = require("Swiper");
var utilFun = require("utilFun");
var currentScrollTop = 0
$(document).ready(function () {
    var scrollMonitor = require("scrollMonitor");
    var bodyId = $("body").attr("id")
    $(".navbar-nav li.active").removeClass("active");
    $(".navbar-nav li." + bodyId + "-li").addClass("active");
    $(".navbar-nav li." + bodyId + "-parent-li").addClass("active");
    new Swiper('.top-slider .swiper-container', {
        // Optional parameters
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
    document.addEventListener('scroll', function () {
        $('.navbar.navbar-default').removeClass('in')
        $('.navbar-toggle').addClass('collapsed')
        $('.navbar-collapse').removeClass('in')
        if (currentScrollTop > document.documentElement.scrollTop) {
            $('.navbar.navbar-default').removeClass('navbar-scroll-down');
        } else {
            $('.navbar.navbar-default').css('overflow', 'hidden')
            $('.navbar.navbar-default').addClass('navbar-scroll-down');
        }
        currentScrollTop = document.documentElement.scrollTop
        if (currentScrollTop == 0) {
            $('.navbar.navbar-default').css('position', 'relative')
        } else {
            $('.navbar.navbar-default').css('position', 'fixed')
        }
    })
    $('.navbar-toggle').click(function () {
        if ($(this).hasClass('collapsed')) {
            $('.navbar.navbar-default').addClass('in')
        } else {
            $('.navbar-collapse').on('webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationEnd', function () {
                if (!$(this).hasClass('collapsed')) {
                    $('.navbar.navbar-default').removeClass('in')
                }
            })
        }
    })
    $('.navbar.navbar-default').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        if (!$('.navbar.navbar-default').hasClass('navbar-scroll-down')) {
            $('.navbar.navbar-default').css('overflow', 'visible')
        }
    })
    document.querySelectorAll('.content-section .section-title').forEach(function (element) {
        var elementWatcher = scrollMonitor.create(element);
        elementWatcher.exitViewport(function () {
            element.classList.remove('fadeInDown');
        });
        elementWatcher.enterViewport(function () {
            element.classList.add('fadeInDown');
        });
    })
    if (bodyId === 'index') {
        var element1 = document.querySelector('.content-section.animate1')
        var elementWatcher1 = scrollMonitor.create(element1);
        elementWatcher1.stateChange(function () {
            $(element1.querySelector('.row .col')).toggleClass('fadeInLeft', this.isInViewport);
            $(element1.querySelector('.row .col:last-child')).toggleClass('fadeInRight', this.isInViewport);
        });
        var element2 = document.querySelector('.content-section.animate2')
        var elementWatcher2 = scrollMonitor.create(element2);
        element2.querySelectorAll('.row .col').forEach(function (e, i, array) {
            var delay = 300 * i
            $(e).css('animation-delay', delay + 'ms')
            $(e).css('-webkit-animation-delay', delay + 'ms')
            elementWatcher2.stateChange(function () {
                $(e).toggleClass('fadeInUp', this.isInViewport);
            });
        })
        if (window.location.hash && window.location.hash.indexOf('about-us') > -1) {
            $('html, body').animate({
                scrollTop: $("section.content-section.about-us").offset().top - 139
            }, 1000);
        }
        $('nav.navbar-default ul li.about-li').on('click', function () {
            $('html, body').animate({
                scrollTop: $("section.content-section.about-us").offset().top - 139
            }, 1000);
        });
    } else if (bodyId === 'layouts') {
        $('.general img.general-img').maphilight()
        var flagOpened = false
        var minWidth = 760
        $('.general #mapGeneral area').mouseenter(function (e) {
            var title = $(this).data('title')
            var available = $(this).data('available')
            var unavailable = $(this).data('unavailable')
            var rooms = $(this).data('rooms')
            $('.content-section .tool-tip').css({
                top: (e.pageY - document.documentElement.scrollTop - 10),
                left: (e.pageX - document.documentElement.scrollLeft + 20),
                display: 'block'
            }).html('<h5>' + title + '</h5><p>Available:&nbsp;' + available + '</p><p>Unavailable:&nbsp;<span style="text-decoration: line-through">' + unavailable + '</span></p>').addClass('fadeIn');
        }).mousemove(function (e) {
            $('.content-section .tool-tip').css({
                top: (e.pageY - document.documentElement.scrollTop - 10),
                left: (e.pageX - document.documentElement.scrollLeft + 20)
            });
        }).mouseleave(function (e) {
            $('.content-section .tool-tip').css({
                display: 'none'
            }).removeClass('fadeIn');
        })
        $('.general #mapGeneral area').click(function (e) {
            var curentTarget = $('.flat-1 .subwrapper .' + $(this).data('2d'))
            if ($(window).outerWidth() > minWidth) {
                if (!flagOpened) {
                    curentTarget.css('display', 'block').css('transition', '400ms width linear').css('width', function () {
                        return $('.flat-1').width() - 382
                    }).on('webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd', function () {
                        curentTarget.find('.sub-img').maphilight()
                        curentTarget.find('map').imageMapResize()
                    })
                    flagOpened = true
                } else {
                    $('.flat-1 .subwrapper .sub').css('display', 'none')
                    $('.flat-1 .subwrapper .' + $(this).data('2d')).css('display', 'block').css('width', function () {
                        return $('.flat-1').width() - 382
                    })
                    curentTarget.find('.sub-img').maphilight()
                    curentTarget.find('map').imageMapResize()
                }
            } else {
                $('.flat-1 .general').css('transition', '400ms width linear').css('width', 0)
                $('.flat-1 .subwrapper .' + $(this).data('2d')).css('display', 'block').css('transition', '400ms width linear').css('width', function () {
                    return $('.flat-1').width()
                }).on('webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd', function () {
                    curentTarget.find('.sub-img').maphilight()
                    curentTarget.find('map').imageMapResize()
                })
                $('.flat-1 .subwrapper .close-icon').click(function () {
                    $('.flat-1 .general').css('transition', '400ms width linear').css('width', 382)
                    $('.flat-1 .subwrapper .sub').css('display', 'none').css('transition', 'none').css('width', 0)
                })
            }

            // 给出必须的hide和显示
            e.preventDefault();
        })
        $('.content-section .modal').click(function (e) {
            if (e.target.classList.contains('modal')) {
                $('.content-section .modal').css('display', 'none')
            }
        })
        $('.content-section .modal .close-icon').click(function () {
            $('.content-section .modal').css('display', 'none')
        })
        $('.content-section .subwrapper map area').mouseenter(function (e) {
            var title = $(this).data('title')
            var size = $(this).data('size')
            var rooms = $(this).data('rooms')
            $('.content-section .tool-tip').css({
                top: (e.pageY - document.documentElement.scrollTop - 10),
                left: (e.pageX - document.documentElement.scrollLeft + 20),
                display: 'block'
            }).html('<h5>' + title + '</h5><p>Size:&nbsp;' + size + '</p><p>Rooms:&nbsp;' + rooms + '</p>').addClass('fadeIn');
        }).mousemove(function (e) {
            $('.content-section .tool-tip').css({
                top: (e.pageY - document.documentElement.scrollTop - 10),
                left: (e.pageX - document.documentElement.scrollLeft + 20)
            });
        }).mouseleave(function (e) {
            $('.content-section .tool-tip').css({
                display: 'none'
            }).removeClass('fadeIn');
        })
        $('.content-section .subwrapper map area').click(function (e) {
            $('.content-section .modal').css('display', 'flex')
            $('.content-section .modal .container')[0].scrollTop = 0
            $('.content-section .modal div.sub').css('display', 'none')
            $('.content-section .modal div.' + e.currentTarget.id).css('display', 'block')
            e.preventDefault()
        })
    } else if (bodyId.indexOf('design-') >= 0) {
        var swiperGallery = new Swiper('.mask.big-img .swiper-container', {
            // Optional parameters
            init: false,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            lazy: {
                loadPrevNext: true,
            },
        })
        $('.mask.big-img img.close-icon').click(function () {
            $('.mask.big-img').hide()
        })
        $('.mask.big-img').click(function (e) {
            if (!e.target.classList.contains('swiper-button-prev') && !e.target.classList.contains('swiper-button-next') && !e.target.classList.contains('slide-image'))
                $('.mask.big-img').hide()
        })
        $('.content-section .mask').click(function (e) {
            $('.mask.big-img').show()
            swiperGallery.init()
            swiperGallery.slideTo($(this).data('related'), 0)
        })
    }
});

