import { SuperHeroe } from "./personaje.js";

import {
    crearTabla,
    agregarFila,
    cargarAnuncios,
    agregarDetalles,
} from "./tabla.js";

const cargarSelect = (armas) => {
    const $select = document.getElementById("arma");
    const fragment = document.createDocumentFragment();
    armas.forEach((arma) => {
        const opt = document.createElement("option");
        opt.innerText = arma;
        opt.value = arma; 
        fragment.appendChild(opt);
    });


    $select.appendChild(fragment);
};

const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];

function mostrarBotonesEdicion() {
    let $botonCancelar = document.getElementById("btnCancelar");
    $botonCancelar.classList.add("visible");

    let $botonEliminar = document.getElementById("btnEliminar");
    $botonEliminar.classList.add("visible");
}

function ocultarBotonesEdicion() {
    let $botonCancelar = document.getElementById("btnCancelar");
    $botonCancelar.classList.remove("visible");

    let $botonEliminar = document.getElementById("btnEliminar");
    $botonEliminar.classList.remove("visible");
}

const limpiarCampos = () => {
    const {
        anuncioId,
        nombre,
        fuerza,
        alias,
        editorial,
        arma
    } = $form;

    anuncioId.value = "";
    nombre.value = "";
    fuerza.value = "50";
    alias.value = "";
    editorial.value = "marvel";
    arma.value = "Armadura";
};

const crearAnuncio = ({
    nombre,
    alias,
    editorial,
    fuerza,
    arma
}) => {
    let proximoId = anuncios[anuncios.length - 1]?.id || 0;
    let anuncio = new SuperHeroe(proximoId + 1, nombre.value, fuerza.value, alias.value, editorial.value, arma.value);
    anuncios.push(anuncio);

    if (anuncios.length === 1) {
        crearTabla(anuncios);
        agregarDetalles(anuncios[0]);
    }
    localStorage.setItem("anuncios", JSON.stringify(anuncios));
    agregarFila(anuncio);
    limpiarCampos();
};

const actualizarAnuncio = (
    anuncioId,
    { nombre, alias, editorial, fuerza, arma }
) => {
    let anuncio = anuncios.find((x) => x.id === anuncioId);
    anuncio.nombre = nombre.value;
    anuncio.alias = alias.value;
    anuncio.editorial = editorial.value;
    anuncio.fuerza = fuerza.value;
    anuncio.arma = arma.value;
    localStorage.setItem("anuncios", JSON.stringify(anuncios));
    cargarAnuncios(anuncios);
    limpiarCampos();
};

const agregarAnuncio = (e) => {
    e.preventDefault();
    const { anuncioId } = $form;

    if (anuncioId.value === "") {
        crearAnuncio($form);
    } else {
        actualizarAnuncio(parseInt(anuncioId.value), $form);
    }

    ocultarBotonesEdicion();
};

const iniciarAplicacion = () => {

    if (localStorage.getItem("armas") === null) {
        const armas = [
            "Armadura",
            "Espada",
            "Martillo",
            "Escudo",
            "Arma de fuego",
            "Flechas",
            "Musculos"
        ];
        localStorage.setItem("armas", JSON.stringify(armas));
        cargarSelect(armas);
    } else {
        const armas = JSON.parse(localStorage.getItem("armas"));
        cargarSelect(armas);
    }

    const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];

    if (anuncios.length > 0) {
        setTimeout(() => {
            crearTabla(anuncios);
            const $divSpinner = document.querySelector(".spinner");
            $divSpinner.classList.add("spinner-oculto");
            cargarAnuncios(anuncios);
        }, 2000);
    } else {
        const $divSpinner = document.querySelector(".spinner");
        $divSpinner.classList.add("spinner-oculto");
    }
};

const $form = document.forms[0];
$form.addEventListener("submit", agregarAnuncio);
document.addEventListener("DOMContentLoaded", iniciarAplicacion);

document.getElementById("btnCancelar").addEventListener("click", () => {
    limpiarCampos();
    let $btn = document.getElementById("btnCancelar");
    $btn.classList.remove("visible");
    $btn.classList.add("oculto");

    let $btnEliminar = document.getElementById("btnEliminar");
    $btnEliminar.classList.remove("visible");
    $btnEliminar.classList.add("oculto");
});

document.getElementById("btnEliminar").addEventListener("click", () => {
    const $form = document.querySelector(".formulario-alta");
    const anuncios = JSON.parse(localStorage.getItem("anuncios"));
    let { anuncioId } = $form;
    anuncioId = parseInt(anuncioId.value);
    const anunciosActual = anuncios.filter(
        (anuncio) => anuncio.id !== anuncioId
    );
    cargarAnuncios(anunciosActual);
    limpiarCampos();
    localStorage.clear();
    localStorage.setItem("anuncios", JSON.stringify(anunciosActual));
});

document.addEventListener("click", (e) => {
    let $element = e.target;
    if (
        $element !== null &&
        $element.parentNode !== null &&
        $element.parentNode.getAttribute("data-id")
    ) {
        const $form = document.forms[0];
        const id = parseInt($element.parentNode.dataset.id);
        const anuncios = JSON.parse(localStorage.getItem("anuncios"));
        const anuncio = anuncios.find((a) => a.id === id);
        const { anuncioId, nombre, alias, editorial, fuerza, arma } = $form;

        anuncioId.value = id;
        nombre.value = anuncio.nombre;
        alias.value = anuncio.alias;
        editorial.value = anuncio.editorial;
        fuerza.value = anuncio.fuerza;
        arma.value = anuncio.arma;
        mostrarBotonesEdicion();
        // const $btnGuardar = document.querySelector(".btn-guardar");
        // $btnGuardar.textContent = "Actualizar";
    }
});


