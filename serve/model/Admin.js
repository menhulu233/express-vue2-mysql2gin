import Sequelize from 'sequelize'
import sequelize from './../connection'

let Admin = sequelize.define('admin', {
        realName: { // 真实姓名
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        password: { // 密码
            type: Sequelize.STRING(80),
            allowNull: false
        },
        phone: { // 手机号
            type: Sequelize.CHAR(11),
            allowNull: false,
            unique: true
        },
        gender: { // 性别
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        avatar: { // 头像
            type: Sequelize.STRING(100),
        },
        // 期望城市
        city: {
            type: Sequelize.STRING(20),
        },
        // 期望行业
        industry: {
            type: Sequelize.STRING(30),
        },
        // 期望职位
        position: {
            type: Sequelize.STRING(30),
        },
        // 期望最低薪资
        salaryStart: {
            type: Sequelize.INTEGER,
        },
        // 期望最高薪资
        salaryEnd: {
            type: Sequelize.INTEGER,
        },
        // 我的学历
        education: {
            type: Sequelize.STRING(30),
        },
        // 我的工作经验
        experience: {
            type: Sequelize.STRING(30),
        },
        // 角色：0-普通用户，1-管理员
        role: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }
);

export default Admin
