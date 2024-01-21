import Model from "./../model";
import md5 from 'blueimp-md5'
import Sequelize from 'sequelize'

const Op = Sequelize.Op;//通过Op调用对应操作符

class JobController {
    /*将数据一条条的添加进数据库*/
    async addJob(req, res) {
        try {
            let {
                area,
                jobName,
                experience,
                education,
                salaryStart,
                salaryEnd,
                companyName,
                companyType,
                companySize,
                companyWelfare,
                url = '',
                platform,
                province,
                city,
                industry,
                position,
            } = req.body;

            salaryStart = Number(salaryStart);
            salaryEnd = Number(salaryEnd);
            let jobInfo = await Model.Job.findOne({
                where: {province, city, industry, position, jobName, companyName, url, salaryStart, salaryEnd}
            });
            if (jobInfo) {
                return res.json({
                    code: 500,
                    data: '已存在'
                })
            }

            jobInfo = await Model.Job.create({
                area,
                jobName,
                experience,
                education,
                salaryStart,
                salaryEnd,
                companyName,
                companyType,
                companySize,
                companyWelfare,
                url,
                platform,
                province,
                city,
                industry,
                position,
            });

            res.json({
                code: 200,
                data: '入库成功',
            })
        }catch (e) {
            res.json({
                code: 204,
                data: '入库失败',
                error:e
            })
        }
    }

    // 删除职位
    async deleteJob(req, res) {
        try {
            let {id} = req.body;
            await Model.Job.destroy({
                where: {id}
            });
            res.json({
                code: 200,
                data: '删除成功',
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '删除失败',
                result: e
            })
        }
    }

