/**
 * @author Jose Cortes <josecortesjaramillo@gmail.com>
 *
 * Employee register
 */



var RegisterEmployee = (function () {

    var getEmployeeData = function () {
        var name = $('#nameEmp').val()
        var lastName = $('#lastEmp').val()
        var idNumber = $('#idNumber').val()
        var mail = $('#mail').val()
        var pass = $('#pass').val()
        var passConfirm = $('#passConfirm').val()
        if (pass === passConfirm) {
            validateInfo(mail);
        } else {
            console.log('Las contaseñas no coinciden')
        }

    }

    var validateInfo = function (mail) {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (testEmail.test(mail)) {
            checkPwd();
        } else {
            console.log('correo no valido!');
        }
    };

    var checkPwd = function () {
        var passStrong = true;
        var str = $('#pass').val();
        if (str.length < 8) {
            passStrong = false;
            console.log("la contraseña debe contenert almenos 8 caracteres");
        } else if (str.length > 20) {
            passStrong = false;
            console.log("la contraseña debe contenert maximo 20 caracteres");
        } else if (str.search(/[a-zA-Z]/) === -1) {
            passStrong = false;
            console.log("La contraseña debe contener almenos una mayuscula");
        } else if (str.search(/[`!%$&^*()]+/) === -1) {
            passStrong = false;
            console.log("La contraseña debe contener almenos un caracter especial");
        } else if (str.match(/\d+/g)[0].length < 2) {
            passStrong = false;
            console.log('La contraseña debe contener almenos dos numeros');
        } else if (passStrong = true) {
            console.log('registro existoso');
        }
    }

    /*   var jsonOut = JSON.stringify({
           "name": name,
           "lastName": lastName,
           "idNumber": idNumber,
           "userName": userName
       })*/


    var initButton = function () {
        $('#submitRegister').click(function () {
            getEmployeeData();
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