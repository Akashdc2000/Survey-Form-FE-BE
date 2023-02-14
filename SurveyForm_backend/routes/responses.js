const express = require('express')
const router = new express.Router();
const {auth}=require('../middleware/auth')
const { getall, addResponse, deleteResponse, getResponseBySurveyId, updateResponse, getResponseID } = require('../controllers/responses_api')

router.get('/', (request, response) => {
    response.send("<h1>Welcome To Responses of a Survey</h1>")
})

router.get('/getall',auth, getall)
router.get('/get/:surveyid',auth, getResponseBySurveyId)
router.post('/addresponse/:_id',auth, addResponse)
router.put("/update/:_id",auth, updateResponse)
router.delete("/delete/:_id",auth, deleteResponse)


router.post('/get',getResponseID)
module.exports = router;
