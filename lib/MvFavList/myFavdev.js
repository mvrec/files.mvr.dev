(function ($) {
  "use strict";
  var OptionManager = (function () {
    var objToReturn = {};
    var defaultOptions = {
      favIcon: "favIcon",
      favBadge: "show-fav-count",
      articleQuantity: "article-quantity",
      affixFavIcon: true,
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
    localStorage.myFavList = localStorage.myFavList ? localStorage.myFavList : "";
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
    var addarticle = function (id, title, link, summary, quantity, borkimage) {
      var myFavList = getAllfav();
      myFavList.push({
        id: id,
        title: title,
        link: link,
        summary: summary,
        quantity: quantity,
        borkimage: borkimage,
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
    var updatePoduct = function (id, quantity) {
      var articleIndex = getIndexOfarticle(id);
      if (articleIndex < 0) {
        return false;
      }
      var myFavList = getAllfav();
      myFavList[articleIndex].quantity =
        typeof quantity === "undefined"
          ? myFavList[articleIndex].quantity
          : quantity;
      setAllfav(myFavList);
      return true;
    };
    var setarticle = function (id, title, link, summary, quantity, borkimage) {
      if (typeof id === "undefined") {
        console.error("id required");
        return false;
      }
      if (typeof title === "undefined") {
        console.error("title required");
        return false;
      }
      if (typeof link === "undefined") {
        console.error("link required");
        return false;
      }
      if (typeof borkimage === "undefined") {
        console.error("borkimage required");
        return false;
      }
      summary = typeof summary === "undefined" ? "" : summary;
      if (!updatePoduct(id)) {
        addarticle(id, title, link, summary, quantity, borkimage);
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
        total += value.quantity;
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
    var idfavNodata= "no-data";
    var idFavModal = "R-model";
    var idfavTable = "recent-list";
    var AffixMyfavIcon = "favIcon-affix";
    $favBadge.text(articleManager.getTotalQuantity());
    if (!$("#" + idFavModal).length) {
      $("#RecentPlays").append(
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
      var myFavList = articleManager.getAllfav();
      $.each(myFavList, function () {
        $favTable.append(
          '<div class="col-6 col-sm-4 col-lg-3" data-id="' +
            this.id +
            '"><div class="album"><div class="album__cover"><a href="' +
            this.link +
            '" class="turl" target="_blank"><img class="curl" src="' +
            this.borkimage +
            '" alt="Cover Art"></a></div><div class="album__title"><h3><a href="' +
            this.link +
            '" class="turl" target="_blank">' +
            this.title +
            "</a></h3></div></div></div>"
        );
      });
      $favNodata.append(
        myFavList.length
          ? ""
          : '<div class="cox-card cox-card-style bg-green-dark rounded-s"><h6 class="font-14 only-tst-svg">Your liked songs will show up here<br/>If you have a backup file, You can import (MvRec-MyFavList.json) file in settings.<a href="/p/settings.html"><span class="pt-1 font-13 float-right"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126"/></svg></span></a></h6></div>'
      );
    };
    var showModal = function () {
      drawTable();
    };
    /*
EVENT ADD TO BOOKMARK LIST
*/
    if (options.affixFavIcon) {
      var favIconBottom =
        $favIcon.offset().top * 1 +
        $favIcon.css("height").match(/\d+/) * 1;
      $(window).scroll(function () {
        $(window).scrollTop() >= favIconBottom
          ? $favIcon.addClass(AffixMyfavIcon)
          : $favIcon.removeClass(AffixMyfavIcon);
      });
    }
    $favIcon.click(function () {
      options.showFavModal
        ? showModal()
        : options.clickOnfavIcon(
            $favIcon,
            articleManager.getAllfav()
          );
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
            // $(this).text("Liked")
            $(this).html(
              '<svg xmlns="http://www.w3.org/2000/svg" fill="#ff006a" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>'
            );
            $(".add-fav-btn").trigger("click");
          } else {
            $(this).html(
              '<svg height="24" viewBox="0 0 24 24" width="24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"></path></svg>'
            );
            //  $(this).text("Like");
            var tr = $(".add-fav-btn");
            var id = tr.data("id");
            articleManager.removearticle(id);
            $favBadge.text(articleManager.getTotalQuantity());
          }
        },
      },
      ".like"
    );
  };
  $(document).on(
    {
      click: function () {
        $(".pop-area").toggleClass("open");
        return false;
      },
    },
    ".fav-count"
  );
  $(function () {
    var goTomyFav = function ($addTofavBtn) {};
    var _0x4117 = [
      "log",
      "afterAddOnFav",
      "fav-count",
      ".add-fav-btn",
    ];
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
    /*
PRIVATE
*/
    var $target = $(target);
    var options = OptionManager.getOptions(userOptions);
    var $favBadge = $("." + options.favBadge);
    /*
EVENT TARGET ADD TO BOOKMARK
*/
    $target.click(function () {
      options.clickOnAddToFav($target);
      var id = $target.data("id");
      var title = $target.data("title");
      var link = $target.data("link");
      var summary = $target.data("summary");
      var quantity = $target.data("quantity");
      var borkimage = $target.data("borkimage");
      articleManager.setarticle(id, title, link, summary, quantity, borkimage);
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
$(document).ready(function () {
  $(".fav-count").trigger("click");
  var $tr = $(".add-fav-btn");
  const loginEmail = $tr.data("id");
  if (localStorage.getItem("myFavList")) {
    const allStoredIds = JSON.parse(localStorage.getItem("myFavList"));
    const matchedId = allStoredIds.filter((user) => {
      return loginEmail === user.id;
    });
    if (matchedId.length) {
      console.log("id exits");
      $(".like").addClass("is-liked");
      $(".like").html(
        '<svg xmlns="http://www.w3.org/2000/svg" fill="#ff006a" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>'
      );
      // $(".like").text("Liked")
    } else {
      console.log("id not exits");
    }
  } else {
   // console.log("myFavList is Empty");
  }
});
