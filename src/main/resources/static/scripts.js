var cors = "https://cors-anywhere.herokuapp.com/"


//load module
$(document).ready(function() {
    //Checks for custom cookie, if does not exist, create and run password check
    if (document.cookie.indexOf('mycookie') === -1) {
        document.cookie = 'mycookie=1';
        $('#login-modal').modal('show');
    }




    //Grabs exchange pairs
    $.ajax({
        url: cors + 'https://api.binance.com/api/v1/exchangeInfo',
        type: 'GET',
        dataType: 'json',

    })
        .done(function(response) {
            var symbols = response.symbols;
            var pairs = new Array(300);



            //creates a string of each pair
            for (i = 0; i < symbols.length; i++) {
                if (symbols[i].symbol.toString().endsWith("BTC")) {
                    if (symbols[i].status !== "BREAK") {
                        pairs += symbols[i].symbol;
                        pairs += ",";
                    }
                }
            }
            //splits into an Array list of Strings
            var split_pairs = pairs.split(/[ ,]+/);;

            //Sort string into Alpphabetical Order
            split_pairs.sort();


            //Pop the first two empty strings
            split_pairs.shift();
            split_pairs.shift();


            //Append the list of strings to the list
            for (i = 0; i < split_pairs.length; i++) {
                $('#symbols').append(
                    '<li value=' + split_pairs[i] + ' >' + split_pairs[i] + '</li>'
                )
            }
        });
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
$('#symbols').on('click', 'li', function(e) {
    const currentPair = $(e.target).html();

    $.ajax({
        url: cors + 'https://api.binance.com/api/v1/ticker/24hr?symbol=' + currentPair,
        type: 'GET',
        dataType: 'json',
    })
        .done(function(response) {
            const price = response.askPrice;
            const symbol = response.symbol;
            const volume = response.volume;
            const change = response.priceChangePercent;


            //Create trading platform
            $('#pair').html(symbol.replace("BTC", ""));

            $('#price').html("Current Price: $" + (parseFloat(price * 3630.5).toFixed(3)));

            $('#volume').html("24 Hour Volume: " + parseFloat(volume).toFixed(2) + "BTC");


            if (change.toString().indexOf("-", 0)){
                $('#24h').html("<span style='color: green'>24 Hour change: " + (parseFloat(change).toFixed(2)) + "%</span>");
            } else {
                $('#24h').html("<span style='color: red'>24 Hour change: " + (parseFloat(change).toFixed(2)) + "%</span>");
            }


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




