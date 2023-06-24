export const crearTabla = (data) => {
    const $anunciosContainer = document.getElementById("table-container");
    while($anunciosContainer.hasChildNodes()){
        $anunciosContainer.removeChild($anunciosContainer.lastChild);
    }


    const tabla = document.createElement("table");
    tabla.classList.add(
        "table",
        "table-dark",
        "table-striped",
        "table-hover",
        "table-bordered",
        "table-responsive-sm"
    );

    const tHead = document.createElement("thead");
    tHead.classList.add("table-dark");

    const tBody = document.createElement("tbody");
    const rowHead = document.createElement("tr");

    for (const key in data[0]) {
        if (key === "id") continue;
        const cabecera = document.createElement("th");
        cabecera.classList.add("text-capitalize");
        cabecera.innerText = key;
        rowHead.appendChild(cabecera);
    }

    tHead.appendChild(rowHead);
    tabla.appendChild(tHead);
    tabla.appendChild(tBody);
    tHead.setAttribute("id", "cabecera");
    tBody.setAttribute("id", "filas");

    $anunciosContainer.appendChild(tabla);
    return tabla;
};

export const agregarFila = (data) => {
    let $tBody = document.getElementById("filas");
    const tr = document.createElement("tr");

    let valores = Object.values(data);
    tr.dataset.id = valores[0];
    valores.splice(0, 1);
    valores.forEach((valor) => {
        const td = document.createElement("td");
        td.innerText = valor;
        tr.appendChild(td);
    });

    $tBody.appendChild(tr);
    return tr;
};

export const cargarAnuncios = (anuncios) => {
    let $body = document.getElementById("filas");
    while ($body.hasChildNodes()) {
        $body.removeChild($body.lastChild);
    }

    anuncios.forEach((anuncio) => {
        agregarFila(anuncio);
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
