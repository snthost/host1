!function(s){"use strict";for(var a=s(".slick1").find(".item-slick1"),e=[],i=[],t=[],l=[],o=[],r=[],n=0;n<a.length;n++)l[n]=s(a[n]).find(".caption1-slide1"),o[n]=s(a[n]).find(".caption2-slide1"),r[n]=s(a[n]).find(".wrap-btn-slide1");s(".slick1").on("init",function(){e[0]=setTimeout(function(){s(l[0]).addClass(s(l[0]).data("appear")+" visible-true")},200),i[0]=setTimeout(function(){s(o[0]).addClass(s(o[0]).data("appear")+" visible-true")},1e3),t[0]=setTimeout(function(){s(r[0]).addClass(s(r)[0].data("appear")+" visible-true")},1800)}),s(".slick1").slick({slidesToShow:1,slidesToScroll:1,fade:!0,dots:!1,appendDots:s(".wrap-slick1-dots"),dotsClass:"slick1-dots",infinite:!0,autoplay:!0,autoplaySpeed:6e3,arrows:!0,appendArrows:s(".wrap-slick1"),prevArrow:'<button class="arrow-slick1 prev-slick1"><i class="fa  fa-angle-left" aria-hidden="true"></i></button>',nextArrow:'<button class="arrow-slick1 next-slick1"><i class="fa  fa-angle-right" aria-hidden="true"></i></button>'}),s(".slick1").on("afterChange",function(n,d,c){for(var p=0;p<a.length;p++)clearTimeout(e[p]),clearTimeout(i[p]),clearTimeout(t[p]),s(l[p]).removeClass(s(l[p]).data("appear")+" visible-true"),s(o[p]).removeClass(s(o[p]).data("appear")+" visible-true"),s(r[p]).removeClass(s(r[p]).data("appear")+" visible-true");e[c]=setTimeout(function(){s(l[c]).addClass(s(l[c]).data("appear")+" visible-true")},200),i[c]=setTimeout(function(){s(o[c]).addClass(s(o[c]).data("appear")+" visible-true")},1e3),t[c]=setTimeout(function(){s(r[c]).addClass(s(r)[c].data("appear")+" visible-true")},1800)}),s(".slick2").slick({slidesToShow:4,slidesToScroll:4,infinite:!0,autoplay:!1,autoplaySpeed:6e3,arrows:!0,appendArrows:s(".wrap-slick2"),prevArrow:'<button class="arrow-slick2 prev-slick2"><i class="fa  fa-angle-left" aria-hidden="true"></i></button>',nextArrow:'<button class="arrow-slick2 next-slick2"><i class="fa  fa-angle-right" aria-hidden="true"></i></button>',responsive:[{breakpoint:1200,settings:{slidesToShow:4,slidesToScroll:4}},{breakpoint:992,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:576,settings:{slidesToShow:1,slidesToScroll:1}}]}),s(".slick3").slick({slidesToShow:1,slidesToScroll:1,fade:!0,dots:!0,appendDots:s(".wrap-slick3-dots"),dotsClass:"slick3-dots",infinite:!0,autoplay:!1,autoplaySpeed:6e3,arrows:!1,customPaging:function(a,e){var i=s(a.$slides[e]).data("thumb");return'<img src=" '+i+' "/><div class="slick3-dot-overlay"></div>'}})}(jQuery);
