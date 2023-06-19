document.addEventListener("DOMContentLoaded", () => {
    const $heroesSection = document.getElementById("heroesSection");

    const heroes = JSON.parse(localStorage.getItem("anuncios")) || [];

    if (heroes.length > 0) {
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            heroes.forEach((hero) => {
                const article = document.createElement("article");

                const pAlias = document.createElement("p");
                const pNombre = document.createElement("p");
                const pEditorial = document.createElement("p");
                const pFuerza = document.createElement("p");
                const pArma = document.createElement("p");

                article.appendChild(pAlias);
                article.appendChild(pNombre);
                article.appendChild(pEditorial);
                article.appendChild(pFuerza);
                article.appendChild(pArma);

                pAlias.outerHTML = `<p> <i class="fa-solid fa-mask"></i> Alias : ${hero.alias}</p>`;
                pNombre.outerHTML = `<p>Nombre : ${hero.nombre}</p>`;
                pEditorial.outerHTML = `<p><i class="fa-solid fa-newspaper"></i> Editorial : ${hero.editorial}</p>`;
                pFuerza.outerHTML = `<p> <i class="fa-solid fa-hand-fist"></i> Fuerza: ${hero.fuerza} </p>`;
                pArma.outerHTML = `<p><i class="fa-solid fa-gun"></i> Arma : ${hero.arma}</p>`;
                

                fragment.appendChild(article);
            });
            $heroesSection.appendChild(fragment);
            const $divSpinner = document.querySelector(".spinner");
            $divSpinner.classList.add("spinner-oculto");
        }, 2000);
    } else {
        const $divSpinner = document.querySelector(".spinner");
        $divSpinner.classList.add("spinner-oculto");
    }
});
