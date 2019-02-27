jQuery(document).ready(function () {
    jQuery(".cartItems").html("Загрузка...");
    jQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "https://oasis1000.com/api/1/Page_Index_Button_Items/GetItems/",
        success: function (data) {
            jQuery(".cartItems").html("");
            data.forEach(function(item, i, arr) {
                var html = '<div class="row verticalCenter itemBox">\n\
                        <div class="col-md-1">';
                        if (item.page_index_button_items_image.length > 0) {
                            html = html + '<img class="image" src="https://oasis1000.com/'+item.page_index_button_items_image[0].files_path+'">';
                        }
                        html = html + '</div>\n\
                        <div class="col-md-2">\n\
                            <div class="name">'+item.page_index_button_items_name+'</div>\n\
                        </div>\n\
                        <div class="col-md-2">\n\
                            <div class="price">\n\
                                '+item.page_index_button_items_price+' р.\n\
                            </div>\n\
                        </div>';
                        if (item.page_index_button_items_price_user != null) {
                            html = html + '<div class="col-md-4">\n\
                                <div class="price">\n\
                                    для Участников: '+item.page_index_button_items_price_user+' р.\n\
                                </div>\n\
                            </div>';                            
                        } else {
                            html = html + '<div class="col-md-4"></div>';                            
                        }
                        html = html + '<div class="count col-md-3">\n\
                            <div class="cartEditCount" rid="'+item.page_index_button_items_id+'" price="444">\n\
                                <div class="tIcon cartCountMinus"></div>\n\
                                <input type="number" value="'+item.count+'" min="0">\n\
                                <div class="tIcon cartCountPlus cartAddAnimate"></div>\n\
                            </div>\n\
                        </div>\n\
                    </div>';                
                jQuery(".cartItems").append(html);
            });
            

        }
    });

    //сделаем общий JS для стандартных форм
    jQuery("div[class^=error__]", ".formAjax").addClass("errorText");
    jQuery("form", ".formAjax").submit(function () {
        var box = jQuery(this).parent(".formAjax");
        var url = jQuery(box).attr("url");
        var form = jQuery(this);
        if (jQuery(box).attr("settings") != undefined) {
            var settings = JSON.parse(jQuery(box).attr("settings"));
        } else {
            var settings = {};
        }
        var options = {
            url: url,
            type: "POST",
            dataType: "text",
            beforeSubmit: function (data) {
                jQuery(".errorInput", box).removeClass("errorInput");
                jQuery(".errorText", box).text("");
                jQuery(".load__box", box).css("display", "block");
                for (var p in settings) {
                    var k = new Object();
                    k["name"] = "settings[" + p + "]";
                    k["value"] = settings[p];
                    data[data.length] = k;
                }
            },
            success: function (data) {
                jQuery(".load__box", box).css("display", "none");
                try {
                    var pdata = JSON.parse(data);
                } catch (err) {
                    alert("Ошибка!");
                    alert(data);
                }
                if (pdata.error !== null) {
                    for (var key in pdata.error) {
                        var val = pdata.error[key];
                        jQuery(".error__" + key + "", box).text(val);
                        jQuery("*[name=" + key + "]", box).addClass("errorInput");
                        jQuery(".codeConfirmImgSrc_img").attr("src", pdata.codeConfirmImgSrc);
                    }
                    $('html, body').animate({ scrollTop: $(form).offset().top }, 500);
                } else {
                    jQuery(box).addClass("contentBody").html(pdata.text);
                }
                if (pdata.reload == true) {
                    location.reload();
                }
                //jQuery('body,html').animate({scrollTop:0},500);
            }
        };
        $(this).ajaxSubmit(options);
        return false;
    });

});
