/**
0 = pared
1 = pacman 
2 = fantasma
3 =  pastilla pequeña
4 = pastilla grande (power)
5 = fruta
6 = pasillo
 */
const MAPA = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0],
    [0, 4, 0, 2, 0, 3, 0, 2, 3, 0, 3, 2, 0, 2, 3, 0, 2, 0, 4, 0],
    [0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0],
    [0, 3, 0, 5, 0, 3, 0, 1, 3, 0, 3, 0, 0, 5, 3, 0, 2, 0, 3, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0],
    [0, 4, 0, 2, 0, 3, 0, 2, 3, 0, 3, 2, 0, 2, 3, 0, 2, 0, 4, 0],
    [0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 3, 0, 0, 0, 3, 0, 0, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0],
    [0, 3, 0, 5, 0, 3, 0, 6, 3, 0, 3, 6, 0, 5, 3, 0, 2, 0, 3, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const ROWS = MAPA.length
const COLS = MAPA[0].length

//  Canvas y contexto
const canvas = document.getElementById('lienzo')
const ctx = canvas.getContext('2d')

// calculamos el tamaño del cuadroi/tile según el canvas
const TILE_SIZE = canvas.width / COLS // cuadrícula uniforme

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
}

function dubujarPared(
    ctx,
    c,
    r,
    size,
    relleno = '#14315a',
    colorPared = 'rgba(255,255,255,0.94)'
) {
    const x = c * size
    const y = r * size
    const pad = Math.max(2, size * 0.12)

    ctx.save()
    ctx.fillStyle = relleno
    // pared con "borde" brillante
    ctx.fillRect(x + pad, y + pad, size - pad * 2, size - pad * 2)

    // highlight
    ctx.strokeStyle = colorPared
    ctx.lineWidth = Math.max(1, size * 0.02)
    roundRect(ctx, x + pad, y + pad, size - pad * 2, size - pad * 2, 4)
    ctx.stroke()

    ctx.restore()
}

//dubujarPared(ctx, 0, 0, TILE_SIZE*4)

function dibujarPunto(ctx, c, r, size, relleno = '#ffe9a3') {
    const cx = c * size + size / 2
    const cy = r * size + size / 2
    const radius = Math.max(1.5, size * 0.06)

    ctx.beginPath()
    ctx.fillStyle = relleno
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()
}

//dibujarPunto(ctx, 0, 0, TILE_SIZE*4)

function dibujarPotenciadora(
    ctx,
    c,
    r,
    size,
    relleno = '#ffb3c1',
    colorBorde = 'rgba(255,255,255,0.15)'
) {
    const cx = c * size + size / 2
    const cy = r * size + size / 2
    const radius = Math.max(4, size * 0.12)

    //relleno
    ctx.beginPath()
    ctx.fillStyle = relleno
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()

    // brillo
    ctx.beginPath()
    ctx.fillStyle = colorBorde
    ctx.arc(cx - radius * 0.35, cy - radius * 0.35, radius * 0.45, 0, Math.PI * 2)
    ctx.fill()
}

//dibujarPotenciadora(ctx, 0,0, TILE_SIZE*5);

