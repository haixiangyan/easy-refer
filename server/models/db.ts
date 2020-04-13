import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import {Sequelize} from 'sequelize'
// 解析 .env 文件
const envPath = path.resolve(__dirname, '../../.env')
const result = dotenv.config({
  path: envPath
})

if (result.error) {
  throw result.error
}

const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD} = process.env

if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) {
  throw new Error('环境变量不存在')
}

// 创建连接实例
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  dialect: 'mysql'
})

// Test connection
sequelize.authenticate()
  .then(() => console.log('成功连接数据库'))
  .catch((error) => console.log('无法连接数据库: ', error))

const basename = path.basename(__filename)
const db: any = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

// 同步 users 表
sequelize.sync({force: true}).then(() => sequelize.close())

export default db
