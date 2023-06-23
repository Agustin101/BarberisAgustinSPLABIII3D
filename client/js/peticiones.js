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
