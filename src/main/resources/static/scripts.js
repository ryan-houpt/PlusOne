//Variables



//Login Modal Functions


// //load modal on open
// $(document).ready(function() {
//     $('#login-modal').modal('show');
// });


//submit click
$('#login').click(function() {

    //get user/pass inputs

    var username = $('#username').val();
    var password = $('#password').val();

    // correct input
    if (username === "Shaun" && password === "PlusOne") {

        $('#login-modal').modal('hide');
        console.log(requestProducts().then((data => data)).then(data => data));

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

//Get pair info and display options
$('#symbols li').click(function(e) {
    const currentPair = $(e.target).text();

    $.ajax({
        url: 'https://api.binance.com/api/v3/ticker/price?symbol=' + currentPair,
        type: 'GET',
        dataType: 'json',
    })
        .done(function(response) {
            const price = response.price;
            const symbol = response.symbol;
            $('#price').html(price);
            $('#buttons').html(
                '<form action="/buy/' + symbol + '" method="post">' +
                '<button class="btn btn-primary mb-5"><input type="submit" class="d-none" value="'+ symbol + '" />Buy 1</button>' +
                '</form>' +
                '<form action="/sell/' + symbol + '" method="post">' +
                '<button id="sell" class="btn btn-danger">Sell</button>' +
                '</form>'
            );

        });
});




