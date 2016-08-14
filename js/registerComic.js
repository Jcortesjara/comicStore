/**
 * @author Jose Cortes <josecortesjaramillo@gmail.com>
 *
 * Employee register
 */



var RegisterComic = (function () {

    var getComicData = function () {
        var title = $('#title').val()
        var genere = $('#genere').val()
        var author = $('#author').val()
        var description = $('#description').val()

        var jsonOut = JSON.stringify({
            "tittle": tittle,
            "genere": genere,
            "author": author,
            "description": description
        });

        console.log(jsonOut);
        return jsonOut;
    }



    var sendData = function () {
        $.ajax({
            url: '0.0.0.0',
            type: "POST",
            data: getComicData,
            contentType: 'application/json',
            success: function (response) {
                //mostrar resultado
                alert('Comic Ingresado');
            }
        });
    }






    var initButton = function () {
        $('#submitComic').click(function () {
            sendData();
        })
    }

    var verifyUser = function () {
        if (localStorage.getItem('userNameStorage') === 'admin' && localStorage.getItem('passStorage') === 'admin') {
            initButton();
        } else {
            window.open('index.html', '_self');
        }
    }


    return {
        verifyUser: verifyUser
    };

})();