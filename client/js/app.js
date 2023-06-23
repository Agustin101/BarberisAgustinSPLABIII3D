import { SuperHeroe } from "./superHeroe.js";
import { getHeroes, postHero, updateHero } from "./peticiones.js";

import {
    crearTabla,
    agregarFila,
    cargarAnuncios,
    agregarDetalles,
} from "./tabla.js";

let anuncios = [];

const cargarSelect = (armas) => {
    const $select = document.getElementById("armas");
    const fragment = document.createDocumentFragment();
    armas.forEach((arma) => {
        const opt = document.createElement("option");
        opt.innerText = arma;
        opt.value = arma;
        fragment.appendChild(opt);
    });

    $select.appendChild(fragment);
};

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
    const { anuncioId, nombre, fuerza, alias, editorial, arma } = $form;

    anuncioId.value = "";
    nombre.value = "";
    fuerza.value = "500";
    alias.value = "";
    editorial.value = "marvel";
    arma.value = "Armadura";
};

const crearAnuncio = async ({ nombre, alias, editorial, fuerza, arma }) => {
    let anuncio = new SuperHeroe(
        0,
        nombre.value,
        fuerza.value,
        alias.value,
        editorial.value,
        arma.value
    );

    try {
        $form.classList.add("oculto");
        await postHero("http://localhost:3000/heroes", anuncio);
    } catch (err) {
        console.log(err);
    }
};

const actualizarAnuncio = async (
    anuncioId,
    { nombre, alias, editorial, fuerza, arma }
) => {
    const updatedHero = new SuperHeroe(anuncioId, nombre.value, fuerza.value,alias.value,editorial.value,arma.value);
    console.log(updatedHero);
    try{
        await updateHero("http://localhost:3000/heroes",updatedHero,anuncioId);
    }
    catch (err){
        console.log(err);
    }
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

const iniciarAplicacion = async () => {
    if (localStorage.getItem("armas") === null) {
        const armas = [
            "Armadura",
            "Espada",
            "Martillo",
            "Escudo",
            "Arma de fuego",
            "Flechas",
            "Musculos",
        ];
        localStorage.setItem("armas", JSON.stringify(armas));
        cargarSelect(armas);
    } else {
        const armas = JSON.parse(localStorage.getItem("armas"));
        cargarSelect(armas);
    }

    try {
        anuncios = await getHeroes("http://localhost:3000/heroes");
        if (anuncios.length > 0) {
            crearTabla(anuncios);
            cargarAnuncios(anuncios);
        }
    } catch (err) {
        console.log(err);
    } finally {
        document.querySelector(".spinner").classList.add("spinner-oculto");
        ocultarBotonesEdicion();
    }
};

const $form = document.forms[0];
$form.addEventListener("submit", agregarAnuncio);
document.addEventListener("DOMContentLoaded", iniciarAplicacion);

document.getElementById("btnCancelar").addEventListener("click", () => {
    limpiarCampos();
    ocultarBotonesEdicion();
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
        const id = parseInt($element.parentNode.dataset.id);
        const anuncio = anuncios.find((a) => a.id === id);
        const { anuncioId, nombre, alias, editorial, fuerza, arma } = $form;

        anuncioId.value = id;
        nombre.value = anuncio.nombre;
        alias.value = anuncio.alias;
        editorial.value = anuncio.editorial;
        fuerza.value = anuncio.fuerza;
        arma.value = anuncio.arma;
        mostrarBotonesEdicion();
    }
});
