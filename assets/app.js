// uses https://www.apixu.com/ and https://ipinfo.io

jQuery(document).ready(function($) {
    var getUserLocation = function(unit) {
        $.get(
            'https://ipinfo.io',
            function(location) {
                var loc = location.ip;
                getWeather(unit, loc);

                $('.location').html(location.city);
            },
            'jsonp'
        );
    };
    getUserLocation('metric');

    var getWeather = function(unit, loc) {
        var whatsTheWeather =
            'https://api.apixu.com/v1/current.json?key=' +
            'Add Your API Key Here' +
            '&q=' +
            loc;

        $.getJSON(whatsTheWeather, function(weather) {
            var unitTemp = '', tempUnit = '';

            if (unit !== 'metric') {
                unitTemp = 'F';
                tempUnit = weather.current.feelslike_f;
            } else {
                unitTemp = '°C';
                tempUnit = weather.current.feelslike_c;
            }

            $('.temperature').html(tempUnit + ' ' + unitTemp);
            $('.weather').attr('src', weather.current.condition.icon);
            $('.description').html(weather.current.condition.text);
        });
    };

    // Change unit system metric/imperial
    $('.change-unit').click(function() {
        $('.change-unit').removeClass('active');
        $(this).addClass('active');

        var unit = $('.active').data('unit');

        if (unit !== 'metric') {
            $('#unit').html(' imperial system (in Fahrenheit)');
            $('#opposite').html('metric system (Celsius)');
            $('#symbol').html('°C');
        } else {
            $('#unit').html('metric system (in Celsius)');
            $('#opposite').html('imperial system (Fahrenheit)');
            $('#symbol').html('°F');
        }

        getUserLocation(unit);
    });
});
