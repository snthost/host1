var end = new Date('09/27/2018 06:58 PM');
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var timer;
    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = ':( finalizado!!';
         /*alert(":( la promocion ha finalizado!!!");*/
            return;
        }
        var day = Math.floor(distance / days);
        var hour = Math.floor((distance % days) / hours);
        var minute = Math.floor((distance % hours) / minutes);
        var second = Math.floor((distance % minutes) / seconds);
        document.getElementById('countdown').innerHTML = day + ' dias, ';
        document.getElementById('countdown').innerHTML += hour + ' horas, ';
        document.getElementById('countdown').innerHTML += minute + ' minutos y ';
        document.getElementById('countdown').innerHTML += second + ' segundos';
    }
    timer = setInterval(showRemaining, 1000);
