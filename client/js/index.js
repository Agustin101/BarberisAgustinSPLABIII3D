const renderizarHeroes = (json) => {
    const $heroesSection = document.getElementById("heroesSection");
    const $spinner = document.querySelector(".spinner");
    $spinner.classList.add("spinner-oculto");
    json.forEach((hero) => {
        const divCarta = document.createElement("div");
        divCarta.classList.add("card", "text-bg-dark", "text-center", "col-lg-3", "col-md-4", "col-sm-5", "col-12", "mx-1", "mt-1", "px-2");

        const divHeader = document.createElement("div");
        divHeader.textContent = `Heroe de ${hero.editorial}`;

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const pAlias = document.createElement("p");
        const pNombre = document.createElement("p");
        const pEditorial = document.createElement("p");
        const pFuerza = document.createElement("p");
        const pArma = document.createElement("p");
        divBody.appendChild(pAlias);
        divBody.appendChild(pNombre);
        divBody.appendChild(pEditorial);
        divBody.appendChild(pFuerza);
        divBody.appendChild(pArma);
        pAlias.outerHTML = `<p> <i class="fa-solid fa-mask"></i> Alias : ${hero.alias}</p>`;
        pNombre.outerHTML = `<p>Nombre : ${hero.nombre}</p>`;
        pEditorial.outerHTML = `<p><i class="fa-solid fa-newspaper"></i> Editorial : ${hero.editorial}</p>`;
        pFuerza.outerHTML = `<p> <i class="fa-solid fa-hand-fist"></i> Fuerza: ${hero.fuerza} </p>`;
        pArma.outerHTML = `<p><i class="fa-solid fa-gun"></i> Arma : ${hero.arma}</p>`;
        
        divCarta.appendChild(divHeader);
        divCarta.appendChild(divBody);
        $heroesSection.appendChild(divCarta);
    });
};

const obtenerHeroesAjax = (url) => {
    const xml = new XMLHttpRequest();
    xml.addEventListener("readystatechange", function () {
        if (this.readyState == 4) {
            if (this.status >= 200 && this.status < 300) {
                renderizarHeroes(JSON.parse(this.responseText));
            } else {
                console.log(`Error ${this.status} - ${this.statusText}`);
            }
        }
    });

    xml.open("GET", url);
    xml.send();
};

obtenerHeroesAjax("http://localhost:3000/heroes");
