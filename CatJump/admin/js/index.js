$(document).ready(function() {
    function animateCity() {
        $('.city-container').animate({
            left: '-100%'
        }, 30000, 'linear', function() {
            $('.city-container').css('left', '0'); 
            animateCity(); 
        });
    }

    animateCity();
});

var modal = document.getElementById("rulesModal");
var openBtn = document.getElementById("openRules");
var closeBtn = document.getElementById("closeModal");

openBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('backgroundMusic');
    var tocarButton = document.getElementById('tocarMusica');
    var pausarButton = document.getElementById('pausarMusica');
    var customAlert = document.getElementById('customAlert');
    var closeAlert = document.getElementById('closeAlert');

    customAlert.style.display = 'block';

    closeAlert.addEventListener('click', function() {
        customAlert.style.display = 'none';
    });

    audio.pause();

    tocarButton.addEventListener('click', function() {
        audio.play();
        tocarButton.style.display = 'none'; 
        pausarButton.style.display = 'inline';
    });

    pausarButton.addEventListener('click', function() {
        audio.pause();
        pausarButton.style.display = 'none'; 
        tocarButton.style.display = 'inline'; 
    });
});