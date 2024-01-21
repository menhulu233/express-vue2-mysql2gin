import Vue from 'vue'
import VueRouter from 'vue-router'

import adminLayout from './../pages/admin'
import adminLogin from './../pages/admin/login/login'
import recruitmentManage from "../pages/admin/recruitmentManage/recruitmentManage";
import userInfo from "../pages/admin/userInfo/userInfo";
import updatePwd from "../pages/admin/updatePwd/updatePwd";
import areaAnalysis from "../pages/admin/areaAnalysis/areaAnalysis";
import experienceAnalysis from "../pages/admin/experienceAnalysis/experienceAnalysis";
import salaryAnalysis from "../pages/admin/salaryAnalysis/salaryAnalysis";
import educationAnalysis from "../pages/admin/educationAnalysis/educationAnalysis";
import jobRecommend from "../pages/admin/jobRecommend/jobRecommend";
import salaryForecast from "../pages/admin/salaryForecast/salaryForecast";
import ciYun from "@/pages/admin/ciyun/ciYun";
import systemLayout from './../pages/system'
import login from './../pages/system/login/login'
import dataManage from '../pages/system/dataManage/dataManage.vue'
import systemrecruitmentManage from "../pages/system/recruitmentManage/recruitmentManage";
import question from "@/pages/admin/question/question";
import questionManage from "@/pages/system/questionManage/questionManage";
import adminManage from "@/pages/system/adminManage/adminManage";

// import config from "../config";

Vue.use(VueRouter);

const router = new VueRouter({
    //所有路由
    routes: [
        {
            path: '/admin',
            component: adminLayout,
            children: [
                {path: 'recruitmentManage', component: recruitmentManage},
                {path: 'login', component: adminLogin},
                {path: 'userInfo', component: userInfo},
                {path: 'updatePwd', component: updatePwd},
                {path: 'areaAnalysis', component: areaAnalysis},
                {path: 'experienceAnalysis', component: experienceAnalysis},
                {path: 'salaryAnalysis', component: salaryAnalysis},
                {path: 'ciYun', component: ciYun},
                {path: 'educationAnalysis', component: educationAnalysis},
                {path: 'jobRecommend', component: jobRecommend},
                {path: 'salaryForecast', component: salaryForecast},
                {path: 'question', component: question},
                {path: '/admin', redirect: '/admin/recruitmentManage'},
            ]
        },
        {
            path: '/system',
            component: systemLayout,
            children: [
                {path: 'login', component: login},
                {path: 'dataManage', component: dataManage},
                {path: 'recruitmentManage', component: systemrecruitmentManage},
                {path: 'questionManage', component: questionManage},
                {path: 'adminManage', component: adminManage},
                {path: '/system', redirect: '/system/dataManage'},
            ]
        },
        {//默认路由
            path: '/',
            redirect: '/admin'
        }
    ]
});
/*
router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-console
  if(to.path === '/admin/login' || to.path.includes('/user')){
    next();
  }else{
    config.getCache('adminId') ? next() : next('/admin/login')
  }
});*/
export default router;
