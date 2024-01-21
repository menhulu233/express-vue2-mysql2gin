import sequelize from "../connection";

import Admin from "./Admin";
import Job from "./Job";
import Question from "./Question";
//Admin <创建> Job 1:n
Admin.hasMany(Job);
Job.belongsTo(Admin);
Admin.hasMany(Question);
Question.belongsTo(Admin)

/*强制重构表*/
// sequelize.sync({force: true}).then(d=> {
//     console.log('所有表初始化完成，所有表已重构。');
// });
/*同步最新的模型到数据库*/
 //sequelize.sync({alter: true}).then(d=> {
    // console.log('同步所有表最新的模型到数据库，数据保留。');
 //});

export default {
    Admin,
    Job,
    Question
}
