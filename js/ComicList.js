var ComicList = (function () {

  var _requestComics = function () {
    // private
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
      }
    );
    promise.fail(
      function (error) {
        console.log(error);
      }
    )

  };

  var getComics = function (data) {
    var comicList = data.comicList;
    for (var index = 0; index < comicList.length; index++) {
      showComic(comicList[index])
    }
  };
  var init = function(){
    _requestComics()
  }

  var showComic = function (comic) {
    var title = '<button>' + comic.title + '</button>';
    $('.panel-list').append(title);
    //var description = comic.description;

    // public
  };

  //register
  return {
    init: init
    //getComics: getComics
  };

})();

