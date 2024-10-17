$(document).ready(function () {
    var modal = document.getElementById("nameModal");
    var form = document.getElementById("nameForm");
    var catNameInput = document.getElementById("catName");
    var errorMessage = document.getElementById("errorMessage");
    var duplicateMessage = document.getElementById("duplicateMessage");
    var pontuacao = 0;

    var backgroundMusic = document.getElementById("backgroundMusic");
    var pausarMusicaBtn = document.getElementById("pausarMusica");
    var tocarMusicaBtn = document.getElementById("tocarMusica");

    backgroundMusic.pause();

    pausarMusicaBtn.addEventListener("click", function () {
        backgroundMusic.pause();
        pausarMusicaBtn.style.display = "none";
        tocarMusicaBtn.style.display = "block";
    });

    tocarMusicaBtn.addEventListener("click", function () {
        backgroundMusic.play();
        tocarMusicaBtn.style.display = "none";
        pausarMusicaBtn.style.display = "block";
    });

    form.onsubmit = function (e) {
        e.preventDefault();

        var catName = catNameInput.value.trim();

        errorMessage.style.display = "none";
        duplicateMessage.style.display = "none";

        if (catName.length >= 2) {
            let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
            let nameExists = ranking.some(function (player) {
                return player.name === catName;
            });

            if (nameExists) {
                duplicateMessage.style.display = "block";
            } else {
                localStorage.setItem("catName", catName);
                modal.style.display = "none";
                iniciarJogo();
            }
        } else {
            errorMessage.style.display = "block";
        }
    };

    function iniciarJogo() {
        backgroundMusic.play();

        function animateCity() {
            $('.city-container').animate({
                left: '-100%'
            }, 5000, 'linear', function () {
                $('.city-container').css('left', '0');
                animateCity();
            });
        }

        // Função para o gato pular
        function pularGato() {
            if (!$('.cat').hasClass('jump')) {
                $('.cat').addClass('jump');
                $('.cat').attr('src', 'img/pulo3.gif');

                setTimeout(function () {
                    $('.cat').removeClass('jump');
                    $('.cat').attr('src', 'img/cat.gif');
                }, 1000);
            }
        }

        // Evento de clique/touch no mobile
        $(document).on('touchstart', function () {
            pularGato();
        });

        // Evento de espaço no teclado para desktop
        $(document).on('keydown', function (e) {
            if (e.key === " ") {
                pularGato();
            }
        });

        function moverCaixas() {
            $('.obstacle').animate({
                left: '-150px'
            }, 2000, 'linear', function () {
                $(this).css('left', '100%');
                moverCaixas();
            });

            var colisaoDetectada = setInterval(function () {
                var catBottom = parseInt($('.cat').css('bottom'));
                var obstacleLeft = parseInt($('.obstacle').css('left'));

                if (obstacleLeft > 50 && obstacleLeft < 150 && catBottom <= 100) {
                    gameOver();
                    clearInterval(colisaoDetectada);
                }
            }, 10);
        }

        function moverMoedas() {
            const coinSound = document.getElementById("coinSound"); // Referência ao áudio
        
            $('.moeda').animate({
                left: '-150px'
            }, 3000, 'linear', function () {
                $(this).css('left', '100%');
                moverMoedas();
            });
        
            var coletaDetectada = setInterval(function () {
                var catBottom = parseInt($('.cat').css('bottom'));
                var moedaLeft = parseInt($('.moeda').css('left'));
        
                if (moedaLeft > 50 && moedaLeft < 150 && catBottom >= 100) {
                    pontuacao += 10;
                    $('#pontuacao').text('Pontuação: ' + pontuacao);
                    $('.moeda').hide();
                    
                    // Toca o som da moeda
                    coinSound.currentTime = 0; // Reinicia o áudio
                    coinSound.play();
        
                    setTimeout(function () {
                        $('.moeda').css('left', '100%').show();
                    }, 3000);
                }
            }, 10);
        }
        

        function gameOver() {
            $('#overlay').css('visibility', 'visible');
            $('.game-over').css('visibility', 'visible');
            $('.city-container').stop();
            $('.obstacle').stop();
            $('.moeda').stop();
            $('#pontuacaoFinal').text('Sua pontuação final: ' + pontuacao);
        
            // Tocar o som de Game Over
            var gameOverSound = document.getElementById("gameOverSound");
            gameOverSound.currentTime = 0;
            gameOverSound.play();
        
            let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
            let catName = localStorage.getItem('catName');
        
            let nameExists = ranking.some(function (player) {
                return player.name === catName;
            });
        
            if (!nameExists) {
                let playerData = {
                    name: catName,
                    score: pontuacao
                };
                ranking.push(playerData);
                localStorage.setItem('ranking', JSON.stringify(ranking));
            }
        }
        

        animateCity();
        moverCaixas();
        moverMoedas();
    }

    $('.restart-image').click(function () {
        location.reload();
    });

    $('.home-image, .home-button').click(function () {
        window.location.href = 'index.html';
    });

    $('.ranking-button').click(function () {
        window.location.href = 'ranking.html';
    });
});
