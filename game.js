const treasureMap = document.getElementById('treasureMap');
const elementInfo = document.getElementById('elementInfo');
const distanceElement = document.getElementById('distance');
const backgroundMusic = document.getElementById('backgroundMusic');
const playMusicButton = document.getElementById('playMusic');

let targetX, targetY;
let playerX = 250, playerY = 250; // Starting position of the player
let isMusicPlaying = false; // Track music state

// Load player data from local storage
const playerData = JSON.parse(localStorage.getItem('playerData')) || { playerID: Date.now(), nickname: 'Adventurer', gameHistory: [] };

// Restore game history
if (playerData.gameHistory.length > 0) {
    const lastGame = playerData.gameHistory[playerData.gameHistory.length - 1];
    playerX = lastGame.playerX;
    playerY = lastGame.playerY;
}

// Set target position randomlyL
targetX = getRandomInt(0, 499);
targetY = getRandomInt(0, 499);

// Music control
function toggleMusic() {
    if (!isMusicPlaying) {
        backgroundMusic.play();
        playMusicButton.textContent = 'Pause Music';
        isMusicPlaying = true;
    } else {
        backgroundMusic.pause();
        playMusicButton.textContent = 'Play Music';
        isMusicPlaying = false;
    }
}

playMusicButton.addEventListener('click', toggleMusic);
function getDistanceHint(distance) {
    if(distance < 8) return alert("恭喜找到宝藏" + clicks);
    if(distance < 10) return"还差一点";
    else if(distance < 20) return"很近";
    else if(distance < 40) return"近";
    else  if(distance < 80) return"远";
    else if(distance < 160) return"很远";
    else if(distance < 320) return"非常远";
    else return"差的十万八千里";
}
treasureMap.addEventListener('click', () => {
    const dx = playerX - targetX;
    const dy = playerY - targetY;
    const distance = getDistance(0, 0, dx, dy);

    distanceElement.textContent = `Distance: ${distance.toFixed(2)} pixels`;

    if (distance < 10) {
        alert(`Congratulations, ${playerData.nickname}! You've found the treasure!`);
        playerData.gameHistory.push({ playerX, playerY, distance });
        localStorage.setItem('playerData', JSON.stringify(playerData));
        backgroundMusic.pause();
    } else {
        playerX = getRandomInt(0, 499);
        playerY = getRandomInt(0, 499);
    }

    fetchElementData().then(data => {
        if (data) {
            elementInfo.textContent = `${data.key}: ${data.value}`;
        }
    });
});

// Save player data to local storage on unload
window.addEventListener('unload', () => {
    playerData.gameHistory.push({ playerX, playerY, distance: getDistance(playerX, playerY, targetX, targetY) });
    localStorage.setItem('playerData', JSON.stringify(playerData));
});