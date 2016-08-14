/**
 * @author Jose Cortes <josecortesjaramillo@gmail.com>
 *
 * Log In 
 */


var LogIn = (function () {

    var getUserInfo = function () {
        var userName = $('#userName').val();
        var pass = $('#pass').val();
        localStorage.setItem('userNameStorage', userName);
        localStorage.setItem('passStorage', pass);
        if (localStorage.getItem('userNameStorage') != 'admin' && localStorage.getItem('passStorage') != 'admin') {
            alert('intruso vete de aqui!!');
        } else {
            var myWindow = window.open("listaComics.html", "_self");
            //var url = window.open('listaComics.html', '_self');
        }
    }

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