function dibujaFruta(ctx, c, r, size) {
    // una cereza estilizada
    const cx = c * size + size / 2
    const cy = r * size + size / 2
    const rFruit = Math.max(5, size * 0.35)

    // tallo
    ctx.beginPath()
    ctx.strokeStyle = '#2c9c2c'
    ctx.lineWidth = Math.max(2, size * 0.02)
    ctx.moveTo(cx - rFruit * 0.2, cy - rFruit * 0.6)
    ctx.quadraticCurveTo(
        cx,
        cy - rFruit * 1.2,
        cx + rFruit * 0.8,
        cy - rFruit * 1.1
    )
    ctx.stroke()

    // fruto
    ctx.beginPath()
    ctx.fillStyle = '#d92148'
    ctx.arc(cx - rFruit * 0.25, cy - rFruit * 0.05, rFruit * 0.85, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = '#c20f3a'
    ctx.arc(cx + rFruit * 0.45, cy + rFruit * 0.05, rFruit * 0.75, 0, Math.PI * 2)
    ctx.fill()

    // brillo
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.arc(cx - rFruit * 0.45, cy - rFruit * 0.45, rFruit * 0.3, 0, Math.PI * 2)
    ctx.fill()
}

//dibujaFruta(ctx, 0, 0, TILE_SIZE * 5)

function dibujarPacman(ctx, c, r, size, direction = 'right', open = 0.2) {
    const cx = c * size + size / 2
    const cy = r * size + size / 2
    const radius = Math.max(6, size * 0.40)

    const mouth = open * Math.PI // ángulo de apertura

    //  ángulos de la boca según dirección
    let start = 0,
        end = Math.PI * 2
    switch (direction) {
        case 'right':
            start = mouth / 2
            end = Math.PI * 2 - mouth / 2
            break
        case 'left':
            start = Math.PI + mouth / 2
            end = Math.PI - mouth / 2
            break
        case 'up':
            start = -Math.PI / 2 + mouth / 2
            end = -Math.PI / 2 - mouth / 2 + Math.PI * 2
            break
        case 'down':
            start = Math.PI / 2 + mouth / 2
            end = Math.PI / 2 - mouth / 2 + Math.PI * 2
            break
    }

    ctx.save()
    // cuerpo del pacman    
    ctx.beginPath()
    ctx.fillStyle = '#ffd700'
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, radius, start, end, false)
    ctx.closePath()
    ctx.fill()

    // ojo 
    ctx.beginPath()
    ctx.fillStyle = '#000'
    let ex = cx,
        ey = cy;

    // ajustamos posición ojo según dirección
    if (direction === 'right') {
        ex += radius * 0.25
        ey -= radius * 0.45
    }
    if (direction === 'left') {
        ex -= radius * 0.25
        ey -= radius * 0.45
    }
    if (direction === 'up') {
        ey -= 0
        ex -= radius * 0.5
    }
    if (direction === 'down') {
        ey -= 0
        ex += radius * 0.5
    }

    //ojo pacman
    ctx.arc(ex, ey, Math.max(2, size * 0.03), 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
}

//dibujarPacman(ctx, 0, 0, TILE_SIZE * 5, direction = 'right', open = 0.2)

function dibujarFantasma(ctx, c, r, size, color = '#ff4050') {
    const x = c * size
    const y = r * size
    const w = size
    const h = size

    ctx.save()
    // cuerpo (semicírculo superior + rect + scallops)
    const cx = x + w / 2
    const cy = y + h / 2
    const radius = w * 0.4

    // cuerpo principal
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.moveTo(x + w * 0.1, y + h * 0.6)
    ctx.lineTo(x + w * 0.1, y + h * 0.35)
    ctx.arc(cx, y + h * 0.35, radius, Math.PI, 0, false)
    ctx.lineTo(x + w * 0.9, y + h * 0.6)

    // ondas 
    const scallopR = w * 0.08
    let sx = x + w * 0.1
    for (let i = 0; i < 5; i++) {
        ctx.arc(sx + scallopR, y + h * 0.6, scallopR, Math.PI, 0, true)
        sx += scallopR * 2
    }

    ctx.closePath()
    ctx.fill()

    // ojos
    ctx.beginPath()
    ctx.fillStyle = '#ffffff'
    ctx.ellipse(
        cx - w * 0.16,
        y + h * 0.35,
        w * 0.12,
        h * 0.16,
        0,
        0,
        Math.PI * 2
    )
    ctx.ellipse(
        cx + w * 0.16,
        y + h * 0.35,
        w * 0.12,
        h * 0.16,
        0,
        0,
        Math.PI * 2
    )
    ctx.fill()

    //iris
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.arc(cx - w * 0.16, y + h * 0.35, w * 0.05, 0, Math.PI * 2)
    ctx.arc(cx + w * 0.11, y + h * 0.35, w * 0.05, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
}

//dibujarFantasma(ctx, 2, 2, TILE_SIZE * 5)



//// 
// Animación / estado simple
let pacmanDir = 'right'; // 'left','right','up','down' 
let mouthOpen = 0.2; // fracción de PI para abrir la boca
let mouthPulse = 0; // dirección de apertura/cierre de la boca
let lastMoment = performance.now();

function dibujarCelda(ctx, val, c, r, size) {
    // Primero limpiamos el fondo del tile (pasillo)
    const x = c * size;
    const y = r * size;
    ctx.clearRect(x, y, size, size);

    // dibujamos un suelo sutil para pasillos
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, size, size);

    switch (val) {
        case 0: // pared
            dubujarPared(ctx, c, r, size);
            break;
        case 1: // pacman 
            dibujarPacman(ctx, c, r, size,
                pacmanDir,
                0.2 + Math.abs(Math.sin(mouthPulse)) * 0.25);
            break;
        case 2: // fantasma
            dibujarPunto(ctx, c, r, size);
            dibujarFantasma(ctx, c, r, size, '#ff5a7a');
            break;
        case 3: // dot
            dibujarPunto(ctx, c, r, size);
            break;
        case 4: // potenciadora
            dibujarPotenciadora(ctx, c, r, size);
            break;
        case 5: // fruta
            dibujaFruta(ctx, c, r, size);
            break;
        case 6: // empty
        default:
            // brillo en pasillos:
            ctx.fillStyle = 'rgba(255,255,255,0.015)';
            ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
            break;
    }
}


// function dibujarFrame(now) {
//     const dt = (now - lastMoment) / 500;
//     lastMoment = now;

//     //  animación de la boca
//     mouthPulse += dt * 8; // velocidad

//     // limpiar todo el canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Recorrer la matriz y dibujar cada celda
//     for (let r = 0; r < ROWS; r++) {
//         for (let c = 0; c < COLS; c++) {
//             const val = MAPA[r][c];
//             dibujarCelda(ctx, val, c, r, TILE_SIZE);
//         }
//     }

//     requestAnimationFrame(dibujarFrame);
// }

// // Empezar animación
// requestAnimationFrame(dibujarFrame);



let pacman = { r: 1, c: 1, dir: 'right', nextDir: 'right' };
let speed = 2; // celdas por segundo
let pacmanX = pacman.c * TILE_SIZE;
let pacmanY = pacman.r * TILE_SIZE;


document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': pacman.nextDir = 'up'; break;
        case 'ArrowDown': pacman.nextDir = 'down'; break;
        case 'ArrowLeft': pacman.nextDir = 'left'; break;
        case 'ArrowRight': pacman.nextDir = 'right'; break;
    }
    console.log('nextDir:', pacman.nextDir);
});


