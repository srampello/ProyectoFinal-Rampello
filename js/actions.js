const muestra = () =>{
    let elemento = document.getElementById("monto");
    elemento.className = "visible";
    let enlace = document.getElementById("enlace");
    enlace.className = "oculto";
    let ocultar = document.getElementById("ocultar");
    ocultar.className = "visible";
    let puntos = document.getElementById("puntos");
    puntos.className = "oculto";
}

const oculta = () =>{
    document.getElementById("enlace").className = "visible";
    document.getElementById("ocultar").className = "oculto";
    document.getElementById("monto").className = "oculto";
    let puntos = document.getElementById("puntos");
    puntos.className = "visible";
}