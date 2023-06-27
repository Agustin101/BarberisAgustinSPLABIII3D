export const getHeroesFetch = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw Error(`Error ${res.status} - ${res.statusText}`);
        return await res.json();
    } catch (err) {
        throw err;
    }
};

export const postHero = async (url, anuncio) => {
    const opts = {
        method: "Post",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(anuncio),
    };

    try {
        const res = await fetch(url, opts);
        if (!res.ok) throw Error(`Error ${res.status} - ${res.statusText}`);
    } catch (err) {
        throw err;
    }
};

export const updateHero = async (url, data, id) =>{
    const opts = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
    };

    try {
        const res = await fetch(`${url}/${id}`, opts);
        if (!res.ok) throw Error(`Error ${res.status} - ${res.statusText}`);
    } catch (err) {
        throw err;
    }
}

export const deleteHeroFetch = async (url, id) =>{
    const opts = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    };

    try {
        const res = await fetch(`${url}/${id}`, opts);
        if (!res.ok) throw Error(`Error ${res.status} - ${res.statusText}`);
    } catch (err) {
        throw err;
    }
}

export const postHeroAjax = (heroe, url) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                data = JSON.parse(xhr.responseText);
            } else {
               console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(heroe));
};

export const putHeroAjax = (heroe,url) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                data = JSON.parse(xhr.responseText);
                console.log(data);
            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });

    xhr.open("PUT", `${url}/${heroe.id}`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(heroe));
};