function puedeMover(r, c) {
    if (r < 0 || c < 0 || r >= ROWS || c >= COLS) return false; // fuera del mapa
    return MAPA[r][c] !== 0; // 0 = pared
}

function moverPacman(dt) {
    const vel = speed * dt * 2; // ajusta velocidad según delta time

    // Dirección tentativa según teclado
    let nextR = pacman.r;
    let nextC = pacman.c;

    switch (pacman.nextDir) {
        case 'up': nextR = pacman.r - 1; break;
        case 'down': nextR = pacman.r + 1; break;
        case 'left': nextC = pacman.c - 1; break;
        case 'right': nextC = pacman.c + 1; break;
    }

    // Si puede cambiar de dirección (no hay pared)
    if (puedeMover(nextR, nextC)) {
        pacman.dir = pacman.nextDir;
    }
    // Mover en la dirección actual
    switch (pacman.dir) {
        case 'up':
            pacmanY -= vel * TILE_SIZE;
            if (pacmanY < pacman.r * TILE_SIZE) {
                const targetR = pacman.r - 1;
                if (puedeMover(targetR, pacman.c)) {
                    pacman.r = targetR;
                    pacmanY = pacman.r * TILE_SIZE;
                } else {
                    pacmanY = pacman.r * TILE_SIZE;
                }
            }
            break;
        case 'down':
            pacmanY += vel * TILE_SIZE;
            if (pacmanY > pacman.r * TILE_SIZE) {
                const targetR = pacman.r + 1;
                if (puedeMover(targetR, pacman.c)) {
                    pacman.r = targetR;
                    pacmanY = pacman.r * TILE_SIZE;
                } else {
                    pacmanY = pacman.r * TILE_SIZE;
                }
            }
            break;
        case 'left':
            pacmanX -= vel * TILE_SIZE;
            if (pacmanX < pacman.c * TILE_SIZE) {
                const targetC = pacman.c - 1;
                if (puedeMover(pacman.r, targetC)) {
                    pacman.c = targetC;
                    pacmanX = pacman.c * TILE_SIZE;
                } else {
                    pacmanX = pacman.c * TILE_SIZE;
                }
            }
            break;
        case 'right':

            pacmanX += vel * TILE_SIZE;
            if (pacmanX > pacman.c * TILE_SIZE) {
                const targetC = pacman.c + 1;
                if (puedeMover(pacman.r, targetC)) {
                    pacman.c = targetC;
                    pacmanX = pacman.c * TILE_SIZE;
                } else {
                    pacmanX = pacman.c * TILE_SIZE;
                }
            }
            break;
    }

}



