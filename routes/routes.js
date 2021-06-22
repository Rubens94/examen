const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos} = require('../middlewares/validar-campos')

const { 
    generateKey,
    encrypt,
    decrypt
} = require('../controllers/controller');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.post('/generateKey', [ validarCampos ], generateKey);

router.post('/encrypt', [
    check('key', 'La llave de encriptación no puede estar vacía').not().isEmpty(),
    check('encript', 'Se debe introducir un texto para encriptar').not().isEmpty(),
    validarCampos
], encrypt);

router.post('/decrypt', [
    check('key', 'La llave de encriptación no puede estar vacía').not().isEmpty(),
    check('encript', 'Se debe introducir el texto encriptado').not().isEmpty(),
    validarCampos
], decrypt);

module.exports = router;