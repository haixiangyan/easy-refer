import sequelize from './sequelize'
// 引入 models
import './UserModel'
import './JobModel'
import './ReferModel'
import './ResumeModel'

// 同步 users 表
(async function() {
  await sequelize.sync({ force: true })
  sequelize.close()
})()

