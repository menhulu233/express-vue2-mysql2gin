import Model from "./../model";
import md5 from 'blueimp-md5'
import Sequelize, {where} from 'sequelize'
import admin from "../model/Admin";

const Op = Sequelize.Op;//通过Op调用对应操作符

class AdminController {
    /*注册*/
    async addAdmin(req, res) {
        let {password, phone} = req.body;
        password = md5(password);
        let adminInfo = await Model.Admin.findOne({
            where: {phone}
        });
        if (adminInfo) {
            return res.json({
                code: 500,
                data: '手机号已注册'
            })
        }

        adminInfo = await Model.Admin.create({
            realName: phone, password, phone
        });
        res.json({
            code: 200,
            data: '注册成功',
            result: {
                adminInfo
            }
        })
    }

    async getAdminInfo(req, res) {
        let {adminId} = req.query;
        let adminInfo = await Model.Admin.findByPk(adminId);
        if (!adminInfo) {
            return res.json({
                code: 500,
                data: '账号不存在'
            });
        }
        res.json({
            code: 200,
            data: '获取成功',
            result: {
                adminInfo
            }
        })
    }

    async revisePassword(req, res) {
        let {oldPassword, newPassword, id} = req.body;
        oldPassword = md5(oldPassword);
        newPassword = md5(newPassword);
        let adminInfo = await Model.Admin.findByPk(id);
        if (!adminInfo) {
            return res.json({
                code: 500,
                data: '账号不存在'
            });
        }
        if (adminInfo.password !== oldPassword) {
            return res.json({
                code: 500,
                data: '原始密码错误'
            });
        }
        adminInfo.password = newPassword;
        await adminInfo.save();
        res.json({
            code: 200,
            data: '修改成功',
            result: {
                adminInfo
            }
        })
    }

    async reviseAdminInfo(req, res) {
        let {
            reviseGender,
            reviseRealName,
            id,
            avatar,
            city,
            industry,
            position,
            salaryStart,
            salaryEnd,
            education,
            experience
        } = req.body;
        salaryStart = Number(salaryStart);
        salaryEnd = Number(salaryEnd);
        let adminInfo = await Model.Admin.findByPk(id);
        if (!adminInfo) {
            return res.json({
                code: 500,
                data: '管理员不存在'
            });
        }
        adminInfo.gender = reviseGender;
        adminInfo.realName = reviseRealName;
        adminInfo.avatar = avatar;
        adminInfo.city = city;
        adminInfo.industry = industry;
        adminInfo.position = position;
        adminInfo.salaryStart = salaryStart;
        adminInfo.salaryEnd = salaryEnd;
        adminInfo.education = education;
        adminInfo.experience = experience;

        await adminInfo.save();
        res.json({
            code: 200,
            data: '修改成功',
            result: {
                adminInfo
            }
        })
    }

    async login(req, res, next) {
        let {phone, password} = req.body;
        password = md5(password);
        let data = await Model.Admin.findOne({
            where: {phone, password}
        });
        if (!data) {
            return res.json({
                code: 500,
                data: '账号或密码错误'
            })
        }
        res.json({
            code: 200,
            data: '登录成功',
            result: {
                adminInfo: data
            }
        })
    }

    async deleteAdmin(req, res) {
        try {
            let {adminId} = req.query
            let admin = await Model.Admin.findOne({
                where: {
                    id: adminId
                }
            })
            if (admin && admin.role == 0) {
                await Model.Admin.destroy({
                    where: {
                        id: adminId
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
                    data: '删除失败，数据不存在或者权限不够',
                    result: []
                })
            }
        } catch (e) {
            res.json({
                code: 204,
                data: '删除失败，数据不存在',
                result: e
            })
        }

    }

    async getAdminList(req, res) {
        try {
            let {
                page=1,
                pageSize=20,
            } = req.query;
            page = Number(page);
            pageSize = Number(pageSize);
            let adminList = await Model.Admin.findAll(
                {
                    where: {
                        role: 0
                    },
                    offset: (page - 1) * pageSize,
                    limit: pageSize,
                    // 按照id倒序排列
                    order: [
                        ['id', 'DESC']
                    ]
                }
            )
            if (adminList) {
                res.json({
                    code: 200,
                    data: '删除成功',
                    result: adminList
                })
            } else {
                res.json({
                    code: 204,
                    data: '获取失败',
                    result: []
                })
            }
        } catch (e) {

        }
    }

    async updateAdmin(req, res) {
        let {
            id,
            realName,
            phone,
            gender
        } = req.body
        let admin = await Model.Admin.findOne(
            {
                where: {
                    id: id
                }
            }
        )
        if (admin) {
            await Model.Admin.update({realName: realName, phone: phone, gender: gender}, {
                where: {id: id}
            })
            res.json({
                code: 200,
                data: '数据更新成功',
                result: []
            })
        }
        else{
            res.json({
                code: 204,
                data: '数据更新失败',
                result: []
            })
        }
    }
}


export default new AdminController()
