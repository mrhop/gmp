/**
 * Created by Donghui Huo on 2016/3/15.
 */
var $ = jQuery = require('jquery');
require("flexslider");
require("bootstrap");
var utilFun = require("utilFun");
$(document).ready(function () {
    var bodyId = $("body").attr("id")
    $(".navbar-nav li.active").removeClass("active");
    $(".navbar-nav li." + bodyId + "-li").addClass("active");
    $(".navbar-nav li." +bodyId + "-parent-li").addClass("active");
    if (bodyId === 'index') {
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
    }
});

