export const crearTabla = (data) => {
    const tabla = document.createElement("table");
    const tHead = document.createElement("thead");
    const tBody = document.createElement("tbody");

    for (const key in data[0]) {
        if (key === "id") continue;
        const cabecera = document.createElement("th");
        cabecera.innerText = key;
        tHead.appendChild(cabecera);
    }

    const $anuncios = document.getElementById("table-container");
    tabla.appendChild(tHead);
    tabla.appendChild(tBody);
    tHead.setAttribute("id", "cabecera");
    tBody.outerHTML = "<tbody id='filas'></tbody>";
    $anuncios.appendChild(tabla);
    return tabla;
};

export const agregarFila = (data) => {
    let $tBody = document.getElementById("filas");
    const tr = document.createElement("tr");

    let valores = Object.values(data);
    tr.dataset.id = valores[0];
    valores.splice(0, 1);
    valores.forEach((valor, index) => {
        const td = document.createElement("td");
        td.innerText = valor;
        tr.appendChild(td);
    });

    $tBody.appendChild(tr);
    tr.setAttribute("id", data.id);

    return tr;
};

export const cargarAnuncios = (anuncios) => {
    let $body = document.getElementById("filas");
    while ($body.hasChildNodes()) {
        $body.removeChild($body.lastChild);
    }

    anuncios.forEach((anuncio, index) => {
        const tr = agregarFila(anuncio);
        if (index % 2 === 0) tr.classList.add("par");
    });
};

export const agregarDetalles = (data) => {
    let $cabecera = document.getElementById("cabecera");
    while ($cabecera.hasChildNodes()) {
        $cabecera.removeChild($cabecera.lastChild);
    }

    for (const key in data) {
        if (key === "id") continue;
        const cabecera = document.createElement("th");
        cabecera.innerText = key;
        $cabecera.appendChild(cabecera);
    }
};
