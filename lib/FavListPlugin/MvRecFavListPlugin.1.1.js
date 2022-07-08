/* Copyright © 2022 https://www.mixviberecords.com
* Licensed Code With No Open Source Code
* jQuery library
* Licensed To © Mix Vibe Records 
* MvRecFavList Plugin v1.0 - Codix.dev */

var EmptyMsg = "Your liked songs will show up here<br/>If you have a backup file, You can import (MvRec-MyFavList.json) file in settings.",settingsLink = "/p/settings.html",settingsSvg = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126"/></svg>';
!function(a){"use strict";var b=function(){var b={},c={favIcon:"favIcon",favBadge:"show-fav-count",articleQuantity:"article-itemsnum",affixFavIcon:!1,showFavModal:!0,clickOnAddToFav:function(){},clickOnfavIcon:function(){}};return b.getOptions=function(b){var d=a.extend({},c);return"object"==typeof b&&a.extend(d,b),d},b}(),c=function(){var b={};localStorage.myFavList=localStorage.myFavList?localStorage.myFavList:"";var c=function(b){var c=-1,d=f();return a.each(d,function(a,d){if(d.id==b)return void(c=a)}),c},d=function(a){localStorage.myFavList=JSON.stringify(a)},e=function(a,b,c,e,g,h){var i=f();i.push({id:a,tracktitle:b,link:c,desc:e,itemsnum:g,coverartimg:h}),d(i)},f=function(){try{var a=JSON.parse(localStorage.myFavList);return a}catch(a){return[]}},g=function(a,b){var e=c(a);if(0>e)return!1;var g=f();return g[e].itemsnum="undefined"==typeof b?g[e].itemsnum:b,d(g),!0};return b.getAllfav=f,b.updatePoduct=g,b.setarticle=function(a,b,c,d,f,h){return"undefined"==typeof a?(console.error("Fav id required"),!1):"undefined"==typeof b?(console.error("Fav tracktitle required"),!1):"undefined"==typeof c?(console.error("Fav link required"),!1):"undefined"==typeof h?(console.error("Fav coverartimg required"),!1):void(d="undefined"==typeof d?"":d,!g(a)&&e(a,b,c,d,f,h))},b.cleararticle=function(){d([])},b.removearticle=function(b){var c=f();c=a.grep(c,function(a){return a.id!=b}),d(c)},b.getTotalQuantity=function(){var b=0,c=f();return a.each(c,function(a,c){b+=c.itemsnum}),b},b}(),d=function(d){var e=b.getOptions(d),f=a("."+e.favIcon),g=a("."+e.favBadge),h=e.articleQuantity,i="FavLists",j="fav-list";g.text(c.getTotalQuantity()),a("#"+i).length||a("#FetchFavLists").append("<div class=\"bootstrap-wrapper\" id=\""+i+"\"><div class=\"row\" id=\""+j+"\"></div></div>");var k=function(){var b=a("#"+j),d=a("#"+"no-data");b.empty(),d.empty();var e=c.getAllfav();a.each(e,function(){b.append("<div class=\"col-6 col-sm-4 col-lg-3\" data-id=\""+this.id+"\"><div class=\"fav_cntr\"><div class=\"fav_cvr\"><a href=\""+this.link+"\" target=\"_blank\"><img src=\""+this.coverartimg+"\" alt=\"Cover Art\"></a></div><div class=\"fav_tle\"><h3><a href=\""+this.link+"\" target=\"_blank\">"+this.tracktitle+"</a></h3></div></div></div>")}),d.append(e.length?"":"<div class=\"cox-card cox-card-style bg-green-dark rounded-s\"><h6 class=\"font-14 only-tst-svg\">"+EmptyMsg+"<a href=\""+settingsLink+"\"><span class=\"pt-1 font-13 float-right\">"+settingsSvg+"</span></a></h6></div>")},l=function(){k()};a(document).ready(function(){var b=a(".add-fav-btn");const d=b.data("id");if(localStorage.getItem("myFavList")){const b=JSON.parse(localStorage.getItem("myFavList")),c=b.filter(a=>d===a.id);c.length&&(a(".like").addClass("is-liked"),a(".like").html("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ff006a\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z\"/></svg>"))}else;e.showFavModal?l():e.clickOnfavIcon(c.getAllfav())}),a(document).on("keypress","."+h,function(a){38==a.keyCode||40==a.keyCode||a.preventDefault()}),a(document).on({click:function(){if(a(".like").toggleClass("is-liked"),a(this).hasClass("is-liked"))a(this).html("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ff006a\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z\"/></svg>"),a(".add-fav-btn").trigger("click"),toastNotif("<i class=\"check\"></i>Added To My Favourite"),e.showFavModal?l():e.clickOnfavIcon(c.getAllfav());else{a(this).html("<svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z\"></path></svg>");var b=a(".add-fav-btn"),d=b.data("id");c.removearticle(d),toastNotif("Removed From My Favourite"),g.text(c.getTotalQuantity()),e.showFavModal?l():e.clickOnfavIcon(c.getAllfav())}}},".like")};a(function(){var b=function(){},d=["log","afterAddOnFav","fav-count",".add-fav-btn"];(function(d,a){(function(b){for(;--b;)d.push(d.shift())})(++a)})(d,214);var e=function(b){b-=0;var e=d[b];return e};a(e("0x1")).TomyFav({favIcon:e("0x0"),affixFavIcon:!0,clickOnAddToFav:function(c){b(c)},afterAddOnFav:function(b){console[e("0x2")](e("0x3"),b)},clickOnAddToFav:function(c){b(c)}})});var e=function(d,e){var f=a(d),g=b.getOptions(e),h=a("."+g.favBadge);f.click(function(){g.clickOnAddToFav(f);var a=f.data("id"),b=f.data("tracktitle"),d=f.data("link"),e=f.data("desc"),i=f.data("itemsnum"),j=f.data("coverartimg");c.setarticle(a,b,d,e,i,j),h.text(c.getTotalQuantity())})};a.fn.TomyFav=function(b){return d(b),a.each(this,function(){new e(this,b)})}}(jQuery);