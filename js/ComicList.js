/**
 * @author Jose Cortes <josecortesjaramillo@gmail.com>
 *
 * funciones vista de comics 
 */

var ComicList = (function () {
  var comicArray = [];
  var comicListGlobal;


  // funcion que inicia la peticion al back para solicitar la informacion
  var init = function () {
    _requestComics()
  };


  //funcion de busqueda de comics
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
        getComics(JSON.parse(response));
      });
    promise.fail(
      function (error) {
        console.log(error);
      });
  };


  //Obtiene la lista de comics y ejecuta las funciones necesarias
  var getComics = function (data) {
    $('.panel-list').html("");
    //var comicList = data.comicList;
    comicListGlobal = data.comicList;
    for (var index = 0; index < 9; index++) {
      showComicList(comicListGlobal[index], comicListGlobal);
      comicArray.push(comicListGlobal[index].title.toUpperCase());
    }
    if (comicListGlobal.length > 9) {
      $('#verMas').html('<button class="comicButton"  style="font-size: 2em;" id="viewMore">Ver mas..</button>');
      ComicList.viewMore();
    }
  };


  //funcion que permite mostrar 9 comics y añadir el boton "Ver mas..."
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

  //Agregar la lista de comics al DOM
  var showComicList = function (comic, comicList) {
    var title = '<button class="comicButton" id=' + comic.title.toLowerCase() + '>' + comic.title + '</button>';
    $('.panel-list').append(title);
    showDetails(comic.title.toLowerCase(), comicList);
  };

  //funcion que permite mostrar los detalles del comic luego de hacer click
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
      sendEdit();
    });
  }


  // funcion que verifica que el usuario este registrado en el sistema
  var verifyUser = function () {
    if (localStorage.getItem('userNameStorage') === 'admin' && localStorage.getItem('passStorage') === 'admin') {
      init();
    } else {
      window.open('index.html', '_self');
    }
  }

  //funcion que envia al back el comic editado
  var sendEdit = function () {
    $('#sendComic').click(function () {
      $.ajax({
        url: '0.0.0.0',
        type: "POST",
        data: $('#descriptionEdit').val() + $('#titleEdit').val(),
        contentType: 'application/json',
        success: function (response) {

          alert('Comic Ingresado');
        }
      });
    })


  }

  return {
    viewMore: viewMore,
    verifyUser: verifyUser,
    init: init,
    searchBar: searchBar,
    showDetails: showDetails
  };

})();

