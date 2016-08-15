/**
 * @author Jose Cortes <josecortesjaramillo@gmail.com>
 *
 * Funciones que permiten el registro de un nuevo empleado
 */



var RegisterEmployee = (function () {
    //Capturar la informacion del nuevo empleado
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

    //validar el correo ingresado
    var validateInfo = function (mail) {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (testEmail.test(mail)) {
            checkPwd();
        } else {
            console.log('correo no valido!');
        }
    };

    //Validar el nivel de seguridad de la contraseña ingresada
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



    //inicializar el boton del registro del empleado
    var initButton = function () {
        $('#submitRegister').click(function () {
            getEmployeeData();
        })
    }

    //verificar que el usuario este registrado en el sistema
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