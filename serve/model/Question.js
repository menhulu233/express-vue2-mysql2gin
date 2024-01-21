import Sequelize from 'sequelize'
import sequelize from './../connection'

let Question = sequelize.define('question', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING(200)
    },
    date: {
        type: Sequelize.STRING(200)
    },
    status: {
        type: Sequelize.STRING(200)
    }
}, {
    freezeTableName: true,
    timestamps: false// 在这里对sequelize自带时间戳开关进行设置，默认为true
})


export default Question