function dibujarFrame(now) {
    const dt = (now - lastMoment) / 1000; // diferencia en tiempo  en segundos
    lastMoment = now;

    // animación
    mouthPulse += (mouthPulse + 1) % 90;
    console.log('dt:', dt.toFixed(3));

    // mover pacman
    moverPacman(dt);
    console.log(`Pacman pos: r=${pacman.r}, c=${pacman.c}`);
    console.log(`Pacman pixel: x=${pacmanX.toFixed(1)}, y=${pacmanY.toFixed(1)}`);
    console.log(`Pacman dir: ${pacman.dir}, nextDir: ${pacman.nextDir}`);
    console.log('---');

    // limpiar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // dibujar mapa
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const val = MAPA[r][c];
            dibujarCelda(ctx, val, c, r, TILE_SIZE);
        }
    }

    // dibujar Pac-Man
    dibujarPacman(ctx, pacmanX, pacmanY, TILE_SIZE, pacman.dir, mouthPulse);

    requestAnimationFrame(dibujarFrame);
}



function dibujarPacmanv2(ctx, x, y, size, t, dir) {
    const radius = size / 2;
    const mouth = Math.abs(Math.sin(t)) * 0.3 * Math.PI;
    const cx = x + radius;
    const cy = y + radius;

    let start = 0, end = 0;
    switch (dir) {
        case 'right': start = mouth; end = 2 * Math.PI - mouth; break;
        case 'left': start = Math.PI + mouth; end = Math.PI - mouth; break;
        case 'up': start = 1.5 * Math.PI + mouth; end = 1.5 * Math.PI - mouth; break;
        case 'down': start = 0.5 * Math.PI + mouth; end = 0.5 * Math.PI - mouth; break;
    }

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end, false);
    ctx.closePath();
    ctx.fill();
}

function dibujarPacman(ctx, cx, cy, size, direction = 'right', open = 0.2) {
    //const cx = c * size + size / 2
    //const cy = r * size + size / 2
    console.log('dibujarPacman:', cx, cy, size, direction, open);
    cx += size / 2
    cy += size / 2

    const radius = Math.max(6, size * 0.40)


    const mouth = 0.2 + Math.abs(Math.sin(open))  // ángulo de apertura

    //  ángulos de la boca según dirección
    let start = 0,
        end = Math.PI * 2
    switch (direction) {
        case 'right':
            start = mouth / 2
            end = Math.PI * 2 - mouth / 2
            break
        case 'left':
            start = Math.PI + mouth / 2
            end = Math.PI - mouth / 2
            break
        case 'up':
            start = -Math.PI / 2 + mouth / 2
            end = -Math.PI / 2 - mouth / 2 + Math.PI * 2
            break
        case 'down':
            start = Math.PI / 2 + mouth / 2
            end = Math.PI / 2 - mouth / 2 + Math.PI * 2
            break
    }

    ctx.save()
    // cuerpo del pacman    
    ctx.beginPath()
    ctx.fillStyle = '#ffd700'
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, radius, start, end, false)
    ctx.closePath()
    ctx.fill()

    // ojo 
    ctx.beginPath()
    ctx.fillStyle = '#000'
    let ex = cx,
        ey = cy;

    // ajustamos posición ojo según dirección
    if (direction === 'right') {
        ex += radius * 0.25
        ey -= radius * 0.45
    }
    if (direction === 'left') {
        ex -= radius * 0.25
        ey -= radius * 0.45
    }
    if (direction === 'up') {
        ey -= 0
        ex -= radius * 0.5
    }
    if (direction === 'down') {
        ey -= 0
        ex += radius * 0.5
    }

    //ojo pacman
    ctx.arc(ex, ey, Math.max(2, size * 0.03), 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
}


requestAnimationFrame(dibujarFrame);


