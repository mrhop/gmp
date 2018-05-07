/**
 * Created by Donghui Huo on 2016/3/15.
 */
//var $ = require("jQuery");
module.exports = (function ($, window, undefined) {
    'use strict';
    $.UtilFun = function () {

    };
    $.UtilFun.prototype = {
        basicFunc:function(){
            //do something
        }
    };
    return new $.UtilFun();
})
(jQuery, window)