/**
 * Created by Administrator on 2016/6/21.
 */
$(function () {
    /***导航到指定模块的滑动效果***/
    var links  = $("nav li a");
    links.click(function () {
        var linkId = $(this).attr("href");
        var linkOffset = $(linkId).offset().top;
        /**
         * 问题
         * $("html,body")时，动画可以执行，当换成$(document)动画不能执行的原因
         **/
        $("html,body").animate({scrollTop:linkOffset});
    });
    /***see more滑动到第2页***/
    var seeMore = $(".view_more .see_more");
    seeMore.click(function () {
        var sectionOne = $("#section1");
        $("html,body").animate({scrollTop:sectionOne.offset().top});
    })
})