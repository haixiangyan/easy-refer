import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import {Sequelize} from 'sequelize'
// 解析 .env 文件
const parseEnv = () => {
  const envPath = path.resolve(__dirname, '../../.env')
  const result = dotenv.config({
    path: envPath
  })

  if (result.error) {
    throw result.error
  }
}

// 创建连接实例
const initSeque = () => {
  const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD} = process.env

  if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new Error('环境变量不存在')
  }

  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    dialect: 'mysql'
  })

  // Test connection
  sequelize.authenticate()
    .then(() => console.log('成功连接数据库'))
    .catch((error) => console.log('无法连接数据库: ', error))

  return sequelize
}

const parseModels = (sequelize: Sequelize) => {
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

  return db
}

// 同步 users 表
const syncDB = async (sequelize: Sequelize) => {
  await sequelize.sync({force: true})
  await sequelize.close()
}

// 开始读入 Model
parseEnv()
const sequelize = initSeque()
const db = parseModels(sequelize)
syncDB(sequelize).then(() => console.log('成功同步数据库'))

export default db
