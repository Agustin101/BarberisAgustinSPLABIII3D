const agregarFiltros = (data, contenedor) => {
    const keys = Object.keys(data);

    keys.forEach((k) => {
        if (k == "id") return;
        const div = document.createElement("div");
        const check = document.createElement("input");
        check.type = "checkbox";
        check.name = `filtro${k}`;
        check.id = `filtro${k}`;
        check.value = k;
        check.checked = true;
        check.classList.add("form-check-input");

        const label = document.createElement("label");
        label.htmlFor = check.name;
        label.textContent = k;
        div.appendChild(check);
        div.appendChild(label);
        contenedor.appendChild(div);
    });
};

export const crearFiltrosColumnas = (data) => {
    const $columnasContainer = document.getElementById(
        "filtrosColumnasContainer"
    );
    // <div class="d-flex justify-content-evenly">
    const tituloFiltros = document.createElement("p");
    tituloFiltros.textContent =
        "Campos mostrados (tilde los campos que quiere ver)";
    tituloFiltros.classList.add("h4");

    const filtrosContainer = document.createElement("div");
    filtrosContainer.classList.add("d-md-flex", "justify-content-evenly");

    agregarFiltros(data, filtrosContainer);
    $columnasContainer.appendChild(tituloFiltros);
    $columnasContainer.appendChild(filtrosContainer);
};
