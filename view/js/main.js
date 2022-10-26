var lastLog = null;
(function ($) {
    "use strict";

    $("#btnLogin").click(function (e) {
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: window.location.origin + "/api/login",
            data: JSON.stringify({
                username: $("#userInput").val(),
                password: $("#passInput").val()
            }),
            // data:"{\"teste\":\"tste\"}",
            success: function (data) {
                window.location.href = "logado.html?user=" + data.username
            }
        })
    });

    $("#btnRegistrar").click(function (e) {
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: window.location.origin + "/api/cadastrar",
            data: JSON.stringify({
                username: $("#userInput").val(),
                password: $("#passInput").val(),
                email: $("#emailInput").val(),
                cargo: $("#cargoInput").val()
            }),
            // data:"{\"teste\":\"tste\"}",
            success: function (data) {
                window.location.href = "logado.html?user=" + data.username
            }
        })
    });

    $("#btnAbrePortaPrincipal").click(function (e) {
        $( "#btnAbrePortaPrincipal" ).animate({  borderSpacing: -360 }, {
            step: function(now,fx) {
              $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'fast'
        },'linear');
        var urlParams = new URLSearchParams(window.location.search);
        var user = urlParams.get('user');
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: window.location.origin + "/api/notification/send",
            data:JSON.stringify({
                title: "ArcanaBell",
                message:"Algum visitante se encontra na entrada principal"
            }),
            success: function (data) {
                console.log("Notificado")
            },
            error: function (a, b, c) {
                console.log(a, b, c)
                //alert("Ocorreu um erro ao notificar");
            }
        })
    });

    $("#btnAbrePortaFundos").click(function (e) {
        $( "#btnAbrePortaFundos" ).animate({  borderSpacing: -360 }, {
            step: function(now,fx) {
              $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'fast'
        },'linear');
        var urlParams = new URLSearchParams(window.location.search);
        var user = urlParams.get('user');
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: window.location.origin + "/api/notification/send",
            data:JSON.stringify({
                title: "ArcanaBell",
                message:"Algum visitante se encontra na porta dos fundos"
            }),
            success: function (data) {
                console.log("Notificado")
            },
            error: function (a, b, c) {
                console.log(a, b, c)
                //alert("Ocorreu um erro ao notificar");
            }
        })
    });

    $("#btnAbrePortaEscritorio").click(function (e) {
        $( "#btnAbrePortaEscritorio" ).animate({  borderSpacing: -360 }, {
            step: function(now,fx) {
              $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'fast'
        },'linear');
        var urlParams = new URLSearchParams(window.location.search);
        var user = urlParams.get('user');
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: window.location.origin + "/api/notification/send",
            data:JSON.stringify({
                title: "ArcanaBell",
                message:"Algum visitante se encontra na entrada do escritório"
            }),
            success: function (data) {
                console.log("Notificado")
            },
            error: function (a, b, c) {
                console.log(a, b, c)
                //alert("Ocorreu um erro ao notificar");
            }
        })
    });

    //refreshLog()

    /*==================================================================
    [ Focus input ]*/

    function validar() {
        var senha = limiter.pass.value;
        var rep_senha = limiter.rep_pass.value;

        if (senha != rep_senha) {
            limiter.rep_pass.value = '';
        }
    }

    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'user' || $(input).attr('type') == 'role' || $(input).attr('type') == 'email') {
            if ($(input).val().trim() == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        } else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);

function refreshLog() {
    setTimeout(() => {
        $.ajax({
            type: "GET",
            contentType: 'application/json',
            url: window.location.origin + "/api/log",
            success: function (data) {
                //data = data.reverse();

                if(lastLog!=data){
                    $("#tabelaLog").html("")
                    data.forEach(function (e) {
                        $("#tabelaLog").append($("<tr><td>" + moment(e.dataCriacao).format('DD/MM/YYYY HH:mm:ss') + "</td><td>" + e.ds_descricao + "</td></tr>"))
                    })
                }
                
                lastLog = data;
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
        refreshLog()
    }, 1000);
}