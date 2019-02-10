//load module
$(document).ready(function() {
    //Checks for custom cookie, if does not exist, create and run password check
    if (document.cookie.indexOf('mycookie') === -1) {
        document.cookie = 'mycookie=1';
        $('#login-modal').modal('show');
    }

});


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
        url: 'https://api.binance.com/api/v1/ticker/24hr?symbol=' + currentPair,
        type: 'GET',
        dataType: 'json',
    })
        .done(function(response) {
            const price = response.askPrice;
            const symbol = response.symbol;
            const volume = response.volume;
            const change = response.priceChangePercent;


            $('#pair').html(symbol.replace("BTC", ""));
            $('#price').html("Current Price: " + (parseFloat(price * 3630.5).toFixed(2)));
            $('#volume').html("24 Hour Volume: " + volume + "BTC");
            $('#24h').html("24 Hour change: " + (parseFloat(change).toFixed(2)) + "%");
            $('#buttons').html(
                '<form action="/buy/' + symbol + '" method="post">' +
                '<button class="btn btn-success mb-2"><input type="submit" class="d-none" value="'+ symbol + '" />Buy</button>' +
                '</form>' +
                '<form action="/sell/' + symbol + '" method="post">' +
                '<button id="sell" class="btn btn-danger">Sell</button>' +
                '</form>'
            );

        });
});




