/**
 * Created by Administrator on 2016/9/21.
 */
/***购物车***/
function numUpdate(kind,obj) {
    var c_input = $(obj).siblings(".curr-num");
    var count = c_input.val();
    if(kind == 'up') {
        count++;
        $(obj).siblings(".decrease").removeClass("disabled");
    } else if(kind == 'down'){
        if(count > 1) {
            count--;
            count == 1 ? $(obj).addClass("disabled") : $(obj).removeClass("disabled");;
        }
    }
    c_input.val(count);
}
$(function () {
    /***列表页tab菜单***/
    var menulist = $("#menu a");
    menulist.click(function() {
        if ($(this).attr("class").indexOf("current") < 0) {
            $(this).addClass("current").siblings().removeClass("current");
            var i = menulist.index(this);
            $(".new-search ul").hide();
            $(".new-search ul").eq(i).show();
        } else {
            $(this).removeClass("current");
            $(".new-search ul").hide();
        }
    });
    /***注册页查看条款***/
    $(".register .check_box").click(function () {
        $(".mask").show();
        $(".protocol_info").show().animate({
            "height":"80%"
        })
    });
    $(".protocol_info .close").click(function () {
        $(".protocol_info").hide().css("height",0);
            $(".mask").hide();
    })
    /***顶部菜单***/
    $(".top_menu_box .menu_icon").click(function () {
        var topTabbar = $(this).next(".weui_top_tabbar");
        var topTabbarHei = topTabbar.height();
        if(topTabbarHei == 0){
            topTabbar.animate({height:"53px"});
        } else {
            topTabbar.animate({height:"0"});
        }

    })
    /***底部菜单***/
    $(".fix_bottom a").click(function () {
        $(".weui_tabbar a").removeClass("current");
        $(this).addClass("current");
    })
    /***购物车左侧置灰***/
    $(".cart_lists .decrease").addClass("disabled");
    
    /***点击设置头像***/
    $(".edit_personal_wrap .peronal_photo_box").click(function () {
        var uploadBtn = $(this).next("input[type='file']");
        uploadBtn.trigger('click');
        uploadBtn.change(function () {
            var fileBob=this.files[0];
            var imgSrc = window.URL.createObjectURL(fileBob);
            if(imgSrc) {
                $(this).prev().find('.user_photo img').attr('src',imgSrc);
            }
        })
    })
    /***点击编辑姓名***/
    $(".edit_personal_wrap .edit_name_icon").click(function () {
        var userName = $(".edit_personal_wrap #nickname");
        var defaultValue = userName.val();
        userName.removeAttr("readonly").focus().val(defaultValue);
    })
    /***商品列表筛选***/
    $(".product_lists_wrap .pro_filter").on("click","dt",function () {
        $(this).next("dd").slideToggle();
    })
    /***返回顶部出现与隐藏***/
    $(".goods_wrap").scroll(function () {
        if($(this).scrollTop() > $(window).height()) {
            $(".back_to_top").show();
        } else {
            $(".back_to_top").hide();
        }
    });
    /***返回顶部效果***/
    $(".back_to_top").click(function () {
        $(".goods_wrap").animate({scrollTop:"0"});
    });
    
    /***确认订单发票选择***/
    $(".invoice_box input[type='radio']").click(function () {
        if($(this).val() == 'collective') {
            if($(this).get(0).checked) {
                $(".danwei_box").show();
            }
        } else {
            $(".danwei_box").hide();
        }
    })
    /***我的订单查看更多***/
    var listsObj = $(".my_orders_wrap .weui_panel_bd");
    var listState = true;
    listsObj.each(function (index,ele) {
        $(ele).find(".weui_media_box:gt(2)").hide();
    });
    $(".my_orders_wrap .view_more_item").on("click","a",function () {
        if(listState) {
            $(this).parents(".weui_panel_bd").find(".weui_media_box").show();
            $(this).addClass("all").text("收起");
            listState = false;
        } else {
            $(this).parents(".weui_panel_bd").find(".weui_media_box:gt(2)").hide();
            $(this).removeClass("all").text("展开");
            listState = true;
        }
    });
    /***我的订单提示文字居中***/
    $(".no_order_tip").css("height",$(window).height() - 246);
    /***退出登录提示***/
    $(".personal_main_box .exit_login").click(function () {
        $.weui.dialog({
            title: '是否确认退出当前登录？',
            content: '',
            buttons: [{
                label: '取消',
                type: 'default',
            }, {
                label: '确认',
                type: 'primary',
                onClick: function () {
                    console.log('知道了......')
                }
            }]
        });
    });
    /***删除商品***/
    $(".cart_lists .delete_icon").click(function () {
        $.weui.dialog({
            title: '确认删除吗？',
            content: '',
            buttons: [{
                label: '取消',
                type: 'default',
            }, {
                label: '确认',
                type: 'primary',
                onClick: function () {
                    console.log('知道了......')
                }
            }]
        });
    });
});
/*评论查看大图*/
var initPhotoSwipeFromDOM = function(gallerySelector) {

    // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item,
			divEl;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // 仅包括元素节点
            if(figureEl.nodeType !== 1) {
                continue;
            }
			divEl = figureEl.children[0];
            linkEl = divEl.children[0]; // <a> element
			
            size = linkEl.getAttribute('data-size').split('x');

            // 创建幻灯片对象
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> 缩略图节点, 检索缩略图网址
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // 查找最近的父节点
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // 当用户点击缩略图触发
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // 这里可以定义参数
        options = {
          barsSize: { 
            top: 100,
            bottom: 100
          }, 
		   fullscreenEl : false,
			shareButtons: [
			{id:'wechat', label:'分享微信', url:'#'},
			{id:'weibo', label:'新浪微博', url:'#'},
			{id:'download', label:'保存图片', url:'{{raw_image_url}}', download:true}
			],

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

/**个人信息——上传头像**/
$('.userPicUploader').on('click',function () {
    var uploadBtn = $(this).next('.userPicUploaderBtn').find('input');
    uploadBtn.trigger('click');
    uploadBtn.change(function () {
        var fileBob=this.files[0];
        var imgSrc = window.URL.createObjectURL(fileBob);
        if(imgSrc) {
            $(this).parent().prev().find('.user_photo img').attr('src',imgSrc);
        }
    })
})
