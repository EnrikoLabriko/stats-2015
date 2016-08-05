(function(modules, $, DIMixpanel, docCookies) {
  'use strict';

  var stats2015Init = function(provide, moduleBookCard, ReviewSlider, ButtonSocialShare, RouterWeb, BM) {
    $("@stats-2015-social-counter").socialCounters({
      url: `https://bookmate.com/library/2015?lang=${BM.user.getLocale()}`
    });

    new ReviewSlider({
        element: '@2015-quotes-slider'
    });

    new ReviewSlider({
        element: '@2015-covers-slider'
    });

    $(function() {
      $(".bm-stats-2015").addClass("visible");
      $("@stats-2015-curl").addClass("animated");
    });

    $("@bm-book-card").each(function(el) {
      new moduleBookCard({
        element: this
      })
    });

    if (docCookies.getItem('2015-stats-page-shown') === null) {
        docCookies.setItem('2015-stats-page-shown', '1', 1000 * 60 * 30, '/');
        DIMixpanel.track('NY 2015 Page Shown');
    }

    function _bindEvents($elements) {
      var self = this;
      var clickEvent = BM.tools.client.isTouch() ? BM.tools.client.touchEvent : 'click';

      $elements.on(clickEvent, function(e){
        if ($(this).hasClass('selectable')) { return; }
        if (BM.tools.client.isTouch()) { return; }
        e.preventDefault();
        e.stopPropagation();

        DIMixpanel.discovered.set({
          channel: 'book',
          ctx: 'results2015',
          uuid: $(this).parent().find('.bookcard-link').data('discovered-id')
        });

        RouterWeb.navigateToBookPage($(this).parent().find('.bookcard-link').data('book-uuid'));

      });

      _radioSubscribe();
    }

    function _radioSubscribe(){
      var self = this;
      radio('authenticationSuccessful').subscribe(function(source, action, id, userLogin) {
        if (authPopupOpener === self) {
          if (self._loginWindow.preventDefaultLoginBehavior !== false) {
            if (self._readButtonHandler !== null) {
              self._readButtonHandler.sendRequestAddBookToLibrary();
            }
          } else {
            self._reloadAfterBookAdding = false;
          }
        }
      });
    }

    function initMap() {
      var map;

      var setMapWidth = function () {
        var $map = $('.stats-2015__map');
        var $mapSection = $('.stats-2015__section--map');

        setInterval(function() {
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            $map.add($mapSection).css('width', windowWidth + 'px');
            $map.css('height', windowHeight * 0.67 + 'px');
            $map.css('margin', '0');
            $mapSection.css('margin', '0').css('margin-left', '-' + $mapSection.offset().left + 'px');
          }, 500);
      };

      var insertMapInfo = function() {
        var locale = BM.config.mainConfig.locale;
        var markerIcon = 'https://bookmate.com/images/library/2015/pin.png';
        var infoWindow = 'https://bookmate.com/images/library/2015/info-window.png';
        var bookInfo = [];

        var coord;
        if (locale == 'ru') {
          coord = [{"country":"Russia","coords":{"lat":61.52401,"lng":105.318756}},{"country":"Ukraine","coords":{"lat":48.379433,"lng":31.16558}},{"country":"Belarus","coords":{"lat":48.379433,"lng":31.16558}},{"country":"Kazakhstan","coords":{"lat":48.019573,"lng":66.923684}},{"country":"Kazakhstan","coords":{"lat":48.019573,"lng":66.923684}},{"country":"United States","coords":{"lat":37.09024,"lng":-95.712891}},{"country":"Israel","coords":{"lat":31.046051,"lng":34.851612}},{"country":"Germany","coords":{"lat":51.165691,"lng":10.451526}},{"country":"Turkey","coords":{"lat":38.963745,"lng":35.243322}},{"country":"Indonesia","coords":{"lat":-0.789275,"lng":113.921327}},{"country":"United Kingdom","coords":{"lat":55.378051,"lng":-3.435973}},{"country":"Italy","coords":{"lat":41.87194,"lng":12.56738}},{"country":"France","coords":{"lat":46.227638,"lng":2.213749}},{"country":"Greece","coords":{"lat":39.074208,"lng":21.824312}},{"country":"Kyrgyzstan","coords":{"lat":41.20438,"lng":74.766098}},{"country":"Azerbaijan","coords":{"lat":40.143105,"lng":47.576927}},{"country":"China","coords":{"lat":35.86166,"lng":104.195397}},{"country":"Singapore","coords":{"lat":1.352083,"lng":103.819836}},{"country":"India","coords":{"lat":20.593684,"lng":78.96288}},{"country":"Canada","coords":{"lat":56.130366,"lng":-106.346771}},{"country":"Mexico","coords":{"lat":23.634501,"lng":-102.552784}},{"country":"Malaysia","coords":{"lat":4.210484,"lng":101.975766}},{"country":"Belgium","coords":{"lat":50.503887,"lng":4.469936}},{"country":"Guatemala","coords":{"lat":15.783471,"lng":-90.23075899999999}},{"country":"Colombia","coords":{"lat":4.570868,"lng":-74.297333}},{"country":"Japan","coords":{"lat":36.204824,"lng":138.252924}},{"country":"Australia","coords":{"lat":-25.274398,"lng":133.775136}},{"country":"Sweden","coords":{"lat":60.12816100000001,"lng":18.643501}},{"country":"Serbia","coords":{"lat":44.016521,"lng":21.005859}},{"country":"South Africa","coords":{"lat":-30.559482,"lng":22.937506}},{"country":"Bolivia","coords":{"lat":-16.290154,"lng":-63.58865299999999}},{"country":"Portugal","coords":{"lat":39.39987199999999,"lng":-8.224454}},{"country":"Philippines","coords":{"lat":12.879721,"lng":121.774017}},{"country":"Nigeria","coords":{"lat":9.081999,"lng":8.675277}},{"country":"Republic of Ireland","coords":{"lat":53.41291,"lng":-8.24389}},{"country":"Hungary","coords":{"lat":47.162494,"lng":19.503304}},{"country":"Chile","coords":{"lat":-35.675147,"lng":-71.542969}},{"country":"Tajikistan","coords":{"lat":38.861034,"lng":71.276093}},{"country":"Malta","coords":{"lat":35.937496,"lng":14.375416}},{"country":"Dominican Republic","coords":{"lat":18.735693,"lng":-70.162651}},{"country":"Brazil","coords":{"lat":-14.235004,"lng":-51.92528}},{"country":"Paraguay","coords":{"lat":-23.442503,"lng":-58.443832}},{"country":"Slovenia","coords":{"lat":46.151241,"lng":14.995463}},{"country":"Cambodia","coords":{"lat":12.565679,"lng":104.990963}},{"country":"Romania","coords":{"lat":45.943161,"lng":24.96676}},{"country":"Saudi Arabia","coords":{"lat":23.885942,"lng":45.079162}},{"country":"Taiwan","coords":{"lat":23.69781,"lng":120.960515}},{"country":"Luxembourg","coords":{"lat":49.815273,"lng":6.129582999999999}},{"country":"Monaco","coords":{"lat":43.73841760000001,"lng":7.424615799999999}},{"country":"Peru","coords":{"lat":-9.189967,"lng":-75.015152}},{"country":"Iceland","coords":{"lat":64.963051,"lng":-19.020835}},{"country":"Angola","coords":{"lat":-11.202692,"lng":17.873887}},{"country":"Zimbabwe","coords":{"lat":-19.015438,"lng":29.154857}},{"country":"Iran","coords":{"lat":32.427908,"lng":53.688046}},{"country":"Mongolia","coords":{"lat":46.862496,"lng":103.846656}},{"country":"Jamaica","coords":{"lat":18.109581,"lng":-77.297508}},{"country":"Iraq","coords":{"lat":33.223191,"lng":43.679291}},{"country":"South Sudan","coords":{"lat":6.876991899999999,"lng":31.3069788}},{"country":"Ghana","coords":{"lat":7.946527,"lng":-1.023194}},{"country":"The Bahamas","coords":{"lat":25.03428,"lng":-77.39627999999999}},{"country":"Cuba","coords":{"lat":21.521757,"lng":-77.781167}},{"country":"Andorra","coords":{"lat":42.506285,"lng":1.521801}},{"country":"Syria","coords":{"lat":34.80207499999999,"lng":38.996815}},{"country":"Senegal","coords":{"lat":14.497401,"lng":-14.452362}},{"country":"Mozambique","coords":{"lat":-18.665695,"lng":35.529562}}];
        } else {
          coord = [{"country":"Russia","coords":{"lat":61.52401,"lng":105.318756}},{"country":"United States","coords":{"lat":37.09024,"lng":-95.712891}},{"country":"Germany","coords":{"lat":51.165691,"lng":10.451526}},{"country":"Turkey","coords":{"lat":38.963745,"lng":35.243322}},{"country":"Indonesia","coords":{"lat":-0.789275,"lng":113.921327}},{"country":"United Kingdom","coords":{"lat":55.378051,"lng":-3.435973}},{"country":"Italy","coords":{"lat":41.87194,"lng":12.56738}},{"country":"France","coords":{"lat":46.227638,"lng":2.213749}},{"country":"Singapore","coords":{"lat":1.352083,"lng":103.819836}},{"country":"India","coords":{"lat":20.593684,"lng":78.96288}},{"country":"Canada","coords":{"lat":56.130366,"lng":-106.346771}},{"country":"Mexico","coords":{"lat":23.634501,"lng":-102.552784}},{"country":"Malaysia","coords":{"lat":4.210484,"lng":101.975766}},{"country":"Belgium","coords":{"lat":50.503887,"lng":4.469936}},{"country":"Guatemala","coords":{"lat":15.783471,"lng":-90.23075899999999}},{"country":"Colombia","coords":{"lat":4.570868,"lng":-74.297333}},{"country":"Japan","coords":{"lat":36.204824,"lng":138.252924}},{"country":"Australia","coords":{"lat":-25.274398,"lng":133.775136}},{"country":"Sweden","coords":{"lat":60.12816100000001,"lng":18.643501}},{"country":"South Africa","coords":{"lat":-30.559482,"lng":22.937506}},{"country":"Bolivia","coords":{"lat":-16.290154,"lng":-63.58865299999999}},{"country":"Portugal","coords":{"lat":39.39987199999999,"lng":-8.224454}},{"country":"Philippines","coords":{"lat":12.879721,"lng":121.774017}},{"country":"Nigeria","coords":{"lat":9.081999,"lng":8.675277}},{"country":"Republic of Ireland","coords":{"lat":53.41291,"lng":-8.24389}},{"country":"Hungary","coords":{"lat":47.162494,"lng":19.503304}},{"country":"Chile","coords":{"lat":-35.675147,"lng":-71.542969}},{"country":"Dominican Republic","coords":{"lat":18.735693,"lng":-70.162651}},{"country":"Brazil","coords":{"lat":-14.235004,"lng":-51.92528}},{"country":"Paraguay","coords":{"lat":-23.442503,"lng":-58.443832}},{"country":"Romania","coords":{"lat":45.943161,"lng":24.96676}},{"country":"Saudi Arabia","coords":{"lat":23.885942,"lng":45.079162}},{"country":"Taiwan","coords":{"lat":23.69781,"lng":120.960515}},{"country":"Peru","coords":{"lat":-9.189967,"lng":-75.015152}},{"country":"Iceland","coords":{"lat":64.963051,"lng":-19.020835}},{"country":"Zimbabwe","coords":{"lat":-19.015438,"lng":29.154857}},{"country":"Iran","coords":{"lat":32.427908,"lng":53.688046}},{"country":"Jamaica","coords":{"lat":18.109581,"lng":-77.297508}},{"country":"Iraq","coords":{"lat":33.223191,"lng":43.679291}},{"country":"Ghana","coords":{"lat":7.946527,"lng":-1.023194}},{"country":"The Bahamas","coords":{"lat":25.03428,"lng":-77.39627999999999}},{"country":"Mozambique","coords":{"lat":-18.665695,"lng":35.529562}}];
        }

        $('.book-info').each(function() {
          var info = {};
          info.title = $(this).data('title');
          info.author = $(this).data('author');
          info.cover = $(this).data('cover');
          info.id = $(this).data('id');

          bookInfo.push(info);
        });

        var mapInfo = $.extend(true, coord, bookInfo);
        var prevMarker;
        var prevInfoWindow;

        mapInfo.forEach(function(elem) {
          var marker = new google.maps.Marker({
            position: elem.coords,
            title: elem.country,
            map: map,
            icon: markerIcon
          });

          var cover;
          elem.cover ? cover = '<img class="info-cover" src="' + elem.cover + '" /><br>' : cover = '';
          var bookLink = "https://bookmate.com/books/" + elem.id;

          var infowindow = new google.maps.InfoWindow({
            content: '<div class="info-window">' +
            '<a href="' + bookLink + '" >' +
              cover +
              '<div class="info-title">' + elem.title + '</div>' +
              '<div class="info-author">' + elem.author + '</div>' +
            '</a>' +
            '</div>'
          });

          marker.addListener('click', function() {
            if (prevMarker) {
              prevInfoWindow.close(map, prevMarker);
            }
            infowindow.open(map, marker);
            prevMarker = marker;
            prevInfoWindow = infowindow;
          });
        });
      };

      var insertMap = function() {
        setMapWidth();

        var mapTimer = setInterval(function() {
          if ($('.stats-2015__section--map').hasClass('initiated')) {
            map = new google.maps.Map(document.getElementById('stats-2015__map'), {
              center: {lat: 45.3269, lng: 0.0075},
              zoom: 3,
              scrollwheel: false,
              styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]},{featureType: "administrative.province", elementType: "geometry", stylers: [{ visibility: "off" }]},{featureType: "administrative.province", elementType: "labels", stylers: [{ visibility: "off" }]}]
            });

            clearInterval(mapTimer);

            insertMapInfo();
          }
        }, 500);
      };

      insertMap();
    }

    function renderImpressed() {
      var locale = BM.config.mainConfig.locale;
      var $impressed = $('.stats-2015__section--most-impressed .bookcard');

      var cardsRu = [
        'Не оторваться',
        'Романтическая',
        'Мудрая',
        'Познавательная',
        'Полезная',
        'В отпуск',
        'Фуууу',
        'Страшная',
        'Весёлая',
        'Ничего не понял'
      ];

      var cardsEn = [
        'Unputdownable',
        'Loved up',
        'Hidden Depths',
        'Learnt A Lot',
        'Worthwhile',
        'Beach Bag Book',
        'Utter Crap',
        'Spooky',
        'LOLZ',
        'Lost on me'
      ];

      var cardsEs = [
        'Adictivo',
        'Romántico',
        'Profundidades',
        'He aprendido mucho',
        'Vale la pena',
        'Libro de playa',
        'Una porquería',
        'Espeluznante',
        'Juas',
        'Ni fu ni fa'
      ];

      var cardsId = [
        'Sangat menarik',
        'Romantis',
        'Kearifan Tersembunyi',
        'Banyak pelajaran',
        'Bermanfaat',
        'Buku Bekal Liburan',
        'Omong kosong',
        'Mengerikan',
        'Lucu',
        'Tidak Mengerti'
      ];

      var emoji = [
        '🚀',
        '💞',
        '🔮',
        '💡',
        '🎯',
        '🌴',
        '💩',
        '💀',
        '😄',
        '🙈'
      ];

      var cardsByLocale = {
        en: cardsEn,
        ru: cardsRu,
        es: cardsEs,
        id: cardsId
      };

      if (!cardsByLocale[locale]) {
        cardsByLocale[locale] = cardsEn;
      }

      $impressed.each(function(index) {
        $(this).prepend(
          $('<div />', {
            "class": 'bookcard-layer',
            html: emoji[index] + '<div class="bookcard-layer-note">' + cardsByLocale[locale][index] +'</div>'
          })
        ).find('.bookcard-label').text(emoji[index] + cardsByLocale[locale][index])
      });

      if ($(window).width() > 1023) {
        $('.bookcard-layer').eq(7).slideToggle();
      }

      $('.bookcard-layer').click(function(e) {
        var shift = parseInt($('.bookcard-layer').first().css('height'));

        e.preventDefault();
        $(this).animate({ 'margin-top': -shift + 'px' }, 500);
      })
    }

    function insertLikesForQuotes() {
      var locale = BM.config.mainConfig.locale;
      if (locale != 'ru' && locale != 'en' && locale != 'id') { return; }
      var $quote = $('.bm-page-about-content-reviews-item');

      var quotesRu = [
        {
          author: "tetvladimir",
          id: "P8COrQct"
        },
        {
          author: "blackbiblee",
          id: "CMDXkwmM"
        },
        {
          author: "mrsgalt",
          id: "EdmFT44C"
        },
        {
          author: "ksenialog",
          id: "Mml817J6"
        },
        {
          author: "rubomari",
          id: "ag09JE9E"
        },
        {
          author: "JKB",
          id: "V7bCuWDb"
        },
        {
          author: "administrator",
          id: "bfbH8s8L"
        },
        {
          author: "SeTeM",
          id: "TcW3GbCJ"
        },
        {
          author: "ignatgrob",
          id: "OOUsxU68"
        },
        {
          author: "nadyayurinova",
          id: "ZBRLh4Lb"
        }
      ];

      var quotesEn = [
        {
          author: "roginikandayah",
          id: "tiKT8cez"
        },
        {
          author: "romalapin",
          id: "sWdJVMFe"
        },
        {
          author: "b1784340806",
          id: "vGWsJm0E"
        },
        {
          author: "b9332057693",
          id: "gjhwe9qC"
        },
        {
          author: "yooooyana",
          id: "e6PjIeii"
        },
        {
          author: "antonagorodetsky",
          id: "iZFfV4VA"
        },
        {
          author: "kseniakriukova",
          id: "nszDehRW"
        },
        {
          author: "SamiraGuliyeva91",
          id: "JkDmud34"
        },
        {
          author: "b4746233619",
          id: "Jhtdi3rc"
        },
        {
          author: "asanisimasalait",
          id: "jNs4yO7z"
        }
      ];

      var quotesId = [
        {
          author: "shafiraartiza",
          id: "LcCeyiDD"
        },
        {
          author: "annatigina",
          id: "DxYAnBbr"
        },
        {
          author: "faridisalman",
          id: "Lrja4cTN"
        },
        {
          author: "lailiaja2",
          id: "LvqleTgH"
        },
        {
          author: "AyuriscaPL",
          id: "CsjMZDaW"
        },
        {
          author: "aimeeetha",
          id: "DNywf39o"
        }
      ];

      var quotesByLocale = {
        ru: quotesRu,
        en: quotesEn,
        id: quotesId
      };

      $quote.each(function(index) {
        $(this).attr('id', 'quote-' + index);
      });

      $quote.each(function(index) {
        var $buttonShare = $($(this)[0]).find('@bm-button-social-share');

        var _buttonShare = new ButtonSocialShare({
          element: $buttonShare
        });

        if (!quotesByLocale[locale]) {
          quotesByLocale[locale] = quotesEn;
        }

        $('#quote-' + index).find('.bm-quote-social').append(_buttonShare.getElement());

        if (quotesByLocale[locale][index]) {
          var url = "https://bookmate.com/" + quotesByLocale[locale][index].author + "/quotes/" + quotesByLocale[locale][index].id;

          _buttonShare.setConfig({
            dropdown: true,
            url: url,
            twitter: {
              url: url
            },
            vkontakte: {
              url: url,
              description: 'auto',
              title: 'auto'
            }
          });
        }
      });

      if (locale == 'ru') {
        $('.bm-button-social-share').append('Поделиться');
      } else if (locale == 'id') {
        $('.bm-button-social-share').append('Bagikan');
      } else if (locale == 'en') {
        $('.bm-button-social-share').append('Share');
      }
    }

    function sliceBookTitle(bookTitle, maxLength) {
      if (BM.tools.isString(bookTitle) && !BM.tools.isNull(maxLength)) {
        if (bookTitle.length > maxLength) {
          if (bookTitle[0] === '(' && bookTitle[bookTitle.length - 1] === ')') {
            bookTitle = bookTitle.slice(1, bookTitle.length - 1);
          }
          bookTitle = bookTitle.replace(/ ?\([^)]+\) ?/ig, ' ');

          if (bookTitle.length <= maxLength) {
            return bookTitle;
          }

          bookTitle = bookTitle.trim().slice(0, maxLength);

          if (bookTitle[0] === '(') {
            bookTitle = bookTitle.slice(1, bookTitle.length);
          }

          if (bookTitle.indexOf('.') !== -1) {
            bookTitle.lastIndexOf('.');
            bookTitle = bookTitle.slice(0, bookTitle.lastIndexOf('.'));
          } else if (bookTitle.indexOf(':') !== -1) {
            bookTitle = bookTitle.slice(0, bookTitle.lastIndexOf(':'));
          } else {
            bookTitle = bookTitle.split(' ');
            if (bookTitle[bookTitle.length - 1].length >= 3) {
              bookTitle[bookTitle.length - 1] = '...';
            } else {
              bookTitle.splice(bookTitle.length - 1, 1);
              bookTitle[bookTitle.length - 1] = '...';
            }
            bookTitle = bookTitle.join(' ');
            bookTitle = bookTitle.slice(0, -4) + '...';

            if (bookTitle[bookTitle.length - 4] === ',') {
              bookTitle = bookTitle.slice(0, -4) + '...';
            }

          }
          return bookTitle;

        } else {
          return bookTitle;
        }
      }
      return bookTitle;
    }

    function sliceBookTitleHandler() {
      $('.bookcard-title').find('.bookcard-meta-link').each(function(index) {
        $(this).text(sliceBookTitle($(this).text(), 40));
      })
    }

    function initPersonalStats() {

      var dataRu = [
        {
          min: 0,
          max: 0,
          color: '#4FB5F0',
          data: [
            'Столько светит солнце зимой <br> на Шпицбергене',
            'Столько длился единственный <br> концерт Дэвида Боуи в СССР'
          ]
        },{
          min: 1,
          max: 2,
          color: '#E3CA4B',
          data: [
            'Столько нужно, чтобы добраться <br> до дна ленты Фейсбука',
            'Столько нужно, чтобы <br> оцифровать одну книгу',
            'За это время 3D-принтер <br> печатает живое ухо',
            'Столько нужно, чтобы собрать <br> шведский комод из ДСП',
            'За это время кашалот один раз <br> всплыл на поверхность подышать'
          ]
        },{
          min: 3,
          max: 5,
          color: '#FC8053',
          data: [
            'Столько длится алкогольный кураж',
            'Столько нужно, чтобы поставить <br> паруса на трехмачтовом барке'
          ]
        },{
          min: 6,
          max: 14,
          color: '#36CF6E',
          data: [
            'За это время замерзают <br> Патриаршие пруды в морозную ночь '
          ]
        },{
          min: 15,
          max: 17,
          color: '#36CF6E',
          data: [
            'Cтолько длятся все четыре акта оперы <br> «Кольцо нибелунга» без антрактов'
          ]
        },{
          min: 18,
          max: 28,
          color: '#4F95F0',
          data: [
            'Столько живет вирус гриппа <br> на твердых предметах ',
            'Столько идет радиосигнал до станции <br> «Вояджер–1» на краю Солнечной системы',
            'За это время кошка начисто <br> забыла вчерашний день'
          ]
        },{
          min: 29,
          max: 45,
          color: '#FC8053',
          data: [
            'Столько бегут сверхмарафон <br> в калифорнийской Долине Смерти',
            'Столько тает сухой лед',
            'Столько готовятся утка по-пекински <br> и говядина по-бургундски',
            'Столько времени в неделю студенты <br> Кембриджа на самом деле учатся'
          ]
        },{
          min: 46,
          max: 79,
          color: '#4FB5F0',
          data: [
            'Столько летят на зимовку <br> в Каталонию шведские гуси',
            'За это время бобер успел <br> cвалить одно дерево'
          ]
        },{
          min: 80,
          max: 147,
          color: '#47DB9C',
          data: [
            'Столько живет бабочка-махаон',
            'Столько сохнет на холсте <br> масляная краска',
            'Столько длилась самая долгая партия <br> в «Монополию», сыгранная в джакузи'
          ]
        },{
          min: 148,
          max: 200,
          color: '#E3CA4B',
          data: [
            'Столько идет поезд <br> Москва–Владивосток'
          ]
        },{
          min: 201,
          max: 400,
          color: '#53B5F3',
          data: [
            'За это время строилась одна <br> типовая «хрущевка»',
            'За это время стакан воды <br> становится дождем',
            'Столько длится беременность <br> у хомячков'
          ]
        },{
          min: 401,
          max: 450,
          color: '#F9814F',
          data: [
            'Столько длится самая протяжная песня <br> Тома Йорка — Subterranea'
          ]
        },{
          min: 451,
          max: 10000,
          color: '#F3614C',
          data: [
            'Столько идет посылка с московскими <br> плюшками до маяка Канин нос',
            'За это время жуки-типографы <br> уничтожили сосновую рощу'
          ]
        }
      ];

      var dataEn = [
        {
          min: 0,
          max: 0,
          color: '#4FB5F0',
          data: [
            'The number of daylight hours Svalbard <br> gets during winter',
            'The number of hours David Bowie spent <br> on stage during his only USSR concert',
            'The average length of time a bald man <br> spends styling his hair',
            'Time taken to eat an entire <br> square of chocolate'
          ]
        },{
          min: 1,
          max: 2,
          color: '#E3CA4B',
          data: [
            'How long it takes to get to the bottom <br> of your Facebook feed',
            'The amount of time needed <br> to digitize a book',
            'The amount of time it takes <br> to 3D print a human ear',
            'The maximum length of time a sperm <br> whale can stay underwater for',
            'The amount of time given to eat the <br> world’s biggest steak (and get it free)'
          ]
        },{
          min: 3,
          max: 3,
          color: '#FC8053',
          data: [
            'How long the euphoria from booze lasts',
            'The amount of time needed to set up <br> the sails on a three-mast bark'
          ]
        },{
          min: 4,
          max: 5,
          color: '#36CF6E',
          data: [
            'The longest ever speech given to the UN <br> General Assembly (by Fidel Castro in 1960)'
          ]
        },{
          min: 6,
          max: 8,
          color: '#36CF6E',
          data: [
            'The time taken to reach the world’s most remote <br> school — in Gulu, China — via a narrow mountain path'
          ]
        },{
          min: 9,
          max: 14,
          color: '#E3CA4B',
          data: [
            'The time it takes to watch <br> The Lord of The Rings trilogy in one sitting'
          ]
        },{
          min: 15,
          max: 17,
          color: '#36CF6E',
          data: [
            'The duration of all four acts of Wagner’s Der Ring <br> des Nibelungen (intermissions excluded)'
          ]
        },{
          min: 18,
          max: 29,
          color: '#4F95F0',
          data: [
            'How long a flu virus can live outside <br> the body',
            'How long it takes a radio signal to reach <br> Voyager 1 at the edge of our solar system',
            'How long it takes a cat to completely <br> forget what happened to it yesterday',
            'A smart watch’s battery life'
          ]
        },{
          min: 30,
          max: 45,
          color: '#FC8053',
          data: [
            'The duration of an ultramarathon <br> in Death Valley, California',
            'The amount of time it takes <br> for dry ice to melt',
            'How long it takes to cook Peking Duck <br> or Beef Bourguignon to perfection',
            'The average amount of time Cambridge University <br> students actually spend studying each week'
          ]
        },{
          min: 46,
          max: 79,
          color: '#4FB5F0',
          data: [
            'How long geese take to fly from Sweden <br> to Catalonia for the winter',
            'The amount of time it takes <br> a beaver fell a single tree'
          ]
        },{
          min: 80,
          max: 147,
          color: '#47DB9C',
          data: [
            'The lifespan of a swallowtail butterfly',
            'How long oil paint takes to dry <br> on canvas completely',
            'The duration of the longest ever game <br> of Monopoly played in a bathtub'
          ]
        },{
          min: 148,
          max: 200,
          color: '#E3CA4B',
          data: [
            'The time it takes to travel from Moscow <br> to Vladivostok by train',
            'The duration of the longest continuous <br> cricket match'
          ]
        },{
          min: 201,
          max: 250,
          color: '#53B5F3',
          data: [
            'How long it takes a glass of water to turn <br> into rain.',
            'The average length time it takes for THC to pass <br> through your body after “recreational consumption”'
          ]
        },{
          min: 251,
          max: 300,
          color: '#F3614C',
          data: [
            'The amount of study time needed for each Chartered <br> Financial Analyst exam (there are three in total)'
          ]
        },{
          min: 301,
          max: 400,
          color: '#53B5F3',
          data: [
            'A hamster’s gestation period'
          ]
        },{
          min: 401,
          max: 450,
          color: '#F9814F',
          data: [
            'The duration of the longest song ever <br> recorded (Subterranea by Thom Yorke)'
          ]
        },{
          min: 451,
          max: 10000,
          color: '#F3614C',
          data: [
            'The amount of time it takes for spruce <br> bark beetles to destroy a pine grove',
            'How long a day lasts on the Moon',
            'How long Japanese kids spend learning <br> in school each year'
          ]
        }
      ];

      function declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
      }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      var $viewport = $('.stats-2015__personal .viewport');
      var locale = BM.config.mainConfig.locale;
      var dataByLocale = {
        ru: dataRu,
        en: dataEn
      };

      if (!dataByLocale[locale]) {
        dataByLocale[locale] = dataEn;
      }

      var renderItem = function(count){
        dataByLocale[locale].forEach(function(item, dataIndex){

          if (count <= item.max && count >= item.min) {
            var randomInt = getRandomInt(0, item.data.length);
            $('.text-custom').html(item.data[randomInt]);
            $('.emoji-img').css({
              "background-image": 'url(/personal-stats-2015-img-generator/emoji_'+locale+'/'+dataIndex+'_'+randomInt+'.png)'
            });
            $('.viewport').css({
              'background-color': item.color
            });
            $('.hours').toggleClass('dense', count < 10);

            if (locale === 'en') {
              $('.count .text').text(count === 1 ? 'hour' : 'hours');
            }
            if (locale === 'ru') {
              $('.count .text').text(declOfNum(count, ['час', 'часа', 'часов']));
            }

            $('.count .number').text(count);
          }

        });
      };

      if (gon.readHours && (locale == 'ru' || locale == 'en')) {
        $('.stats-2015__section--personal').removeClass('hidden');
        renderItem(gon.readHours);
      }
    }

    function startOurChoiceAnimation() {
      var $ourChoiceBlock = $('.stats-2015__section--our-choice');
      var $ourChoiceSvg = $ourChoiceBlock.find('.stats-2015__header__curl');

      $ourChoiceSvg.addClass('hidden');
      $ourChoiceSvg.removeClass('animated');
      var timer = setInterval(function() {
        if ($(document).scrollTop() > $ourChoiceBlock.offset().top - 500) {
          $ourChoiceSvg.removeClass('hidden');
          $ourChoiceSvg.addClass('animated');
          clearInterval(timer);
        }
      }, 250);
    }

    function cleanUrl() {
      if (!window.history) {
        return;
      }

      window.history.pushState("", document.title, window.location.pathname);
    }

    function vkSharingFix() {
      setTimeout(function() {
        var $itemVk = $('.item-vk');
        var $itemCounter = $('.item-counter');
        var vkCount = $itemVk.last().find($itemCounter).text();

        $itemVk.first().find($itemCounter).text(vkCount);
      }, 4000);
    }

    function personalShare() {
      var $personalShare = $('.bm-personal-social');
      var $buttonShare = $personalShare.find('@bm-button-social-share');

      var _buttonShare = new ButtonSocialShare({
        element: $buttonShare
      });

      $personalShare.append(_buttonShare.getElement());

      var hours = $('.stats-2015__section--personal').find('.number').text();
      var locale = BM.config.mainConfig.locale;
      var url = "https://bookmate.com/library/2015?hr=" + hours + "&lang=" + locale;
      var image = "https://assets.bookmate.com/assets/read_hours_2015/" + locale + "/" + hours + ".png";
      var description;
      var title;

      if ($('html').attr('lang') == 'ru') {
        $personalShare.find('.bm-button-social-share').append('Поделиться');
        title = "Итоги года на Букмейте";
        description = "Что, где и как читали в 2015 году"
      } else {
        $personalShare.find('.bm-button-social-share').append('Share');
        title = "Bookmate’s Yearbook";
        description = "What, where, and how people read in 2015"
      }

      _buttonShare.setConfig({
        dropdown: true,
        title: title,
        description: description,
        url: url,
        twitter: {
          title: title,
          description: description,
          url: url,
          image: image
        },
        vkontakte: {
          title: title,
          description: description,
          url: url,
          image: image
        }
      });
    }

    $(document).ready(function() {
      cleanUrl();
      initMap();
      insertLikesForQuotes();
      sliceBookTitleHandler();
      renderImpressed();
      startOurChoiceAnimation();
      initPersonalStats();
      personalShare();
      vkSharingFix();
      _bindEvents($('.bookcard-content').add('.bookcard-bottom-credits'));
    });

    provide();
  };

  modules.define(
    'stats2015Init',
    ['moduleBookCard', 'moduleReviewSlider', 'ButtonSocialShare', 'RouterWeb', 'BM'],
    stats2015Init
  );

}(this.modules, this.jQuery, this.DIMixpanel, this.docCookies));
