jQuery(document).ready(function () {
    jQuery(".loadUrl").each(function () {
        var url = jQuery(this).attr("url");
        jQuery(this).load(url);
    });
    
    jQuery(window).scroll(function(){
        if (jQuery(this).scrollTop() < jQuery(".header").height()) {
            if (jQuery(".cartBox").hasClass("fixed") == true) {
                jQuery(".cartBox").removeClass("fixed");
            }
        } else {
            if (jQuery(".cartBox").hasClass("fixed") == false) {
                jQuery(".cartBox").addClass("fixed");
            }
        }
    });    
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://oasis1000.com/api/1/Page_Index_Button_Items/GetPriceCount/",
        success: function(data) {
            jQuery(".cartCount").text(data.count);
            jQuery(".cartPrice").text(data.price);
        }
    });    
    
    function setCount(id, count, callback) {
        if (typeof(callback) != "function") {
            callback = function(data){};
        }
        jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: "https://oasis1000.com/api/1/Page_Index_Button_Items/SetCount/",
            data: {id:id, count:count},
            success: function(data) {
                jQuery(".cartCount").text(data.count);
                jQuery(".cartPrice").text(data.price);
                callback(data);
            }
        });
    }
    jQuery("body").on("click", ".cartCountMinus", function(){
        var box = jQuery(this).parents(".cartEditCount");
        var id = jQuery(box).attr("rid");
        var count = parseInt(jQuery("input", box).val());
        if (count > 0) {
            count = count - 1;
            jQuery("input", box).val(count);
            setCount(id, count, function(data){
                jQuery(".cartSumm"+id).text(data.summ);
            });
        }
    });
    
    jQuery("body").on("click", ".cartCountPlus", function(){
        var box = jQuery(this).parents(".cartEditCount");
        var id = jQuery(box).attr("rid");
        var count = parseInt(jQuery("input", box).val());
        count = count + 1;
        jQuery("input", box).val(count);
        setCount(id, count, function(data){
            jQuery(".cartSumm"+id).text(data.summ);
        });
    });
    jQuery("body").on("click", ".cartAddAnimate", function(){
        var box = jQuery(this).parents(".itemBox").eq(0);
        var nbox = $("img", box).clone();
        nbox.css({'position' : 'absolute', 'z-index' : '11100', top: $("img", box).offset().top, left:$("img", box).offset().left})
        .appendTo("body");

        if (jQuery(".cartBox").css("display") == "block") {
            nbox.animate({opacity: 0.05,
                left: $(".cartBox").offset()['left']+50,
                top: $(".cartBox").offset()['top'],
                width: 20}, 1000, function() {
                $(this).remove();
            });            
        } else {
            nbox.animate({opacity: 0.05,
                left: $(".cartText").offset()['left']+50,
                top: $(".cartText").offset()['top'],
                width: 20}, 1000, function() {
                $(this).remove();
            });            
        }
    });
       
    jQuery("body").on("keyup", ".cartEditCount input", function(){
        var box = jQuery(this).parents(".cartEditCount");
        var id = jQuery(box).attr("rid");
        var count = parseInt(jQuery("input", box).val());
        if (isNaN(count)) {
            count = 0;
        }
        if (count >= 0) {
            setCount(id, count, function(data){
                jQuery(".cartSumm"+id).text(data.summ);
            });
        }
    });
    jQuery("body").on("click", ".cartCountDel", function(){
        var box = jQuery(this).parents("tr").eq(0);
        var id = jQuery(this).attr("rid");
        var count = parseInt(jQuery("input", box).val());
        setCount(id, 0, function(data){
            jQuery(box).remove();
        });
    });    
    
});