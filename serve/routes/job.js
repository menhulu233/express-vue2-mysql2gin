var express = require('express');
var router = express.Router();
import JobController from "../controller/JobController";

/* GET users listing. */
router.post('/addJob', JobController.addJob);
router.post('/deleteJob', JobController.deleteJob);
// 获取职位列表
router.get('/getJobList', JobController.getJobList);
// 按照省分析每个省的职位数量
router.get('/getJobCountByProvince', JobController.getJobCountByProvince);
// 按照城市分析每个城市的职位数量（前端传递的参数是省份）
router.get('/getJobCountByCity', JobController.getJobCountByCity);
// 按照行业分析每个行业的职位数量（前端传递的参数是省份）
router.get('/getJobCountByIndustry', JobController.getJobCountByIndustry);
// 按照职位分析每个职位的数量（前端传递的参数是省份、城市、行业）
router.get('/getJobCountByJob', JobController.getJobCountByJob);
// 获取全国的每个工作经验的数量（经验不限1个、1-3年4个等）
router.get('/getJobCountByExperience', JobController.getJobCountByExperience);
// 根据省、城市、行业、职位、最低薪资、最高薪资获取工作经验的数量
router.get('/getJobCountByExperienceByCondition', JobController.getJobCountByExperienceByCondition);

// 获取全国的每个薪资范围的数量
router.get('/getJobCountBySalary', JobController.getJobCountBySalary);
// 根据省、城市、行业、职位、工作经验获取薪资范围的数量
router.get('/getJobCountBySalaryByCondition', JobController.getJobCountBySalaryByCondition);

// 获取全国的每个学历的数量
router.get('/getJobCountByEducation', JobController.getJobCountByEducation);
// 根据省、城市、行业、职位、工作经验、薪资范围获取学历的数量
router.get('/getJobCountByEducationByCondition', JobController.getJobCountByEducationByCondition);

// 根据省、城市、行业、职位、工作经验、学历要求预测最低薪资、最高薪资、平均薪资
router.get('/getJobSalaryByCondition', JobController.getJobSalaryByCondition);
router.get('/words',JobController.getJobWell)
module.exports = router;
