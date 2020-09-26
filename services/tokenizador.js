var Codificador = require("./codificador");
var Moment = require("moment");

module.exports.GenerarToken = async (params) => {
    console.log("Generando Token")
    let paramsDecifrados = await Codificador.Descifrar(params,);
    var token = { fecha_expiracion: Moment().add(30, "minutes").format("YYYY-MM-DD HH:mm:ss") };
    token = Object.assign(paramsDecifrados, token);
    token = JSON.stringify(token);
    params.token = await Codificador.Cifrar(token);
    delete params.fecha_expiracion;
    console.log("Token creado");
    return params;
}

module.exports.ValidarToken = async (token, id_usuario) => {
    console.log("Verificando Token")
    let tokenDecifrado = await Codificador.Descifrar(token);
    tokenDecifrado = JSON.parse(tokenDecifrado);
    for (let key of Object.keys(tokenDecifrado)) {
        if (key === "fecha_expiracion" && Moment(tokenDecifrado[key]).format("YYYY-MM-DD HH:mm:ss") < Moment().format("YYYY-MM-DD HH:mm:ss")) {
            console.log("Sesión finalizada")
            return false;
        } else if (key === "id_usuario" && tokenDecifrado[key] !== id_usuario) {
            console.log("Sesión inválida")
            return false;
        }
    }
    console.log("Sesión activa");
    return tokenDecifrado;
}