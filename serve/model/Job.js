import Sequelize from 'sequelize'
import sequelize from './../connection'

let Job = sequelize.define('job', {
        // 平台：智联、BOSS直聘
        platform: {
            type: Sequelize.STRING(20),
        },
        // 省份
        province: {
            type: Sequelize.STRING(20),
        },
        // 城市
        city: {
            type: Sequelize.STRING(20),
        },
        // 区
        area: {
            type: Sequelize.STRING(20),
        },
        // 行业
        industry: {
            type: Sequelize.STRING(30),
        },
        // 职位
        position: {
            type: Sequelize.STRING(30),
        },
        // 岗位名
        jobName: {
            type: Sequelize.STRING(200),
        },
        // 工作经验
        experience: {
            type: Sequelize.STRING(30),
        },
        // 学历
        education: {
            type: Sequelize.STRING(30),
        },
        // 薪资起始 2300
        salaryStart: {
            type: Sequelize.INTEGER,
        },
        // 薪资结束 3000
        salaryEnd: {
            type: Sequelize.INTEGER,
        },
        // 公司名
        companyName: {
            type: Sequelize.STRING(200),
        },
        // 公司类型
        companyType: {
            type: Sequelize.STRING(200),
        },
        // 公司规模
        companySize: {
            type: Sequelize.STRING(200),
        },
        // 公司福利
        companyWelfare: {
            type: Sequelize.STRING(200),
        },
        // 招聘原网址
        url: {
            type: Sequelize.TEXT,
        }
    }
);

export default Job
