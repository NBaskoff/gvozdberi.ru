jQuery(document).ready(function () {
    var apiurl = "http://mobile.gvozdberi.ru/api";
    jQuery(".loadFromApi").each(function () {
        var box = jQuery(this);
        box.html("<div class='load'>Загрузка...</div>");
        box.removeClass(".loadFromApi");
        jQuery.ajax({
            type: "POST",
            url: apiurl + jQuery(this).attr("api") + location.search,
            success: function (html) {
                box.html(html);
            }
        });
    });

    jQuery.ajax({
        type: "POST",
        dataType: 'json',
        url: apiurl + "/1/Cart/Items",
        success: function (data) {
            jQuery(".cart_count").text(data.count);
            jQuery(".cart_price").text(data.price);
        }
    });


    jQuery(".catalogBox").on("click", ".pcb .bay", function () {
        var box = jQuery(this).parents(".pcb").eq(0);
        var id = jQuery(box).attr("record");
        var count = jQuery(".count", box).val();
        if (count <= 0) {
            count = 1;
        }
        jQuery(".cartBay", box).css("display", "none");
        jQuery(".cartDel", box).css("display", "block");

        setCount(id, count);

    });

    jQuery(".catalogBox").on("click", ".pcb .del", function () {
        var box = jQuery(this).parents(".pcb").eq(0);
        var id = jQuery(box).attr("record");
        jQuery(".cartBay", box).css("display", "block");
        jQuery(".cartDel", box).css("display", "none");
        setCount(id, 0);
    });

    function setCount(id, count, summ = null) {
        jQuery.ajax({
            type: "POST",
            dataType: 'json',
            data: {id: id, count: count},
            url: apiurl + "/1/Cart/SetCount",
            success: function (data) {
                jQuery(".cart_count").text(data.count);
                jQuery(".cart_price").text(data.price);
                if (summ != undefined && summ != null) {
                    jQuery(summ).text(data.this_price);
                }
            }
        });
    }
    jQuery(".cartBox").on("change", ".cartCount", function () {
        var id = jQuery(this).attr("record");
        var count = jQuery(this).val();
        if (count <= 0) {
            count = 1;
        }
        jQuery(this).val(count);
        var summ = jQuery(this).parents("tr").find(".cartSumm");
        setCount(id, count, summ);
    });
    jQuery(".cartBox").on("click", ".cartDel", function () {
        var id = jQuery(this).attr("record");
        var summ = jQuery(this).parents("tr").find(".cartSumm");
        setCount(id, 0, summ);
        jQuery(this).parents("tr").remove();
    });
    jQuery(".cartBox").on("click", ".cartSend", function () {
        jQuery(".cartError").css("display", "none");
        var btn = jQuery(this);
        if (jQuery(btn).prop("disabled") == false) {
            jQuery(btn).prop("disabled", true);
            jQuery(btn).text("Загрузка...");
            jQuery.ajax({
                type: "POST",
                dataType: 'json',
                data: jQuery("#cartOrderForm").serialize(),
                url: apiurl + "/1/Cart/Order",
                success: function (data) {
                    jQuery(btn).prop("disabled", false);
                    jQuery(btn).text("Заказать");
                    if (data.error.length > 0) {
                        var text = "";
                        for (var item in data.error) {
                            text = text + data.error[item] + "<br>";
                        }
                        jQuery(".cartError").html(text);
                        jQuery(".cartError").css("display", "block");
                    } else {
                        jQuery(".cartBox").html(data.html);
                        jQuery(".cart_count").text(0);
                        jQuery(".cart_price").text(0);
                    }
                }
            });
        }

    });
    jQuery(".goTop").on("click", function () {
        jQuery("body, html").animate({scrollTop:0}, 500);
    });
    if (getUrlParameter("name") != undefined) {
        jQuery("input[name=name]").val(getUrlParameter("name"));
    }
    
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
;