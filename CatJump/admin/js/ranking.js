document.addEventListener("DOMContentLoaded", function() {
    const rankingTable = document.getElementById('rankingTable').getElementsByTagName('tbody')[0];

    function loadRanking() {
        rankingTable.innerHTML = ''; 

        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

        ranking.sort(function(a, b) {
            return b.score - a.score; 
        });

        let top5 = ranking.slice(0, 5);

        top5.forEach(function(player, index) {
            let row = rankingTable.insertRow();

            let nameCell = row.insertCell(0);
            let scoreCell = row.insertCell(1);
            let actionCell = row.insertCell(2);

            nameCell.innerText = player.name;
            scoreCell.innerText = player.score;

            let deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = function() {
                deletePlayer(index);
            };
            actionCell.appendChild(deleteButton);
        });
    }

    function deletePlayer(index) {
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

        ranking.sort(function(a, b) {
            return b.score - a.score;
        });

        ranking.splice(index, 1);

        localStorage.setItem('ranking', JSON.stringify(ranking));

        loadRanking();
    }

    function animateCity() {
        $('.city-container').animate({
            left: '-100%'
        }, 30000, 'linear', function() {
            $('.city-container').css('left', '0'); 
            animateCity(); 
        });
    }

    loadRanking();
    animateCity(); 
});
