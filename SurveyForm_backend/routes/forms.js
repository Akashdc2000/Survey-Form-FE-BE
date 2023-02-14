const express = require('express')
const router = new express.Router();
const {auth} =require('../middleware/auth')
const { getall, createSurvey, deleteSurvey, getSurvey, updateSurvey, getIndivisualSurvey,getSurveyID } = require('../controllers/forms_api')

router.get('/', (request, response) => {
    response.send("<h1>Welcome To Forms Home page</h1>")
})

router.get('/getall',auth, getall)
router.get('/get/:userid',auth, getSurvey)       //To get all Survey created by given userid
router.get('/:_id', auth,getIndivisualSurvey)    //To get Indivisual Survey
router.post('/addsurvey', auth,createSurvey)
router.put("/update/:_id",auth, updateSurvey)
router.delete("/delete/:_id", auth,deleteSurvey)

router.post('/get',auth,getSurveyID)


module.exports = router;
