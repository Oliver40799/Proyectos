const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const musicaInicio =
document.getElementById("musicaInicio");



let musicaIniciada = false;
let muteada = false;

const toggleMusica =
document.getElementById("toggleMusica");

document.addEventListener("click", () => {

    if (!musicaIniciada) {

        musicaInicio.volume = 0;

        musicaInicio.play();

        musicaIniciada = true;

        let volumen = 0;

        const fadeIn = setInterval(() => {

            volumen += 0.02;

            if (volumen >= 0.25) {

                volumen = 0.25;

                clearInterval(fadeIn);
            }

            musicaInicio.volume = volumen;

        }, 100);
    }

}, { once: true });

toggleMusica.addEventListener("click", (e) => {

    e.stopPropagation();

    muteada = !muteada;

    musicaInicio.muted = muteada;

    toggleMusica.textContent =
    muteada ? "🔇" : "🔊";

});

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const rosas = [];

let completado = false;
let tiempo = 0;
let escala = 1;
let tiempoLatido = 0;
let inicioMostrado = false;

// Crear corazón
for (let i = 0; i < 1200; i++) {

    let x, y;

    do {
        x = (Math.random() * 2 - 1) * 1.5;
        y = (Math.random() * 2 - 1) * 1.5;
    }
    while (
        Math.pow(x * x + y * y - 1, 3)
        - x * x * y * y * y > 0
    );

    rosas.push({
        xActual: Math.random() * window.innerWidth,
        yActual: Math.random() * window.innerHeight,
        xDestino: x,
        yDestino: y
    });
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let todasLlegaron = true;

    // Latido
    if (completado) {

        tiempo += 0.05;
        escala = 1 + Math.sin(tiempo) * 0.04;

        tiempoLatido++;

    } else {

        escala = 1;
    }

    let centroX = canvas.width / 2;
    let centroY = canvas.height / 2;

    let tamañoCorazon = 220;

    // Cuando aparece la introducción
    if (inicioMostrado) {

        centroY = canvas.height * 0.25;
        tamañoCorazon = 120;
    }

    rosas.forEach(r => {

        const targetX =
            centroX +
            r.xDestino * tamañoCorazon * escala;

        const targetY =
            centroY -
            r.yDestino * tamañoCorazon * escala;

        // MÁS RÁPIDO
        r.xActual += (targetX - r.xActual) * 0.05;
        r.yActual += (targetY - r.yActual) * 0.05;

        if (
            Math.abs(targetX - r.xActual) > 2 ||
            Math.abs(targetY - r.yActual) > 2
        ) {
            todasLlegaron = false;
        }

        ctx.font = `${12 * escala}px Arial`;
        ctx.fillText("🌹", r.xActual, r.yActual);
    });

    // Cuando termina de formarse el corazón
    if (todasLlegaron && !completado) {
        completado = true;
    }

    // Mostrar introducción MÁS RÁPIDO (2 segundos)
if (
    completado &&
    tiempoLatido > 120 &&
    !inicioMostrado
) {

    inicioMostrado = true;


    const inicio =
        document.getElementById("inicio");

    inicio.classList.remove("oculto");

    setTimeout(() => {
        inicio.classList.add("mostrar");
    }, 100);
}

    requestAnimationFrame(animate);
}

animate();

// BOTÓN ABRIR REGALO

const boton =
document.getElementById("abrirCarta");

if (boton) {

boton.addEventListener("click", () => {

    let volumen = musicaInicio.volume;

    const fadeOut = setInterval(() => {

        volumen -= 0.02;

        if (volumen <= 0) {

            volumen = 0;

            clearInterval(fadeOut);

            musicaInicio.pause();

            document.body.classList.add("fadeOut");

            setTimeout(() => {

                window.location.href =
                "recuerdos.html";

            }, 1500);
        }

        musicaInicio.volume = volumen;

    }, 50);

});

}