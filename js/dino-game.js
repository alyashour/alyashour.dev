const container = document.getElementById('dino-game');

if (container == null) {
    console.log('Failed to initialize dino game, container is null');
}

// create dinosaur
const dino = document.createElement('div');

// update dino style
dino.style.width = '20px';
dino.style.height = '20px';
dino.style.position = 'absolute';
dino.style.bottom = '0';
dino.style.left = '50px';
container.appendChild(dino);

let isJumping = false;
document.addEventListener('keydown', event => {
    if (event.code == 'Space' && isJumping) {
        isJumping = true;
        let jumpHeight = 0;
        const up = setInterval(() => {
            if (jumpHeight >= 50) {
                clearInterval(up);
                const down = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(down);
                        isJumping = false;
                    } else {
                        jumpHeight -= 2;
                        dino.style.bottom = jumpHeight + 'px';
                    }
                }, 10);
            } else {
                jumpHeight += 2;
                dino.style.bottom = jumpHeight + 'px';
            }
        }, 10);
    }

});

console.log('Dino Initialization done.')