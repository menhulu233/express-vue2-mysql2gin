var express = require('express');
var router = express.Router();
import AdminController from "../controller/AdminController";

/* GET users listing. */
router.post('/addAdmin', AdminController.addAdmin);
router.post('/login', AdminController.login);
router.post('/reviseAdminInfo', AdminController.reviseAdminInfo);
router.post('/revisePassword', AdminController.revisePassword);
router.get('/getAdminInfo', AdminController.getAdminInfo);
router.get('/deleteAdmin',AdminController.deleteAdmin)
router.get('/getAdminList',AdminController.getAdminList)
router.post('/updateAdmin',AdminController.updateAdmin)
module.exports = router;
