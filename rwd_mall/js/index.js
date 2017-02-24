$(function () {
    //点击搜索图标出现搜索框
    $(".mobile_search_btn").on("click",function () {
        var $inputGroup = $(this).next(".input_group");
        if($inputGroup.hasClass("mobile_search_state")) {
            $inputGroup.removeClass("mobile_search_state").hide();
        } else {
            $inputGroup.addClass("mobile_search_state").css("display","table");
        }
    });
})