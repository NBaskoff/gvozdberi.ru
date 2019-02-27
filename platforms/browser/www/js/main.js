jQuery(document).ready(function () {
    getBtns(0);
    jQuery(".mainBtn").on("click", ".btn", function(){
        getBtns(jQuery(this).attr("btn"));
    });
    jQuery(".pathBtn").on("click", ".pathA", function(){
        getBtns(jQuery(this).attr("btn"));
    });
    
     
    
    
});
function getBtns(id) {
    id = parseInt(id);
    jQuery(".mainBtn").html('<div class="col-md-12">Загрузка...</div>');
    jQuery(".itemsBox").html("");
    jQuery.ajax({
        dataType: "JSON",
        url: "https://oasis1000.com/api/1/Page_Index_Button/GetBtn/",
        data: {id: id},
        success: function (data) {
            var html  = "";
            if (data.adr.length > 0) {
                html = html + "<a href='#' class='pathA' btn='0'>Главная</a>";
            }
            data.adr.forEach(function(item, i, arr) {
                html = html + " / <a href='#' class='pathA' btn='"+item.page_index_button_id+"'>"+item.page_index_button_name+"</a>";
            });
            jQuery(".pathBtn").html(html);
            
            var html  = "";
            data.btn.forEach(function(item, i, arr) {
                html = html + '<div class="col-md-4">\n\
                    <div class="btn btn-primary btn-block" btn="'+item.page_index_button_id+'">'+item.page_index_button_name+'</div>\n\
                </div>';
            });
            jQuery(".mainBtn").html(html);
            
            var html  = "";
            data.items.forEach(function(item, i, arr) {
                html = html + '<div class="col-md-4 item itemBox">\n\
                    <div class="name">'+item.page_index_button_items_name+'</div>';
                    if (item.page_index_button_items_image.length > 0) {
                        html = html + '<div class="image"><img src="https://oasis1000.com/'+item.page_index_button_items_image[0].files_path+'"></div>';
                    }
                    if (item.page_index_button_items_text != null) {
                        html = html + '<div class="text">'+item.page_index_button_items_text+'</div>';
                    }
                    if (item.page_index_button_items_price_user != null) {
                        html = html + '<div class="price">Цена: '+item.page_index_button_items_price+'р.<br>Для участников: '+item.page_index_button_items_price_user+'р.</div>';
                    } else {
                        html = html + '<div class="price">Цена: '+item.page_index_button_items_price+'р.</div>';
                    }
                    html = html + '<div class="cartEditCount" rid="'+item.page_index_button_items_id+'" price="444">\n\
                        <div class="cartCountMinus"></div>\n\
                        <input type="number" value="'+item.count+'" min="0">\n\
                        <div class="cartCountPlus cartAddAnimate"></div>\n\
                    </div>\n\
                </div>';
                
            });
            jQuery(".itemsBox").html(html);
            
        }
    });

}
