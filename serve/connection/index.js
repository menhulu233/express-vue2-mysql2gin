import Sequelize from 'sequelize'
const sequelize = new Sequelize('zhaopin', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+08:00' ,//东八时区
    dialectOptions: {
        charset: 'utf8mb4'
     },
});

sequelize.authenticate().then(() => {
    console.log('mysql connection success.');
}).catch(err => {
    console.error('mysql connection error:', err);
});

export default sequelize