    // 根据筛选条件获取职位列表
    async getJobList(req, res) {
        try {
            let {
                province = '',
                city = '',
                area = '',
                industry = '',
                position = '',
                experience = '',
                education = '',
                salaryStart = 0,
                salaryEnd = 99999999999999999,
                companyName = '',
                page = 1,
                pageSize = 20,
            } = req.query;
            page = Number(page);
            pageSize = Number(pageSize);
            salaryStart = Number(salaryStart);
            salaryEnd = Number(salaryEnd);
            education = education === "undefined" ? "" : education;
            experience = experience === "undefined" ? "" : experience;

            let jobList = await Model.Job.findAll({
                where: {
                    [Op.and]: [
                        // 模糊
                        {province: {[Op.like]: `%${province}%`}},
                        {city: {[Op.like]: `%${city}%`}},
                        {area: {[Op.like]: `%${area}%`}},
                        {industry: {[Op.like]: `%${industry}%`}},
                        {position: {[Op.like]: `%${position}%`}},
                        {experience: {[Op.like]: `%${experience}%`}},
                        {education: {[Op.like]: `%${education}%`}},
                        {companyName: {[Op.like]: `%${companyName}%`}},
                        // 范围
                        {salaryStart: {[Op.between]: [salaryStart, salaryEnd]}},
                        {salaryEnd: {[Op.between]: [salaryStart, salaryEnd]}},
                    ]
                },
                offset: (page - 1) * pageSize,
                limit: pageSize,
                // 按照id倒序排列
                order: [
                    ['id', 'DESC']
                ]
            });
            // 获取总条数
            let total = await Model.Job.count({
                where: {
                    [Op.and]: [
                        // 模糊
                        {province: {[Op.like]: `%${province}%`}},
                        {city: {[Op.like]: `%${city}%`}},
                        {area: {[Op.like]: `%${area}%`}},
                        {industry: {[Op.like]: `%${industry}%`}},
                        {position: {[Op.like]: `%${position}%`}},
                        {experience: {[Op.like]: `%${experience}%`}},
                        {education: {[Op.like]: `%${education}%`}},
                        {companyName: {[Op.like]: `%${companyName}%`}},
                        // 范围
                        {salaryStart: {[Op.between]: [salaryStart, salaryEnd]}},
                        {salaryEnd: {[Op.between]: [salaryStart, salaryEnd]}},
                    ]
                },
            });

            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
                total
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 按照省分析每个省的职位数量
    async getJobCountByProvince(req, res) {
        try {
            let jobList = await Model.Job.findAll({
                attributes: ['province', [Sequelize.fn('COUNT', 'province'), 'count']],
                group: ['province'],
                order: [
                    [Sequelize.fn('COUNT', 'province'), 'DESC']
                ]
            });
            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 按照城市分析每个城市的职位数量（前端传递的参数是省份）
    async getJobCountByCity(req, res) {
        try {
            let {province = ""} = req.query;
            let jobList = await Model.Job.findAll({
                attributes: ['city', [Sequelize.fn('COUNT', 'city'), 'count']],
                where: {
                    // 模糊
                    province: {[Op.like]: `%${province}%`},
                },
                group: ['city'],
                order: [
                    [Sequelize.fn('COUNT', 'city'), 'DESC']
                ]
            });
            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 按照行业分析每个行业的职位数量（前端传递的参数是省份、城市）
    async getJobCountByIndustry(req, res) {
        try {
            let {province = "", city = ""} = req.query;
            let jobList = await Model.Job.findAll({
                attributes: ['industry', [Sequelize.fn('COUNT', 'industry'), 'count']],
                where: {
                    // 模糊
                    province: {[Op.like]: `%${province}%`},
                    city: {[Op.like]: `%${city}%`},
                },
                group: ['industry'],
                order: [
                    [Sequelize.fn('COUNT', 'industry'), 'DESC']
                ]
            });
            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 按照职位分析每个职位的数量（前端传递的参数是省份、城市、行业）
    async getJobCountByJob(req, res) {
        try {
            let {province = "", city = "", industry = ""} = req.query;
            let jobList = await Model.Job.findAll({
                attributes: ['position', [Sequelize.fn('COUNT', 'position'), 'count']],
                where: {
                    // 模糊
                    province: {[Op.like]: `%${province}%`},
                    city: {[Op.like]: `%${city}%`},
                    industry: {[Op.like]: `%${industry}%`},
                },
                group: ['position'],
                order: [
                    [Sequelize.fn('COUNT', 'position'), 'DESC']
                ]
            });
            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 获取全国的每个工作经验的数量（经验不限1个、1-3年4个等）
    async getJobCountByExperience(req, res) {
        try {
            let jobList = await Model.Job.findAll({
                attributes: ['experience', [Sequelize.fn('COUNT', 'experience'), 'count']],
                group: ['experience'],
                order: [
                    [Sequelize.fn('COUNT', 'experience'), 'DESC']
                ]
            });
            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 根据省、城市、行业、职位、最低薪资、最高薪资获取工作经验的数量
    async getJobCountByExperienceByCondition(req, res) {
        try {
            let {
                province = "",
                city = "",
                industry = "",
                position = "",
                salaryStart = 0,
                salaryEnd = 99999999999999999,
                experience = "",
                education = ""
            } = req.query;
            education = education === "undefined" ? "" : education;
            experience = experience === "undefined" ? "" : experience;
            salaryStart = Number(salaryStart);
            salaryEnd = Number(salaryEnd);
            let jobList = await Model.Job.findAll({
                attributes: ['experience', [Sequelize.fn('COUNT', 'experience'), 'count']],
                where: {
                    // 模糊
                    province: {[Op.like]: `%${province}%`},
                    city: {[Op.like]: `%${city}%`},
                    industry: {[Op.like]: `%${industry}%`},
                    position: {[Op.like]: `%${position}%`},
                    experience: {[Op.like]: `%${experience}%`},
                    education: {[Op.like]: `%${education}%`},
                    // 范围
                    salaryStart: {[Op.between]: [salaryStart, salaryEnd]},
                    salaryEnd: {[Op.between]: [salaryStart, salaryEnd]},
                },
                group: ['experience'],
                order: [
                    [Sequelize.fn('COUNT', 'experience'), 'DESC']
                ]
            });
            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 获取全国的每个薪资范围的数量
    async getJobCountBySalary(req, res) {
        try {
            let jobList = await Model.Job.findAll({
                attributes: [
                    'salaryStart',
                    'salaryEnd',
                    [Sequelize.fn('COUNT', 'salaryStart'), 'count'],
                    [Sequelize.fn('COUNT', 'salaryEnd'), 'count']
                ],
                group: ['salaryStart', 'salaryEnd'],
                order: [
                    [Sequelize.fn('COUNT', 'salaryStart'), 'DESC']
                ]
            });
            let result = [];
            for (let i in jobList) {
                let item = jobList[i];
                let {salaryStart, salaryEnd, count} = item.dataValues;
                if (salaryStart >= 50 * 1000) {
                    result[0] = {salary: "50K以上", count: result[0] ? result[0].count + count : count};
                } else if (salaryEnd <= 3 * 1000) {
                    result[1] = {salary: "3K以下", count: result[1] ? result[1].count + count : count};
                } else if (salaryStart >= 3 * 1000 && salaryEnd <= 5 * 1000) {
                    result[2] = {salary: "3-5K", count: result[2] ? result[2].count + count : count};
                } else if (salaryStart >= 30 * 1000 && salaryEnd <= 50 * 1000) {
                    result[3] = {salary: "30-50K", count: result[3] ? result[3].count + count : count};
                } else if (salaryStart >= 20 * 1000 && salaryEnd <= 30 * 1000) {
                    result[4] = {salary: "20-30K", count: result[4] ? result[4].count + count : count};
                } else if (salaryStart >= 5 * 1000 && salaryEnd <= 10 * 1000) {
                    result[5] = {salary: "5-10K", count: result[5] ? result[5].count + count : count};
                } else if (salaryStart >= 15 * 1000 && salaryEnd <= 20 * 1000) {
                    result[6] = {salary: "15-20K", count: result[6] ? result[6].count + count : count};
                } else if (salaryStart >= 10 * 1000 && salaryEnd <= 15 * 1000) {
                    result[7] = {salary: "10-15K", count: result[7] ? result[7].count + count : count};
                }
            }
            const sortOrder = [
                "3K以下",
                "3-5K",
                "5-10K",
                "10-15K",
                "15-20K",
                "20-30K",
                "30-50K",
                "50K以上"
            ];
            const saralyList = sortOrder.map((label) => {
                const dataItem = result.find((item) => item.salary === label);
                console.log(dataItem)
                return { label: label, count: dataItem ? dataItem.count : 0 };
            });

            res.json({
                code: 200,
                data: '查询成功',
                result: saralyList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 根据省、城市、行业、职位、工作经验获取薪资范围的数量
    async getJobCountBySalaryByCondition(req, res) {
        try {
            let {
                province = "",
                city = "",
                industry = "",
                position = "",
                salaryStart = 0,
                salaryEnd = 99999999999999999,
                experience = "",
                education = ""
            } = req.query;
            education = education === "undefined" ? "" : education;
            experience = experience === "undefined" ? "" : experience;
            salaryStart = Number(salaryStart);
            salaryEnd = Number(salaryEnd);
            let jobList = await Model.Job.findAll({
                attributes: [
                    'salaryStart',
                    'salaryEnd',
                    [Sequelize.fn('COUNT', 'salaryStart'), 'count'],
                    [Sequelize.fn('COUNT', 'salaryEnd'), 'count']
                ],
                where: {
                    // 模糊
                    province: {[Op.like]: `%${province}%`},
                    city: {[Op.like]: `%${city}%`},
                    industry: {[Op.like]: `%${industry}%`},
                    position: {[Op.like]: `%${position}%`},
                    experience: {[Op.like]: `%${experience}%`},
                    education: {[Op.like]: `%${education}%`},
                    // 范围
                    salaryStart: {[Op.between]: [salaryStart, salaryEnd]},
                    salaryEnd: {[Op.between]: [salaryStart, salaryEnd]},
                },
                group: ['salaryStart', 'salaryEnd'],
                order: [
                    [Sequelize.fn('COUNT', 'salaryStart'), 'DESC']
                ]
            });
            let result = [];
            for (let i in jobList) {
                let item = jobList[i];
                let {salaryStart, salaryEnd, count} = item.dataValues;
                if (salaryStart >= 50 * 1000) {
                    result[0] = {salary: "50K以上", count: result[0] ? result[0].count + count : count};
                } else if (salaryEnd <= 3 * 1000) {
                    result[1] = {salary: "3K以下", count: result[1] ? result[1].count + count : count};
                } else if (salaryStart >= 3 * 1000 && salaryEnd <= 5 * 1000) {
                    result[2] = {salary: "3-5K", count: result[2] ? result[2].count + count : count};
                } else if (salaryStart >= 30 * 1000 && salaryEnd <= 50 * 1000) {
                    result[3] = {salary: "30-50K", count: result[3] ? result[3].count + count : count};
                } else if (salaryStart >= 20 * 1000 && salaryEnd <= 30 * 1000) {
                    result[4] = {salary: "20-30K", count: result[4] ? result[4].count + count : count};
                } else if (salaryStart >= 5 * 1000 && salaryEnd <= 10 * 1000) {
                    result[5] = {salary: "5-10K", count: result[5] ? result[5].count + count : count};
                } else if (salaryStart >= 15 * 1000 && salaryEnd <= 20 * 1000) {
                    result[6] = {salary: "15-20K", count: result[6] ? result[6].count + count : count};
                } else if (salaryStart >= 10 * 1000 && salaryEnd <= 15 * 1000) {
                    result[7] = {salary: "10-15K", count: result[7] ? result[7].count + count : count};
                }
            }
            // result中如果有空值，就删除
            result = result.filter(item => item);
            const sortOrder = [
                "3K以下",
                "3-5K",
                "5-10K",
                "10-15K",
                "15-20K",
                "20-30K",
                "30-50K",
                "50K以上"
            ];
            const saralyList = sortOrder.map((label) => {
                const dataItem = result.find((item) => item.salary === label);
                console.log(dataItem)
                return { salary: label, count: dataItem ? dataItem.count : 0 };
            });



            res.json({
                code: 200,
                data: '查询成功',
                result: saralyList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 获取全国的每个学历的数量
    async getJobCountByEducation(req, res) {
        try {
            let jobList = await Model.Job.findAll({
                attributes: [
                    'education',
                    [Sequelize.fn('COUNT', 'education'), 'count']
                ],
                group: ['education'],
                order: [
                    [Sequelize.fn('COUNT', 'education'), 'DESC']
                ]
            });

            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    // 根据省、城市、行业、职位、工作经验、薪资范围获取学历的数量
    async getJobCountByEducationByCondition(req, res) {
        try {
            let {
                province = "",
                city = "",
                industry = "",
                position = "",
                salaryStart = 0,
                salaryEnd = 99999999999999999,
                experience = "",
                education = ""
            } = req.query;
            education = education === "undefined" ? "" : education;
            experience = experience === "undefined" ? "" : experience;
            salaryStart = Number(salaryStart);
            salaryEnd = Number(salaryEnd);
            let jobList = await Model.Job.findAll({
                attributes: [
                    'education',
                    [Sequelize.fn('COUNT', 'education'), 'count']
                ],
                where: {
                    // 模糊
                    province: {[Op.like]: `%${province}%`},
                    city: {[Op.like]: `%${city}%`},
                    industry: {[Op.like]: `%${industry}%`},
                    position: {[Op.like]: `%${position}%`},
                    experience: {[Op.like]: `%${experience}%`},
                    education: {[Op.like]: `%${education}%`},
                    // 范围
                    salaryStart: {[Op.between]: [salaryStart, salaryEnd]},
                    salaryEnd: {[Op.between]: [salaryStart, salaryEnd]},
                },
                group: ['education'],
                order: [
                    [Sequelize.fn('COUNT', 'education'), 'DESC']
                ]
            });

            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }


// 根据省、城市、行业、职位、工作经验、学历要求预测最低薪资、最高薪资、平均薪资
    async getJobSalaryByCondition(req, res) {
        try {
            let {
                province = "",
                city = "",
                industry = "",
                position = "",
                experience = "",
                education = ""
            } = req.query;
            education = education === "undefined" ? "" : education;
            experience = experience === "undefined" ? "" : experience;
            let jobList = await Model.Job.findAll({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('salaryStart')), 'salaryStart'],
                    [Sequelize.fn('AVG', Sequelize.col('salaryEnd')), 'salaryEnd'],
                    [Sequelize.fn('MAX', Sequelize.col('salaryStart')), 'maxSalaryStart'],
                    [Sequelize.fn('MAX', Sequelize.col('salaryEnd')), 'maxSalaryEnd'],
                    [Sequelize.fn('MIN', Sequelize.col('salaryStart')), 'minSalaryStart'],
                    [Sequelize.fn('MIN', Sequelize.col('salaryEnd')), 'minSalaryEnd'],
                ],
                where: {
                    // 模糊
                    province: {[Op.like]: `%${province}%`},
                    city: {[Op.like]: `%${city}%`},
                    industry: {[Op.like]: `%${industry}%`},
                    position: {[Op.like]: `%${position}%`},
                    experience: {[Op.like]: `%${experience}%`},
                    education: {[Op.like]: `%${education}%`},
                },
            });

            res.json({
                code: 200,
                data: '查询成功',
                result: jobList,
            })
        } catch (e) {
            res.json({
                code: 500,
                data: '获取失败',
                result: e
            })
        }
    }

    async getJobWell(req, res) {
        let {
            province = '',
            city = '',
            area = '',
            industry = '',
            position = '',
            experience = '',
            education = '',
            salaryStart = 0,
            salaryEnd = 99999999999999999,
            companyName = '',
        } = req.query;
        salaryStart = Number(salaryStart);
        salaryEnd = Number(salaryEnd);
        education = education === "undefined" ? "" : education;
        experience = experience === "undefined" ? "" : experience;

        let wells = await Model.Job.findAll({
            attributes: ['companyWelfare'],
            where: {
                [Op.and]: [
                    // 模糊
                    {province: {[Op.like]: `%${province}%`}},
                    {city: {[Op.like]: `%${city}%`}},
                    {area: {[Op.like]: `%${area}%`}},
                    {industry: {[Op.like]: `%${industry}%`}},
                    {position: {[Op.like]: `%${position}%`}},
                    {experience: {[Op.like]: `%${experience}%`}},
                    {education: {[Op.like]: `%${education}%`}},
                    {companyName: {[Op.like]: `%${companyName}%`}},
                    // 范围
                    {salaryStart: {[Op.between]: [salaryStart, salaryEnd]}},
                    {salaryEnd: {[Op.between]: [salaryStart, salaryEnd]}},
                ]
            },
        });
        let words=[]
        wells.forEach((data)=>{
            words.push(data.dataValues.companyWelfare)
        })
        let wordData=words.join('，')
        let wordsD = wordData.split("，");

// 使用对象统计每个单词或短语的频率
        let wordFreq = {};
        for (let i = 0; i < wordsD.length; i++) {
            let word = wordsD[i];
            if (wordFreq[word]) {
                wordFreq[word] += 1;
            } else {
                wordFreq[word] = 1;
            }
        }

        let data=[]
        for (let word in wordFreq) {
            if (wordFreq.hasOwnProperty(word)) {
                data.push({'name':word,'value':wordFreq[word]})
            }
        }

        data.sort(function(a, b) {
            return b.value - a.value;
        });

// 打印排序后的结果
        let finalData=data.slice(0,100)
        res.json({
            code: 200,
            data: '获取成功',
            result: finalData
        })
    }
}

export default new JobController()
