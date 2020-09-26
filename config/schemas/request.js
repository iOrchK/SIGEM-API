exports.HEADER = {
    "type": "object",
    "properties": {
        "Aplicativo": {
            "type": "string",
            "pattern": "^(?![nN][uU][lL]{2}$)\\s*\\S.*",

        },
        "Id_Usuario": {
            "type": "string",
            "pattern": "^(?![nN][uU][lL]{2}$)\\s*\\S.*",
        }
    },
    "required": [
        "Aplicativo",
        "Id_Usuario"
    ]
};

exports.BODY = {
    USERS: {
        CREATE: {
            "type": "object",
            "properties": {
                "nombre": {
                    "type": "string"
                },
                "correo": {
                    "type": "string",
                },
                "clave_acceso": {
                    "type": "string"
                },
                "activo": {
                    "type": "number"
                },
            },
            "required": [
                "nombre",
                "correo",
                "clave_acceso",
                "activo"
            ]
        },
        UPDATE: {
            "type": "object",
            "properties": {
                "id_usuario": {
                    "type": "number"
                },
                "nombre": {
                    "type": "string"
                },
                "correo": {
                    "type": "string",
                    "format": "email"
                },
                "clave_acceso": {
                    "type": "string"
                },
                "activo": {
                    "type": "number"
                },
            },
            "required": [
                "id_usuario",
                "nombre",
                "correo",
                "clave_acceso",
                "activo"
            ]
        }
    }
};