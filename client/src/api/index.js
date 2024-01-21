import ajax from "./ajax";

const BASE_URL = 'http://localhost:3000';

const ADMIN_URL = `${BASE_URL}/admin`;
const JOB_URL = `${BASE_URL}/job`;
const Question_URL = `${BASE_URL}/question`;
export const uploadFile = data => ajax(BASE_URL + '/uploadFile', data, 'post', 'file');

//管理员登录
export const adminLogin = data => ajax(ADMIN_URL+ '/login', data, 'post');
export const addAdmin = data => ajax(ADMIN_URL+ '/addAdmin', data, 'post');
export const reviseAdminInfo = data => ajax(ADMIN_URL+ '/reviseAdminInfo', data, 'post');
export const revisePassword = data => ajax(ADMIN_URL+ '/revisePassword', data, 'post');
export const getAdminInfo = data => ajax(ADMIN_URL+ '/getAdminInfo', data,);

// 将职位信息存入数据库
export const addJob = data => ajax(JOB_URL+ '/addJob', data, 'post');
// 删除职位信息
export const deleteJob = data => ajax(JOB_URL+ '/deleteJob', data, 'post');
// 根据筛选条件获取职位列表
export const getJobList = data => ajax(JOB_URL+ '/getJobList', data,);
// 按照省分析每个省的职位数量
export const getJobCountByProvince = data => ajax(JOB_URL+ '/getJobCountByProvince', data,);
// 按照城市分析每个城市的职位数量（前端传递的参数是省份）
export const getJobCountByCity = data => ajax(JOB_URL+ '/getJobCountByCity', data,);
// 按照行业分析每个行业的职位数量（前端传递的参数是省份、城市）
export const getJobCountByIndustry = data => ajax(JOB_URL+ '/getJobCountByIndustry', data,);
// 按照职位分析每个职位的数量（前端传递的参数是省份、城市、行业）
export const getJobCountByJob = data => ajax(JOB_URL+ '/getJobCountByJob', data,);


// 获取全国的每个工作经验的数量（经验不限1个、1-3年4个等）
export const getJobCountByExperience = data => ajax(JOB_URL+ '/getJobCountByExperience', data,);
// 根据省、城市、行业、职位、最低薪资、最高薪资获取工作经验的数量
export const getJobCountByExperienceByCondition = data => ajax(JOB_URL+ '/getJobCountByExperienceByCondition', data,);

// 获取全国的每个薪资范围的数量
export const getJobCountBySalary = data => ajax(JOB_URL+ '/getJobCountBySalary', data,);
// 根据省、城市、行业、职位、工作经验获取薪资范围的数量
export const getJobCountBySalaryByCondition = data => ajax(JOB_URL+ '/getJobCountBySalaryByCondition', data,);

// 获取全国的每个学历的数量
export const getJobCountByEducation = data => ajax(JOB_URL+ '/getJobCountByEducation', data,);
// 根据省、城市、行业、职位、工作经验、薪资范围获取学历的数量
export const getJobCountByEducationByCondition = data => ajax(JOB_URL+ '/getJobCountByEducationByCondition', data,);
// 根据省、城市、行业、职位、工作经验、学历要求预测最低薪资、最高薪资、平均薪资
export const getJobSalaryByCondition = data => ajax(JOB_URL+ '/getJobSalaryByCondition', data,);

// 关于建议
export const getQuestionsList = data=>ajax(Question_URL+'/questionsList',data);
export const addQuestion = data=>ajax(Question_URL+'/addQuestion',data,'post');
export const changeQuestion = data=>ajax(Question_URL+'/changeQustion',data,'post');
export const getWords = data=>ajax(JOB_URL+'/words',data);

export const getAdminList = data=>ajax(ADMIN_URL+'/getAdminList',data)
export  const deleteAdmin = data=>ajax(ADMIN_URL+'/deleteAdmin',data)
export const deleteQuestion=data=>ajax(Question_URL+'/deleteQuestion',data)
