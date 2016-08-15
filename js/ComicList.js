var ComicList = (function () {
  var comicArray = [];
  var comicListGlobal;


  // funcion que inicia la peticion
  var init = function () {
    _requestComics()
  };

  var searchBar = function () {
    var comic = $('#buscador').val().toUpperCase();
    if (comic.length > 3) {
      for (var index = 0; index < comicArray.length; index++) {
        var comicExpression = new RegExp(comicArray[index])
        var result = comic.match(comicExpression);
        if (result != undefined) {
          var title = '<button class="comicButton" id=' + result[0].toLowerCase() + '>' + result[0].substr(0, 1).toUpperCase() + result[0].substr(1).toLowerCase() + '</button>';
          $('.panel-list').html(title);
          showDetails(result[0].toLowerCase(), comicListGlobal);
        }
      }
    } else {
      init();
    }
  }

  // realiza la peticion get al backend que espera reicibir un objeto json con la lista de comics
  var _requestComics = function () {
    var promise = $.ajax({
      url: '/tests/comicList.json',
      type: 'GET',
      contentType: false,
      processData: false,
      cache: false
    });
    promise.done(
      function (response) {
        getComics(response);
      });
    promise.fail(
      function (error) {
        console.log(error);
      });
  };


  //Obtiene la lista de comics que le peticion _requestComics realizo
  var getComics = function (data) {
    $('.panel-list').html("");
    //var comicList = data.comicList;
    comicListGlobal = data.comicList;
    for (var index = 0; index < 9; index++) {
      showComicList(comicListGlobal[index], comicListGlobal);
      comicArray.push(comicListGlobal[index].title.toUpperCase());
    }
    if (comicListGlobal.length > 9) {
      $('#verMas').html('<button id="viewMore">Ver mas..</button>');
      ComicList.viewMore()

    }
  };

  var viewMore = function () {
    var sextas = 1;
    var lastPosition = 9;
    $('#viewMore').click(function () {
      for (var index = lastPosition; index < lastPosition + 6; index++) {
        showComicList(comicListGlobal[index], comicListGlobal);
        comicArray.push(comicListGlobal[index].title.toUpperCase());
        if (comicListGlobal.length <= lastPosition + 6) {
          $('#viewMore').hide()
        }
      }
      lastPosition = lastPosition + 6;
    });

  }


  var showComicList = function (comic, comicList) {
    var title = '<button class="comicButton" id=' + comic.title.toLowerCase() + '>' + comic.title + '</button>';
    $('.panel-list').append(title);
    showDetails(comic.title.toLowerCase(), comicList);
  };

  var showDetails = function (idButton, comicList) {
    var button = document.getElementById(idButton)
    $(button).click(function () {
      $('#editView').hide();
      $('#commentsComic').html("");
      for (var index = 0; index < comicList.length; index++) {
        if (idButton === comicList[index].title.toLowerCase()) {
          $('#titleComic').html(comicList[index].title)
          $('#descriptionComic').html(comicList[index].description)
          $('#titleEdit').val(comicList[index].title);
          $('#descriptionEdit').val(comicList[index].description);
          $('#editComic').click(function () {
            $('#detailComic').hide();
            $('#editView').show(1500);
          })
          for (var i = 0; i < comicList[index].comments.length; i++) {
            $('#commentsComic').append('<p>' + comicList[index].comments[i] + '</p>')
          }

        }
      }
      $('#detailComic').show(1500);



    });
  }

  var editComic = function () {
    $('#editComic').click(function () {
      $('#descriptionComic').replaceWith()
    })

  }



  var verifyUser = function () {
    if (localStorage.getItem('userNameStorage') === 'admin' && localStorage.getItem('passStorage') === 'admin') {
      init();
    } else {
      window.open('index.html', '_self');
    }
  }
  //register
  return {
    viewMore: viewMore,
    verifyUser: verifyUser,
    init: init,
    searchBar: searchBar,
    showDetails: showDetails
  };

})();

