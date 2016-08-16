/**
 * @author Jose Cortes <josecortesjaramillo@gmail.com>
 *
 * Log In 
 */


var LogIn = (function () {

    //capturar la informacion  del usuario
    var getUserInfo = function () {
        var userName = $('#userName').val();
        var pass = $('#pass').val();
        localStorage.setItem('userNameStorage', userName);
        localStorage.setItem('passStorage', pass);
          var jsonOut = JSON.stringify({
            "userName": userName,
            "pass": pass,
        });
        sendData(jsonOut);
        if (localStorage.getItem('userNameStorage') != 'admin' && localStorage.getItem('passStorage') != 'admin') {
            alert('El nombre y contraseña no coinciden con ningun usuario. Intenta nuevamente');
        } else {
            var myWindow = window.open("listaComics.html", "_self");
            //var url = window.open('listaComics.html', '_self');
        }
    }

    //metodo post que envia el usuario y contraseña para validarlos
    var sendData = function (jsonData) {
        $.ajax({
            url: '0.0.0.0',
            type: "POST",
            data: jsonData,
            contentType: 'application/json',
            success: function (response) {
                //respuesta back
            }
        });
    }

    //inicializar el boton de inicio
    var initButton = function () {
        $('#submitLog').click(function () {
            getUserInfo();
        })
    }

    //register
    return {
        initButton: initButton
    };
})();


