const express = require('express')
const { register, login, getall, update, deleteUser, getUserID } = require('../controllers/user_api')
const router = new express.Router();
const {auth}=require('../middleware/auth')

router.get('/', (request, response) => {
    response.send("<h1>All Users</h1>")
})


router.get('/getall', getall);

router.post('/register', register);
router.post('/login', login)
router.put('/update/:_id', update)
router.delete('/delete/:_id', deleteUser)

router.post('/get',auth, getUserID)

module.exports = router;
