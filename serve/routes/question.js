import QuestionController from "../controller/QuestionController";

var express = require('express');
var router = express.Router();
import questionController from "../controller/QuestionController";

/* GET users listing. */
router.post('/addQuestion', QuestionController.addQuestion);
router.post('/changeQustion', QuestionController.changeQuestion);
router.get('/questionsList', QuestionController.getQuestionsList);
router.get('/getQuestion/:adminId', QuestionController.getQuestion);
router.get('/deleteQuestion',QuestionController.deleteQuestion)
// 获取职位列表

module.exports = router;
