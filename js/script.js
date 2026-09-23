const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

const btn = document.getElementById("spr");
const scroreElement = document.getElementById("score");

const forkUpgrade = document.getElementById("fork-upgrade");
const forkCostElement = document.getElementById("fork-cost")

const factButton = document.getElementById("fact-button");
const factElement = document.getElementById("fact");

const clickSound = new Audio("./assets/sound/s.wav");
let score = 0;
let forkCost = 25;

let floatingText = [];
let wafflesPerClick = 1;
factButton.addEventListener("click", async () => {
    factElement.textContent = "Loading...";

    try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
        const data = await response.json();

        factElement.textContent = data.text;
    } catch (error) {
        factElement.textContent = "Could not load a fact.";
    }
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function updateScreen() {

    scroreElement.textContent = `Waffles: ${score}`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    floatingText.forEach((text) => {
        ctx.save();

        ctx.font = "bold 28px Arial";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = `rgba(255, 255, 255, ${text.opacity})`;

        ctx.shadowColor = `rgba(0, 0, 0, ${text.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(
            text.value,
            text.x,
            text.y
        );

        ctx.restore();
    })
}


function createFloatingText(x, y) {
    const rect = btn.getBoundingClientRect();

    const text = {
        value: `+${wafflesPerClick}`,
        x: x,
        y: y,
        opacity: 1,

        velocityY: -1.5,
        velocityX: (Math.random() - 0.5) * 1.5
    };

    floatingText.push(text);
}

btn.addEventListener("click", (e) => {
    score += wafflesPerClick;

    createFloatingText(e.clientX, e.clientY);

    clickSound.currentTime = 0;
    clickSound.play();

    updateScreen();
});
forkUpgrade.addEventListener("click", () => {
    if (score >= forkCost) {
        score -= forkCost;
        wafflesPerClick += 1;

        forkCost *= 2;
        forkCostElement.textContent = forkCost;
        updateScreen();
    }
})

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    floatingText.forEach((text) => {
        text.y += text.velocityY;
        text.x += text.velocityX;

        text.velocityY -= 0.02;

        text.opacity -= 0.015;

        ctx.save();

        ctx.font = "bold 30px Arial";
        ctx.fillStyle = `rgba(255, 255, 255, ${text.opacity})`;
        ctx.textAlign = "center"

        ctx.fillText(text.value, text.x, text.y);

        ctx.restore();
    })

    floatingText = floatingText.filter((text) => {
        return text.opacity > 0
    });

    requestAnimationFrame(animate)
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

updateScreen()
animate()