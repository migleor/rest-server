const { Router } = require('express');
const { 
    getUser,
    storeUser,
    deleteUser,
    updateUser,
    patchUser } = require('../controllers/user.controller');

const router = Router();

router.get( '/', getUser );

router.post('/', storeUser);

router.put('/:userId', updateUser );

router.patch('/', patchUser); 

router.delete('/', deleteUser); 

module.exports = router;