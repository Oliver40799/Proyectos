// ==========================
// MENSAJES DEL DÍA
// ==========================

const mensajes = [

"Quiero que sepas que te amo, que sin importar dónde estemos, eres mi lugar favorito.",

"Eres una chica tan linda, tan maravillosa e increíble que a veces me parece un sueño tenerte en mi vida.",

"Tu corazón vale más que cualquier tesoro porque ilumina todo a su alrededor.",

"Gracias por hacer mis días más felices con tu presencia.",

"Eres mi lugar seguro, mi lugar feliz y una de las mejores cosas que me han pasado.",

"No importa cómo sea mi día, siempre logras mejorarlo con una sola sonrisa.",

"Me encanta la forma en que me haces sentir cuando hablamos.",

"Cada momento contigo se convierte en un recuerdo especial para mí.",

"Gracias por existir y por permitirme compartir momentos contigo.",

"Espero que hoy tengas un día tan bonito como tú. ❤️",

"Tu sonrisa tiene algo que siempre logra alegrarme.",

"Si hoy no te lo ha dicho nadie, quiero recordarte que eres increíble.",

"Eres una de mis personas favoritas en este mundo.",

"Cada día agradezco haber coincidido contigo.",

"Me encanta escuchar tu voz y hablar contigo.",

"Cuando sonríes, todo parece un poco más bonito.",

"Eres más especial de lo que imaginas.",

"Gracias por todos los momentos que compartimos.",

"Espero que hoy tengas un día maravilloso.",

"Te quiero muchísimo ❤️"

];

// ==========================
// MENSAJE SEGÚN EL DÍA
// ==========================

const inicioRelacion =
new Date("2026-06-13T15:48:00");

const ahora =
new Date();

const diasJuntos =
Math.floor(
    (ahora - inicioRelacion)
    /
    (1000 * 60 * 60 * 24)
);

const mensaje =
mensajes[
    diasJuntos % mensajes.length
];

const contadorDias =
document.getElementById("contadorDias");

if(contadorDias){

    contadorDias.innerHTML =
    `💖 Llevamos ${diasJuntos} días juntos 💖`;

}

// ==========================
// EFECTO ESCRITURA
// ==========================

const contenedor =
document.getElementById("mensajeDia");

let indice = 0;

function escribirMensaje(){

    if(indice < mensaje.length){

        contenedor.textContent +=
        mensaje.charAt(indice);

        indice++;

        setTimeout(
            escribirMensaje,
            35
        );
    }
}

contenedor.textContent = "";

setTimeout(() => {

    escribirMensaje();

}, 500);

// ==========================
// CORAZONES FLOTANDO
// ==========================

function crearCorazon(){

    const corazon =
    document.createElement("div");

    corazon.innerHTML = "💖";

    corazon.style.position = "fixed";

    corazon.style.left =
    Math.random() * 100 + "vw";

    corazon.style.bottom = "-50px";

    corazon.style.fontSize =
    (Math.random() * 20 + 20) + "px";

    corazon.style.opacity =
    (Math.random() * .5 + .3);

    corazon.style.pointerEvents =
    "none";

    corazon.style.zIndex = "-1";

    document.body.appendChild(corazon);

    let y = -50;
    let x = parseFloat(corazon.style.left);

    const mover = setInterval(()=>{

        y += 1.5;

        x += Math.sin(y/50) * 0.05;

        corazon.style.bottom =
        y + "px";

        corazon.style.left =
        x + "vw";

        if(
            y >
            window.innerHeight + 100
        ){

            clearInterval(mover);

            corazon.remove();
        }

    },20);
}

setInterval(
    crearCorazon,
    900
);

// ==========================
// ANIMAR TARJETAS
// ==========================

const tarjetas =
document.querySelectorAll(".mensaje");

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform =
            "translateY(0)";
        }
    });

},{
    threshold:0.15
});

tarjetas.forEach(card=>{

    card.style.opacity = "0";

    card.style.transform =
    "translateY(40px)";

    card.style.transition =
    ".8s ease";

    observer.observe(card);

});

// ==========================
// MÚSICA DE FONDO
// ==========================

const musicaRecuerdos =
document.getElementById("musicaRecuerdos");

const toggleMusica =
document.getElementById("toggleMusica");

let musicaIniciada = false;
let muteada = false;

// Iniciar música al primer toque

document.addEventListener("click", () => {

    if(!musicaIniciada){

        musicaRecuerdos.volume = 0;

        musicaRecuerdos.play();

        musicaIniciada = true;

        let volumen = 0;

        const fadeIn = setInterval(()=>{

            volumen += 0.02;

            if(volumen >= 0.25){

                volumen = 0.25;

                clearInterval(fadeIn);
            }

            musicaRecuerdos.volume = volumen;

        },100);
    }

}, { once:true });

// Botón mute

toggleMusica.addEventListener("click",(e)=>{

    e.stopPropagation();

    muteada = !muteada;

    musicaRecuerdos.muted = muteada;

    toggleMusica.textContent =
    muteada ? "🔇" : "🔊";

});