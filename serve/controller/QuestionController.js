import Model from "./../model";
import md5 from 'blueimp-md5'
import Sequelize, {BOOLEAN} from 'sequelize'
import {log} from "debug";

const Op = Sequelize.Op;//通过Op调用对应操作符


class QuestionController {
    async changeQuestion(req, res) {
        let {
            id,
            content,
            status,
            adminId
        } = req.body
        console.log(req.body)
        content = String(content);
        let questionInfo = await Model.Question.update({status: status,content:content,adminId:adminId}, {
            where: {id}
        });
        res.json({
            code: 200,
            data: '更新成功',
        })
    };

    async getQuestionsList(req, res) {
        try {
            let questionslist = await Model.Question.findAll({})
            res.json({
                code: 200,
                data: '查询成功',
                result: questionslist,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    async addQuestion(req, res) {
        console.log(req.body);
        let {
            content,
            status,
            date,
            adminId
        } = req.body

        content = String(content);
        let questionInfo = await Model.Question.findOne({
            where: {content, status,date,adminId}
        });
        if (questionInfo) {
            return res.json({
                code: 500,
                data: '已存在'
            })
        }
        let questions= await Model.Question.findAll()
        
        let ids=questions.forEach(element => {
            element.id
        });
        let id=Math.max(ids)+1
        questionInfo = await Model.Question.create(
            {
                id:id,
                content:content,
                date:date,
                status:status,
                adminId:adminId
            }
        )
        res.json({
            code: 200,
            data: '入库成功',
        })

    }

    async deleteQuestion(req, res) {
        try {
            let {id} = req.query
            console.log(id)
            let question = await Model.Question.findOne({
                where: {
                    id:id
                }
            })
            console.log('哈哈')
            if (question) {
                await Model.Question.destroy({
                    where: {
                        id:id
                    }
                })
                res.json({
                    code: 200,
                    data: '删除成功',
                    result: []
                })
            } else {
                res.json({
                    code: 200,
                    data: '删除失败，数据不存在',
                    result: []
                })
            }
        } catch (e) {
            console.log(e)
            res.json({
                code: 204,
                data: '删除失败，数据不存在',
                result: e
            })
        }

    }

    async getQuestion(req, res) {
        let adminID = req.params.adminId
        console.log(adminID)
        let question = await Model.Question.findOne({
            where: {
                adminId: adminID
            }
        })
        if (question) {
            res.json({
                code: 200,
                data: question,
            })
        } else {
            return res.json({
                code: 500,
                data: '数据不存在'
            })
        }
    }
}


export default new QuestionController()