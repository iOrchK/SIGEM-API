var CryptoJS = require("crypto-js");
var FileSync = require('fs');
var Environment = JSON.parse(FileSync.readFileSync("config/environment.json"));

let modo = 0;

module.exports.Cifrar = async (dato) => {
    modo = 0;
    if (!dato) {
        console.error("Datos no codificables");
        return dato;
    }
    console.log("Codificando");
    return await procesar(dato)
}

module.exports.Descifrar = async (dato) => {
    modo = 1;
    if (!dato) {
        console.error("Datos no decodificables");
        return dato;
    }
    console.log("Decodificando");
    return await procesar(dato)
}

const procesar = async (dato) => {
    if (dato === null || typeof dato === "undefined") {
        return dato;
    } else if (Array.isArray(dato) === "array") {
        dato = modo === 1 ? await descifrarArray(dato) : await cifrarArray(dato);
    } else if (typeof dato === "object") {
        dato = modo === 1 ? await descifrarObjeto(dato) : await cifrarObjeto(dato);
    } else if (typeof dato === "string") {
        dato = modo === 1 ? await descifrarParametro(dato) : await cifrarParametro(dato);
    }
    return dato;
}

const descifrarArray = async (arr) => {
    for (let item of arr) {
        item = await procesar(item);
    }
    return arr;
}

const descifrarObjeto = async (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        if (key !== "id" && !(key.startsWith("estatus"))) {
            obj[key] = await procesar(value);
        }
    }
    return obj;
}

const descifrarParametro = async (ciphertext) => {
    let result;
    try {
        // Descartar datos no aceptados
        if (
            ciphertext === null ||
            ciphertext === "" ||
            Number(ciphertext) ||
            ciphertext === undefined
        ) {
            return ciphertext;
        }

        const bytes = CryptoJS.AES.decrypt(ciphertext, Environment[process.env.NODE_ENV || 'development'].SECRET);

        if (bytes.sigBytes < 0) {
            // Datos no encriptados
            return ciphertext;
        } else if (bytes.sigBytes === 0) {
            // Se encriptó un dato vacio
            return "";
        } else {
            // Datos desencriptados
            result = bytes.toString(CryptoJS.enc.Utf8);
        }
    } catch (e) {
        // console.warn(e, ciphertext);
        result = ciphertext;
    }

    // console.log("Dato descifrado: " + ciphertext + " ------> ", result)
    return result;
}

const cifrarArray = async (arr) => {
    for (let item of arr) {
        item = await procesar(item);
    }
    return arr;
}

const cifrarObjeto = async (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        if (key !== "id" && !(key.startsWith("estatus"))) {
            obj[key] = await procesar(value);
        }
    }

    return obj;
}

const cifrarParametro = async (dato) => {
    dato = typeof dato === "number" ? dato + "" : dato;
    if (typeof dato === "string") {
        return CryptoJS.AES.encrypt(dato, Environment[process.env.NODE_ENV || 'development'].SECRET).toString();
    } else {
        console.error("No se puede codificar porque el dato no es un string");
        return dato;
    }
}