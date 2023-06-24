export const getHeroes = async (url) => {
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

export const deleteHero = async (url, id) =>{
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