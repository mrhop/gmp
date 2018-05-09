/**
 * Created by Donghui Huo on 2016/3/15.
 */
var $ = jQuery = require('jquery');
require("flexslider");
require("imageMapResizer");
require("maphilight");
require("bootstrap");
var utilFun = require("utilFun");
$(document).ready(function () {
    var bodyId = $("body").attr("id")
    $(".navbar-nav li.active").removeClass("active");
    $(".navbar-nav li." + bodyId + "-li").addClass("active");
    $(".navbar-nav li." + bodyId + "-parent-li").addClass("active");
    $('.flexslider').flexslider({
        fadeFirstSlide: false,
        controlNav: false,
        directionNav: true,
        animationSpeed: 1000,
        slideshowSpeed: 4000,
        slideshow: true,
        animation: "slide",
        prevText: "",
        nextText: "",
    });
    if (bodyId === 'layouts') {
        $('.general img.general-img').maphilight()
        var flagOpened = false
        var minWidth = 760
        $('.general #mapGeneral area').click(function (e) {
            var curentTarget = $('.flat-1 .subwrapper .' + $(this).attr('id'))
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
                    $('.flat-1 .subwrapper .' + $(this).attr('id')).css('display', 'block').css('width', function () {
                        return $('.flat-1').width() - 382
                    })
                    curentTarget.find('.sub-img').maphilight()
                    curentTarget.find('map').imageMapResize()
                }
            } else {
                $('.flat-1 .general').css('transition', '400ms width linear').css('width', 0)
                $('.flat-1 .subwrapper .' + $(this).attr('id')).css('display', 'block').css('transition', '400ms width linear').css('width', function () {
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
        $('.content-section .subwrapper map area').click(function (e) {
            $('.content-section .modal').css('display', 'flex')
            $('.content-section .modal img.sub').css('display', 'none')
            $('.content-section .modal img.' + e.currentTarget.id).css('display', 'block')
            e.preventDefault()
        })
    }
});

