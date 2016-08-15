/**
 * @author Jose Cortes <josecortesjaramillo@gmail.com>
 *
 * Employee register
 */



var RegisterComic = (function () {

    // capturar los datos del comic 
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

        console.log('Json enviado al back: ' + jsonOut);
        return jsonOut;
    }


    //metodo post que envia el comic registrado al back
    var sendData = function () {
        $.ajax({
            url: '0.0.0.0',
            type: "POST",
            data: getComicData,
            contentType: 'application/json',
            success: function (response) {

                alert('Comic Ingresado');
            }
        });
    }





    //inicializar el boton de envio
    var initButton = function () {
        $('#submitComic').click(function () {
            sendData();
        })
    }

    //Verificar que el usuario este registrado
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