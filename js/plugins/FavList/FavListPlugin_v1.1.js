/* Copyright © 2023 https://www.mixviberecords.com
* Licensed Code With No Open Source Code
* jQuery library - Licensed To © Mix Vibe Records 
* FavList Plugin v1.1 - b2root.dev */
var favEmptyMsg = "Your liked songs will show up here<br/>If you have a backup file, You can import (MvRec-MyFavList.json) file in settings.", settingsLink = "/p/settings.html", settingsSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"/></svg>';
!(function ($) {
  "use strict";
  var OptionManager = (function () {
    var objToReturn = {};
    var defaultOptions = {
      favIcon: "favIcon",
      favBadge: "show-fav-count",
      articleQuantity: "article-itemsnum",
      affixFavIcon: false,
      showFavModal: true,
      clickOnAddToFav: function ($addTofav) {},
      clickOnfavIcon: function ($favIcon, myFavList) {},
    };
    var getOptions = function (customOptions) {
      var options = $.extend({}, defaultOptions);
      if (typeof customOptions === "object") {
        $.extend(options, customOptions);
      }
      return options;
    };
    objToReturn.getOptions = getOptions;
    return objToReturn;
  })();
  var articleManager = (function () {
    var objToReturn = {};
    localStorage.myFavList = localStorage.myFavList
      ? localStorage.myFavList
      : "";
    var getIndexOfarticle = function (id) {
      var articleIndex = -1;
      var myFavList = getAllfav();
      $.each(myFavList, function (index, value) {
        if (value.id == id) {
          articleIndex = index;
          return;
        }
      });
      return articleIndex;
    };
    var setAllfav = function (myFavList) {
      localStorage.myFavList = JSON.stringify(myFavList);
    };
    var addarticle = function (id, tracktitle, link, desc, itemsnum, coverartimg) {
      var myFavList = getAllfav();
      myFavList.push({
        id: id,
        tracktitle: tracktitle,
        link: link,
        desc: desc,
        itemsnum: itemsnum,
        coverartimg: coverartimg,
      });
      setAllfav(myFavList);
    };
    var getAllfav = function () {
      try {
        var myFavList = JSON.parse(localStorage.myFavList);
        return myFavList;
      } catch (e) {
        return [];
      }
    };
    var updatePoduct = function (id, itemsnum) {
      var articleIndex = getIndexOfarticle(id);
      if (articleIndex < 0) {
        return false;
      }
      var myFavList = getAllfav();
      myFavList[articleIndex].itemsnum =
        typeof itemsnum === "undefined"
          ? myFavList[articleIndex].itemsnum
          : itemsnum;
      setAllfav(myFavList);
      return true;
    };
    var setarticle = function (id, tracktitle, link, desc, itemsnum, coverartimg) {
      if (typeof id === "undefined") {
        console.error("Fav id required");
        return false;
      }
      if (typeof tracktitle === "undefined") {
        console.error("Fav tracktitle required");
        return false;
      }
      if (typeof link === "undefined") {
        console.error("Fav link required");
        return false;
      }
      if (typeof coverartimg === "undefined") {
        console.error("Fav coverartimg required");
        return false;
      }
      desc = typeof desc === "undefined" ? "" : desc;
      if (!updatePoduct(id)) {
        addarticle(id, tracktitle, link, desc, itemsnum, coverartimg);
      }
    };
    var cleararticle = function () {
      setAllfav([]);
    };
    var removearticle = function (id) {
      var myFavList = getAllfav();
      myFavList = $.grep(myFavList, function (value, index) {
        return value.id != id;
      });
      setAllfav(myFavList);
    };
    var getTotalQuantity = function () {
      var total = 0;
      var myFavList = getAllfav();
      $.each(myFavList, function (index, value) {
        total += value.itemsnum;
      });
      return total;
    };
    objToReturn.getAllfav = getAllfav;
    objToReturn.updatePoduct = updatePoduct;
    objToReturn.setarticle = setarticle;
    objToReturn.cleararticle = cleararticle;
    objToReturn.removearticle = removearticle;
    objToReturn.getTotalQuantity = getTotalQuantity;
    return objToReturn;
  })();
  var loadFavEvent = function (userOptions) {
    var options = OptionManager.getOptions(userOptions);
    var $favIcon = $("." + options.favIcon);
    var $favBadge = $("." + options.favBadge);
    var articleQuantity = options.articleQuantity;
    var idfavNodata = "no-data";
    var idFavModal = "FavLists";
    var idfavTable = "fav-list";
    var AffixMyfavIcon = "favIcon-affix";
    $favBadge.text(articleManager.getTotalQuantity());
    if (!$("#" + idFavModal).length) {
      $("#FetchFavLists").append(
        '<div class="bootstrap-wrapper" id="' +
          idFavModal +
          '">' +
          '<div class="row" id="' +
          idfavTable +
          '"></div>' +
          "</div>"
      );
    }
    var drawTable = function () {
      var $favTable = $("#" + idfavTable);
      var $favNodata = $("#" + idfavNodata);
      $favTable.empty();
      $favNodata.empty();
      var myFavList = articleManager.getAllfav();
      $.each(myFavList, function () {
        $favTable.append(
          '<div class="col-6 col-sm-4 col-lg-3" data-id="' +
            this.id +
            '"><div class="fav_cntr"><div class="fav_cvr"><a href="' +
            this.link +
            '" target="_blank"><img src="' +
            this.coverartimg +
            '" alt="Cover Art"></a></div><div class="fav_tle"><h3><a href="' +
            this.link +
            '" target="_blank">' +
            this.tracktitle +
            "</a></h3></div></div></div>"
        );
      });
      $favNodata.append(
        myFavList.length
          ? ""
          : '<div class="cox-card cox-card-style rounded-s" style="margin-top: 30px;"><h6 class="font-14 only-tst-svg">' + favEmptyMsg + '<a href="' + settingsLink + '"><span class="pt-1 font-13 float-right">' + settingsSvg + '</span></a></h6></div>'
      );
    };
    var showModal = function () {
      drawTable();
    };

    $(document).ready(function () {
      var $tr = $(".add-fav-btn");
  const loginEmail = $tr.data("id");
  if (localStorage.getItem("myFavList")) {
    const allStoredIds = JSON.parse(localStorage.getItem("myFavList"));
    const matchedId = allStoredIds.filter((user) => {
      return loginEmail === user.id;
    });
    if (matchedId.length) {
      $(".like").addClass("is-liked");
      $(".like").html(
        '<svg class="svg-inline--fa fa-heart fa-xl" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>'
      );
    } else {

    }
  } else {
  }
      options.showFavModal
        ? showModal()
        : options.clickOnfavIcon(articleManager.getAllfav());
    });
    $(document).on("keypress", "." + articleQuantity, function (evt) {
      if (evt.keyCode == 38 || evt.keyCode == 40) {
        return;
      }
      evt.preventDefault();
    });
    $(document).on(
      {
        click: function () {
          $(".like").toggleClass("is-liked");
          
          if ($(this).hasClass("is-liked")) {
            $(this).html(
              '<svg class="svg-inline--fa fa-heart fa-xl" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>'
            );
            $(".add-fav-btn").trigger("click");
            toastNotif('<i class="check"></i>' + "Added To My Favourite");
            options.showFavModal
        ? showModal()
        : options.clickOnfavIcon(articleManager.getAllfav());
          } else {
            $(this).html(
              '<svg class="svg-inline--fa fa-heart fa-xl" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg>'
            );
            var tr = $(".add-fav-btn");
            var id = tr.data("id");
            articleManager.removearticle(id);
            toastNotif('<i class="remove"></i>' + "Removed From My Favourite");
            $favBadge.text(articleManager.getTotalQuantity());
            options.showFavModal
        ? showModal()
        : options.clickOnfavIcon(articleManager.getAllfav());
          }
        },
      },
      ".like"
    );
  };
  $(function () {
    var goTomyFav = function ($addTofavBtn) {};
    var _0x4117 = ["log", "afterAddOnFav", "fav-count", ".add-fav-btn"];
    (function (b, c) {
      var d = function (a) {
        while (--a) {
          b.push(b.shift());
        }
      };
      d(++c);
    })(_0x4117, 214);
    var _0x3889 = function (a, b) {
      a = a - 0;
      var c = _0x4117[a];
      return c;
    };
    $(_0x3889("0x1")).TomyFav({
      favIcon: _0x3889("0x0"),
      affixFavIcon: true,
      clickOnAddToFav: function (a) {
        goTomyFav(a);
      },
      afterAddOnFav: function (a) {
        console[_0x3889("0x2")](_0x3889("0x3"), a);
      },
      clickOnAddToFav: function (a) {
        goTomyFav(a);
      },
    });
  });
  var MyFav = function (target, userOptions) {

    var $target = $(target);
    var options = OptionManager.getOptions(userOptions);
    var $favBadge = $("." + options.favBadge);
    $target.click(function () {
      options.clickOnAddToFav($target);
      var id = $target.data("id");
      var tracktitle = $target.data("tracktitle");
      var link = $target.data("link");
      var desc = $target.data("desc");
      var itemsnum = $target.data("itemsnum");
      var coverartimg = $target.data("coverartimg");
      articleManager.setarticle(id, tracktitle, link, desc, itemsnum, coverartimg);
      $favBadge.text(articleManager.getTotalQuantity());
    });
  };
  $.fn.TomyFav = function (userOptions) {
    loadFavEvent(userOptions);
    return $.each(this, function () {
      new MyFav(this, userOptions);
    });
  };
})(jQuery);