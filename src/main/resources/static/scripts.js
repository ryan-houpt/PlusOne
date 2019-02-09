//Variables



//Login Modal Functions


//load modal on open
$(document).ready(function() {
    $('#login-modal').modal('show');
});


//submit click
$('#login').click(function() {

    //get user/pass inputs

    var username = $('#username').val();
    var password = $('#password').val();

    // correct input
    if (username === "Shaun" && password === "PlusOne") {

        $('#login-modal').modal('hide');

    }

    // incorrect user/pass
    else if ( username !== "Shaun" && password !== "PlusOne") {

        $('#username-wrong').text("Incorrect Username");
        $('#password-wrong').text("Incorrect Password");

        $('#username').text("");
        $('#password').text("");

    }

    // incorrect pass
    else if ( password !== "PlusOne" ) {

        $('#password-wrong').text("Incorrect Password");

        $('#username').text("");
        $('#password').text("");
    }

    //incorrect user
    else if ( username !== "Shaun" ) {

        $('#username-wrong').text("Incorrect Username");

        $('#username').text("");
        $('#password').text("");

    }
});
