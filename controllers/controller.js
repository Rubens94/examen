const { response } = require('express');
const sha512 = require('js-sha512');
const CryptoJS = require("crypto-js");

const generateKey = (req, res = response) => {

    const { valor } = req.body;
    
    try {
        if( !valor ) return res.status(404).json({msg: 'No hay parametros en la petición'});
        const aleatorio = Math.random().toString();
        const llave = sha512(aleatorio);

        //res.redirect('/');
        res.status(200).json(llave);

    } catch (err) {
        res.status(404).json(err);
    }
}

const encrypt = (req, res = response) => {

    const { key, encript } = req.body;

    const encriptar = CryptoJS.AES.encrypt( encript, key ).toString();

    res.status(200).json(encriptar);
}

const decrypt = (req, res = response) => {


    const { key, encript } = req.body;

    const desencriptar = CryptoJS.AES.decrypt( encript, key );
    const texto = desencriptar.toString(CryptoJS.enc.Utf8);

    if( texto.length <= 0 ) return res.status(404).json({msg: 'La llave o el texto encriptado no coinciden'});
    
    res.status(200).json(texto);
}

module.exports = {
    generateKey,
    encrypt,
    decrypt
}